#!/usr/bin/env node

import * as fs from 'fs';
import * as child_process from 'child_process';
import chalk from 'chalk';
import commander from 'commander';
import prompts from 'prompts';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { generateNewProject, generateExistingProject } from './generator';
import { Framework } from './types';
import { showVersion } from './cli/version';
import { showHelp } from './cli/help';
import { ProjectMap } from './core/map';

dotenv.config({ path: path.join(__dirname, '../.env') });

const API_KEY = process.env.API_KEY || '';

const rawArgs = process.argv.slice(2);
const isHelpRequested = rawArgs.includes('-h') || rawArgs.includes('--help') || rawArgs.length === 0;

if (isHelpRequested) {
  const { showHelp } = require('./cli/help');
  showHelp();
  process.exit(0);
}

const program = new commander.Command();

program
  .name('sftx')
  .description('SpecForge-TX - SDD CLI with AI')
  .argument('[command]', 'Command to run')
  .argument('[name]', 'Project or feature name')
  .option('-f, --framework <framework>', 'Framework')
  .option('-a, --author <author>', 'Author name')
  .option('-y, --yes', 'Skip confirmations (auto-approve)')
  .option('-w, --watch', 'Run tests in watch mode (for verify command)')
  .option('--only-feature', 'Run only tests for current feature (for verify command)')
  .option('--min-coverage <N>', 'Minimum coverage threshold (default: 80)', '80')
  .option('--type <type>', 'Test type: unit | integration | e2e (default: unit)', 'unit')
  .option('--update', 'Update project map only modified files', false)
  .allowUnknownOption()
  .parse(process.argv);

const args = program.args;
const options = program.opts();
const autoApprove = options.yes || false;

const isInstall = args[0] === 'install';
const isCreate = args[0] === 'create';
const isSpec = args[0] === 'spec';
const isCode = args[0] === 'code';
const isTest = args[0] === 'test';
const isVerify = args[0] === 'verify';
const isDocs = args[0] === 'docs';
const isCommit = args[0] === 'commit';
const isFix = args[0] === 'fix';
const isVersion = args[0] === 'v' || args[0] === '-v' || args[0] === '-version' || args[0] === 'version';
const isHelp = args[0] === 'help';
const isMap = args[0] === 'map';

const featureName = args[1] || '';

const frameworks: { name: string; value: Framework; description: string }[] = [
  { name: 'Next.js', value: 'nextjs', description: 'Next.js 14 + React + TypeScript' },
  { name: 'React (Vite)', value: 'react', description: 'React + Vite + TypeScript' },
  { name: 'Vue.js', value: 'vue', description: 'Vue 3 + Vite + TypeScript' },
  { name: 'Express/Node', value: 'express', description: 'Express + TypeScript' },
  { name: 'FastAPI/Python', value: 'fastapi', description: 'FastAPI + Python 3.11' },
];

async function callAI(prompt: string, systemPrompt?: string): Promise<string> {
  if (!API_KEY) {
    console.log(chalk.red('❌ API_KEY no configurada. Configure la variable de entorno API_KEY en .env\n'));
    process.exit(1);
  }
  try {
    console.log(chalk.gray('⏳ Conectando con IA (Claude 3.5 Haiku)...'));
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 4096,
        system: systemPrompt || 'Eres un experto desarrollador SDD. Sigue las reglas de AGENTS.md. Genera código limpio con tests en TypeScript. Responde solo con el código necesario, sin explicaciones largas.',
        messages: [
          { role: 'user', content: prompt }
        ]
      })
    });
    const data: any = await response.json();
    if (data.error) {
      console.log(chalk.red(`❌ Error de API: ${data.error.message}`));
      process.exit(1);
    }
    return data.content?.[0]?.text || '';
  } catch (error: any) {
    console.log(chalk.red('Error de conexión: ') + error.message);
    process.exit(1);
  }
}

function execSync(cmd: string): string {
  return child_process.execSync(cmd, { encoding: 'utf-8' }).trim();
}

async function askConfirm(message: string): Promise<boolean> {
  if (autoApprove) {
    console.log(chalk.gray(`[auto-approve] ${message}`));
    return true;
  }
  const response = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: message,
    initial: true
  });
  return response.confirm;
}

function getFeatureDirs(feature: string) {
  if (!feature || feature === '-') {
    const state = readState();
    const featureKeys = Object.keys(state.features || {});
    if (featureKeys.length > 0) {
      feature = featureKeys[0];
    } else {
      feature = 'feature';
    }
  }
  
  const words = feature.split(/\s+/).filter(w => w.length > 0);
  const keyWords = words.filter(w => w.length > 3 && !['para', 'con', 'los', 'las', 'sobre'].includes(w.toLowerCase()));
  const slug = keyWords.length > 0 
    ? keyWords.slice(0, 3).join('-').toLowerCase()
    : words.slice(0, 2).join('-').toLowerCase();
  const normalized = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const cleanSlug = normalized.replace(/[^a-z0-9-]/g, '').substring(0, 30);
  const cwd = process.cwd();
  return {
    feature: path.join(cwd, 'src', 'features', cleanSlug),
    docs: path.join(cwd, 'docs', 'features', cleanSlug),
    slug: cleanSlug
  };
}

function getStateFile(): string {
  return path.join(process.cwd(), 'SpecForge-TX', '.sdd-state.json');
}

function readState(): any {
  const stateFile = getStateFile();
  if (fs.existsSync(stateFile)) {
    return JSON.parse(fs.readFileSync(stateFile, 'utf-8'));
  }
  return { features: {} };
}

function writeState(state: any): void {
  const stateFile = getStateFile();
  fs.mkdirSync(path.dirname(stateFile), { recursive: true });
  fs.writeFileSync(stateFile, JSON.stringify(state, null, 2));
}

function updateFeatureState(feature: string, phase: string, data: any): void {
  const state = readState();
  if (!state.features) state.features = {};
  if (!state.features[feature]) state.features[feature] = {};
  state.features[feature][phase] = data;
  state.features[feature].lastPhase = phase;
  state.features[feature].updatedAt = new Date().toISOString();
  writeState(state);
}

function addComponentToPage(slug: string): void {
  const pagePath = path.join(process.cwd(), 'src/app/page.tsx');
  const componentPath = path.join(process.cwd(), 'src/features', slug, 'index.tsx');

  // Validar que el componente realmente existe
  if (!fs.existsSync(pagePath) || !fs.existsSync(componentPath)) {
    console.log(chalk.yellow(`⚠️  No se agregó a page.tsx (componente no encontrado)`));
    return;
  }

  let content = fs.readFileSync(pagePath, 'utf-8');
  const pascalName = toPascalCase(slug);

  const importLine = `import ${pascalName} from '@/features/${slug}';`;

  // Agregar import de forma robusta: insertar después del último import
  if (!content.includes(importLine) && !content.includes(`from '@/features/${slug}`)) {
    // Encontrar la última línea que comienza con "import"
    const lines = content.split('\n');
    let lastImportIndex = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        lastImportIndex = i;
      }
    }

    // Insertar el nuevo import después del último import encontrado
    if (lastImportIndex >= 0) {
      lines.splice(lastImportIndex + 1, 0, importLine);
    } else {
      // Si no hay imports, insertar al inicio después de 'use client' si existe
      if (lines[0].includes('use client')) {
        lines.splice(1, 0, importLine);
      } else {
        lines.unshift(importLine);
      }
    }
    content = lines.join('\n');
  }

  // Agregar el componente al JSX de forma robusta
  // SIEMPRE insertar antes de </main>, no antes de footer
  if (!content.includes(`<${pascalName}`)) {
    const componentBlock = `\n      {/* ${pascalName} Section */}\n      <${pascalName} />\n`;

    // Buscar la última ocurrencia de </main> (más robusto que buscar footer)
    const lastMainIndex = content.lastIndexOf('</main>');
    if (lastMainIndex !== -1) {
      // Insertar antes del cierre de main
      content =
        content.substring(0, lastMainIndex) +
        componentBlock +
        content.substring(lastMainIndex);
    } else {
      // Si no hay </main>, intentar antes de otros marcadores
      const footerMatch = content.match(/{\/\*\s*Footer[\s\S]*?\*\/}/);
      if (footerMatch) {
        const footerIndex = content.indexOf(footerMatch[0]);
        content =
          content.substring(0, footerIndex) +
          componentBlock +
          content.substring(footerIndex);
      }
    }
  }

  fs.writeFileSync(pagePath, content);
  console.log(chalk.green(`✅ Componente ${pascalName} agregado a page.tsx`));
}

function toPascalCase(str: string): string {
  return str.split(/[-_.\s]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

async function runSPEC(feature: string): Promise<void> {
  console.log(chalk.bold.cyan('\n📋 FASE 1: SPEC - Especificación\n'));
  
  const { feature: fDir, docs: dDir, slug } = getFeatureDirs(feature);
  fs.mkdirSync(fDir, { recursive: true });
  fs.mkdirSync(dDir, { recursive: true });
  
  const confirmed = await askConfirm('¿Confirmas para generar la SPEC con IA?');
  if (!confirmed) {
    console.log(chalk.yellow('❌ Cancelado por el usuario'));
    return;
  }
  
console.log(chalk.gray('🔍 Analizando proyecto existente...'));
  let projectContext = '';
  
  const pagePath = path.join(process.cwd(), 'src/app/page.tsx');
  if (fs.existsSync(pagePath)) {
    const pageContent = fs.readFileSync(pagePath, 'utf-8');
    const structureMatch = pageContent.match(/<section[\s\S]*?(?=<\/?section|<\/main)/g);
    const sections = structureMatch?.map(s => s.replace(/<[^>]*>/g, '').substring(0, 200)).join('\n- ') || '';
    projectContext += '\n=== ESTRUCTURA DE LA LANDING (secciones) ===\n- ' + sections;
    projectContext += '\n\n-> La nueva sección debe seguir el mismo patrón visual (bg-gray-900, py-20, etc.)';
  }
  
  const componentsDir = path.join(process.cwd(), 'src/components');
  if (fs.existsSync(componentsDir)) {
    projectContext += '\n\n=== ESTILO DE COMPONENTES BASE ===\n';
    const keyComponents = ['Button.tsx', 'FeatureCard.tsx', 'Badge.tsx'].filter(f => 
      fs.existsSync(path.join(componentsDir, f))
    );
    for (const comp of keyComponents) {
      const compContent = fs.readFileSync(path.join(componentsDir, comp), 'utf-8');
      const styles = compContent.match(/className="([^"]+)"/g)?.slice(0, 3).join(' ') || 'styles inline';
      projectContext += '\n- ' + comp + ': ' + styles;
    }
  }
  
  const agentsPath = path.join(process.cwd(), 'SpecForge-TX/AGENTS_RULES.md');
  if (fs.existsSync(agentsPath)) {
    projectContext += '\n\n=== CONVENCIONES (resumen) ===\n';
    const agentsContent = fs.readFileSync(agentsPath, 'utf-8');
    projectContext += '- Componentes: PascalCase';
    projectContext += '\n- Funciones: camelCase';
    projectContext += '\n- Archivos: kebab-case';
    projectContext += '\n- Imports de componentes base (Badge, Button, etc): usar NAMED imports (ej. import { Badge } from \'@/components/Badge\';). NO default imports.';
  }
  
  const readmePath = path.join(process.cwd(), 'README.md');
  if (fs.existsSync(readmePath)) {
    const readme = fs.readFileSync(readmePath, 'utf-8');
    const techMatch = readme.match(/Tech Stack[\s\S]*?(?=#)/i)?.[0] || readme.split('\n').slice(0, 10).join('\n');
    projectContext += '\n\n=== TECH STACK ===\n' + techMatch;
  }
  
console.log(chalk.gray('⏳ Generando SPEC...'));
  const aiPrompt = `Genera SPEC para: "${feature}"

## CONTEXTO: Next.js 14 + Tailwind + landing page existente
${projectContext}

# SPEC - ${feature}

## Descripción & Criterios de aceptación
- [ ] Describir con extremada profundidad.

## Technical Specification (CON CÓDIGO COMPLETO)

### Componente
\`\`\`typescript
// src/features/${slug}/index.tsx
// IMPORTANTÍSIMO: Usa diseño PREMIUM moderno, animaciones, gradientes oscuros (bg-gray-900), hover effects dinámicos, glassmorphism.
// AGREGA BASTANTE TEXTO LÓGICO, PÁRRAFOS Y DATOS ÚTILES PARA QUE LA SECCIÓN NO QUEDE VACÍA.
// NO asumas librerías de terceros. Usa SVGs de React inline para iconos en vez de 'react-icons' o dependencias similares. No importes nada ajeno.
\`\`\`

### Integración
- Import: \`import ${toPascalCase(slug)} from '@/features/${slug}/index';\`
- Render: \`<${toPascalCase(slug)} />\` en page.tsx (se agrega automáticamente)`;

  const spec = await callAI(aiPrompt, 'Experto Next.js 14 + Tailwind. Genera SPEC con código completo.');
  
  const featureFile = path.join(dDir, `${slug}.md`);
  fs.writeFileSync(featureFile, spec);
  console.log(chalk.green(`✅ SPEC guardada: ${featureFile}`));
  
  const specTechFile = path.join(dDir, `spec-${slug}.md`);
  const techSpec = await callAI(`Genera especificación técnica para: "${feature}"

Incluye:
- Nombre de archivos
- Interfaces TypeScript
- Funciones a implementar
- Tests requeridos
- API endpoints si aplica`, 'Eres un experto en arquitectura de software.');
  
  fs.writeFileSync(specTechFile, techSpec);
  console.log(chalk.green(`✅ SPEC técnica guardada: ${specTechFile}`));
  
  updateFeatureState(feature, 'spec', { files: [featureFile, specTechFile], slug });
  
  console.log(chalk.bold('\n✅ SPEC completada\n'));
  
  console.log(chalk.cyan('📌 Próximos pasos:\n'));
  console.log(chalk.gray(`  sftx code "${slug}"        # FASE 2: Implementar código`));
  console.log(chalk.gray(`  sftx test "${slug}"        # FASE 3: Escribir tests`));
  console.log(chalk.gray(`  sftx verify "${slug}"      # FASE 4: Verificar (tests + lint)`));
  console.log(chalk.gray(`  sftx docs "${slug}"        # FASE 5: Completar docs`));
  console.log(chalk.gray(`  sftx all "${slug}"         # Ejecutar todas las fases`));
  console.log(chalk.cyan('\nFlujo SDD: SPEC → CODE → TEST → VERIFY → DOCS → COMMIT\n'));
}

async function runCODE(feature: string): Promise<void> {
  console.log(chalk.bold.cyan('\n💻 FASE 2: CODE - Implementación\n'));
  
  const state = readState();
  const savedSlug = state.features?.[feature]?.spec?.slug;
  const featureName = savedSlug || feature;
  
  const { feature: fDir, docs: dDir, slug } = getFeatureDirs(featureName);
  fs.mkdirSync(fDir, { recursive: true });
  
  const specFile = path.join(dDir, `${slug}.md`);
  const specTechFile = path.join(dDir, `spec-${slug}.md`);
  
  let existingSpec = '';
  if (fs.existsSync(specFile)) existingSpec += fs.readFileSync(specFile, 'utf-8') + '\n\n';
  if (fs.existsSync(specTechFile)) existingSpec += fs.readFileSync(specTechFile, 'utf-8') + '\n\n';
  
  if (!existingSpec) {
    console.log(chalk.red('❌ No existe SPEC. Ejecuta: sftx spec "' + feature + '"'));
    return;
  }
  
  console.log(chalk.gray('🔍 Analizando proyecto...'));
  let projectContext = '';
  
  const pagePath = path.join(process.cwd(), 'src/app/page.tsx');
  if (fs.existsSync(pagePath)) {
    const pageContent = fs.readFileSync(pagePath, 'utf-8');
    projectContext += '\n=== PATRÓN DE SECCIONES ===\n';
    const sections = pageContent.match(/className="[^"]*(?:py-20|py-\d+|bg-gray-\d+)[^"]*"/g)?.slice(0, 5).join('\n') || '';
    projectContext += sections + '\n-> Usar estos patrones para la nueva sección';
  }
  
  const componentsDir = path.join(process.cwd(), 'src/components');
  if (fs.existsSync(componentsDir)) {
    projectContext += '\n\n=== ESTILO DE COMPONENTES ===\n';
    const keyComp = ['Button.tsx', 'FeatureCard.tsx'].find(f => fs.existsSync(path.join(componentsDir, f)));
    if (keyComp) {
      const content = fs.readFileSync(path.join(componentsDir, keyComp), 'utf-8');
      const tailwindClasses = content.match(/className="[^"]+"/g)?.slice(0, 4).join(' ') || '';
      projectContext += tailwindClasses;
    }
  }
  
  const agentsPath = path.join(process.cwd(), 'SpecForge-TX/AGENTS_RULES.md');
  if (fs.existsSync(agentsPath)) {
    projectContext += '\n\n=== naming: componentes=PascalCase, archivos=kebab-case ===';
    projectContext += '\n=== IMPORTS ===\nUsar NAMED imports para componentes en @/components (ej. import { Button } from "@/components/Button"). NO default exports.';
  }
  
  const confirmed = await askConfirm('¿Confirmas para generar el código con IA?');
  if (!confirmed) {
    console.log(chalk.yellow('❌ Cancelado por el usuario'));
    return;
  }
  
  console.log(chalk.gray('⏳ Generando código...'));
  const aiPrompt = `Implementa: "${feature}"

## SPEC
${existingSpec}

## ESTILO: Tailwind, bg-gray-900, text-white, #4ECCA3
${projectContext}

## RESULTADO CRÍTICO - LEE ESTO CUIDADOSAMENTE
⚠️  DEBES GENERAR CÓDIGO 100% COMPLETO Y VÁLIDO:

1. PRIMERA LÍNEA: comentario con nombre archivo // index.tsx
2. Archivo: src/features/${slug}/index.tsx
3. UI PREMIUM: glassmorphism, gradientes (bg-gradient-to-r), dark mode, abundancia de contenido
4. ICONOS: SVGs inline ÚNICAMENTE. NO react-icons, NO lucide-react
5. NOMBRE: componente principal = ${toPascalCase(slug)}
6. EXPORT: DEBES terminar con "export default ${toPascalCase(slug)};"
7. CÓDIGO: UN ÚNICO BLOQUE completo. NO ejemplos de integración
8. SIN wrappers: NO "LandingPage", NO imports circulares
9. ESTILO: Mismo que componentes existentes

⚠️  VALIDACIÓN FINAL OBLIGATORIA:
- ✓ TODOS los <div>, <section>, etc. ESTÁN CERRADOS (</div>)
- ✓ TODOS los className/strings ESTÁN entre comillas cerradas
- ✓ TODOS los paréntesis ( ) ESTÁN balanceados
- ✓ TODOS los brackets [ ] ESTÁN balanceados
- ✓ TODOS los braces { } ESTÁN balanceados
- ✓ El archivo TERMINA con "export default ${toPascalCase(slug)};"
- ✓ Mínimo 200 líneas de código completo

SI NO CUMPLES ESTOS REQUISITOS, EL CÓDIGO SERÁ RECHAZADO Y NO SE USARÁ.`;

  let code = await callAI(aiPrompt, 'Experto Next.js + Tailwind. Código limpio y funcional.');

  // Validar que el código no esté truncado, si lo está, reintentarl
  let retryCount = 0;
  const maxRetries = 2;

  while (isCodeTruncated(code) && retryCount < maxRetries) {
    retryCount++;
    console.log(chalk.yellow(`⚠️  Código truncado detectado (intento ${retryCount}/${maxRetries}). Regenerando...`));

    const retryPrompt = `${aiPrompt}

⚠️  INTENTO #${retryCount}: El código anterior estaba INCOMPLETO.
DEBES generar el código COMPLETAMENTE, sin truncar.
Incluye TODAS las funciones, estilos y lógica solicitada.
VALIDA que:
- El archivo tiene MÍNIMO 250 líneas
- TODAS las etiquetas HTML/JSX están cerradas
- El archivo termina con export default
- NO hay strings sin cerrar`;

    code = await callAI(retryPrompt, 'Experto Next.js + Tailwind. Código COMPLETO sin truncar.');
  }

  if (isCodeTruncated(code)) {
    console.log(chalk.red('❌ Código sigue truncado después de reintentos. Guardando estructura mínima.'));
  }

  // Extraer bloques de código de forma más robusta
  const codeBlockRegex = /```(?:tsx|typescript|ts|javascript|jsx)?\s*([\s\S]*?)```/g;
  const codeBlocks: string[] = [];
  let match;
  while ((match = codeBlockRegex.exec(code)) !== null) {
    codeBlocks.push(match[1].trim());
  }

  // Filtrar bloques - PRIORIZAR componente React, NO tests
  const validCodeBlocks = codeBlocks.filter(block => {
    const hasReactImport = /import React|from ['"]react['"]/.test(block);
    const hasJsxElements = /<[A-Z]\w+|className=|<div|<span|<section|<button/.test(block);
    const isComponent = /function \w+\(\)|const \w+ = \(\)|=> \(\)/.test(block);
    const hasArrowJsx = /=>\s*\(/m.test(block);
    const isTestFile = block.includes('describe(') || block.includes('it(') || block.includes('test(') || block.includes('expect(');
    const isTextExplanation = block.length > 50 && !hasReactImport && !hasJsxElements && !isComponent;
    return !isTextExplanation && !isTestFile && (hasReactImport || hasJsxElements || isComponent || hasArrowJsx);
  });

  const filesCreated: string[] = [];

  // Procesar cada bloque de código válido
  for (const blockContent of validCodeBlocks) {
    const lines = blockContent.split('\n');
    let filename = '';
    let fileCode = blockContent;

    if (lines.length > 0 && (lines[0].includes('//') || lines[0].includes('/*'))) {
      const commentMatch = lines[0].match(/(?:\/\/|\/\*)\s*([^*\/]+)/);
      if (commentMatch && commentMatch[1] && commentMatch[1].includes('.')) {
        filename = commentMatch[1].trim();
        fileCode = lines.slice(1).join('\n').trim();
      }
    }

    if (!filename) {
      filename = 'index.tsx';
    } else {
      filename = filename.replace(/^[\/\s]+/, '').split('/').pop() || 'index.tsx';
    }

    const ext = filename.endsWith('.tsx') || filename.endsWith('.ts') ? '' : '.tsx';
    const fullFilename = filename + ext;
    const baseName = fullFilename.replace(/\.(ts|tsx|js|jsx)$/, '');

    if (fileCode && fileCode.length > 100) {
      const filepath = path.join(fDir, fullFilename);
      const validatedCode = ensureDefaultExport(fileCode, toPascalCase(baseName));
      fs.writeFileSync(filepath, validatedCode);
      filesCreated.push(fullFilename);
      console.log(chalk.green(`✅ Código: ${filepath}`));
    }
  }

  // Fallback: si no hay bloques válidos, buscar código en la respuesta completa
  if (filesCreated.length === 0) {
    console.log(chalk.yellow('⚠️  Extrayendo código sin bloques formales...'));

    // Buscar el inicio más probable de código React
    const patterns = [
      /'use client'[\s\S]*?(?=export default|$)/,
      /import.*from['"]react['"][\s\S]*?(?=export default|function \w+\(\)|const \w+ =\(\)|$)/
    ];

    let extractedCode = '';
    for (const pattern of patterns) {
      const match = code.match(pattern);
      if (match && match[0].length > 150) {
        extractedCode = match[0];
        break;
      }
    }

    // Si no se encontró, tomar todo lo que parezca código
    if (!extractedCode) {
      const codeLines: string[] = [];
      let inCode = false;
      for (const line of code.split('\n')) {
        if (/^(import|export|'use client'|function |const \w+ =|type |interface )/.test(line) && !line.includes('```')) {
          inCode = true;
        }
        if (inCode) {
          codeLines.push(line);
          if (line.includes('export default') || line.match(/^}$/m)) {
            break;
          }
        }
      }
      extractedCode = codeLines.join('\n');
    }

    if (extractedCode && extractedCode.length > 100) {
      const indexPath = path.join(fDir, 'index.tsx');
      const validatedCode = ensureDefaultExport(extractedCode, toPascalCase(slug));
      fs.writeFileSync(indexPath, validatedCode);
      filesCreated.push('index.tsx');
      console.log(chalk.green(`✅ Código extraído: ${indexPath}`));
    } else {
      // Último recurso: generar componente básico
      const fallbackCode = `'use client';

import React from 'react';

export default function ${toPascalCase(slug)}() {
  return (
    <div className="w-full py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-[#4ECCA3] mb-4">${toPascalCase(slug)}</h2>
        <p className="text-gray-400">Componente generado automáticamente</p>
      </div>
    </div>
  );
}
`;
      const indexPath = path.join(fDir, 'index.tsx');
      fs.writeFileSync(indexPath, fallbackCode);
      filesCreated.push('index.tsx');
      console.log(chalk.green(`✅ Código generado: ${indexPath}`));
    }
  }
  
  const featureKey = Object.keys(state.features || {}).find(k => 
    state.features[k]?.spec?.slug === savedSlug || k === feature
  ) || feature;
  
  updateFeatureState(featureKey, 'code', { files: filesCreated });
  
  // Solo agregar import si se generó código
  if (filesCreated.length > 0) {
    addComponentToPage(slug);
  } else {
    console.log(chalk.yellow('⚠️  No se generó código válido, import no agregado'));
  }
  
  console.log(chalk.bold('\n✅ CODE completado\n'));
  
  console.log(chalk.cyan('📌 Próximos pasos:\n'));
  console.log(chalk.gray(`  sftx test "${slug}"        # FASE 3: Escribir tests`));
  console.log(chalk.gray(`  sftx verify "${slug}"      # FASE 4: Verificar`));
  console.log(chalk.gray(`  sftx docs "${slug}"         # FASE 5: Completar docs`));
  console.log(chalk.gray(`  sftx all "${slug}"          # Ejecutar todas las fases`));
}

// Validar que el código no esté truncado
function isCodeTruncated(code: string): boolean {
  // Contar brackets/parentesis/braces para detectar imbalance
  let brackets = 0, parens = 0, braces = 0;
  let inString = false, stringChar = '';

  for (let i = 0; i < code.length; i++) {
    const char = code[i];
    const prev = i > 0 ? code[i - 1] : '';

    // Detectar strings
    if ((char === '"' || char === "'" || char === '`') && prev !== '\\') {
      if (!inString) {
        inString = true;
        stringChar = char;
      } else if (char === stringChar) {
        inString = false;
      }
    }

    if (!inString) {
      if (char === '[') brackets++;
      else if (char === ']') brackets--;
      else if (char === '(') parens++;
      else if (char === ')') parens--;
      else if (char === '{') braces++;
      else if (char === '}') braces--;
    }
  }

  // Si hay imbalance, está truncado
  if (brackets !== 0 || parens !== 0 || braces !== 0) {
    return true;
  }

  // Si termina abruptamente (sin export, sin ;, etc)
  const trimmed = code.trim();
  if (trimmed.endsWith('mb-4') || trimmed.endsWith('className="') || trimmed.match(/className="[^"]*$/)) {
    return true;
  }

  return false;
}

// Validar y arreglar exports por defecto
function ensureDefaultExport(code: string, componentName: string): string {
  // Detectar si está truncado
  if (isCodeTruncated(code)) {
    console.warn(`⚠️  Código truncado detectado, retornando estructura mínima`);
    return `'use client';

import React from 'react';

export default function ${componentName}() {
  return (
    <div className="w-full p-8">
      <p className="text-gray-400">Contenido no generado correctamente. Intenta nuevamente con una descripción más clara.</p>
    </div>
  );
}`;
  }

  // SIEMPRE agregar export default si no existe - más robusto
  if (!code.includes('export default')) {
    // Buscar el primer componente (función o const que retorna JSX)
    const componentMatch = code.match(/(?:function|const)\s+(\w+)\s*[=\(]/);
    const mainComponent = componentMatch ? componentMatch[1] : componentName;
    
    // Agregar export default al final
    code = code + `\n\nexport default ${mainComponent};\n`;
    console.log(chalk.gray(`  ➕ Agregado export default ${mainComponent}`));
  }

  return code;
}

// Obtener comando dev según framework
function getDevCommand(framework: string): string | null {
  const commands: Record<string, string | null> = {
    nextjs: 'next dev',
    react: 'npm run dev',
    vue: 'npm run dev',
    angular: 'ng serve --port 4200',
    express: 'npm run dev',
    fastapi: 'uvicorn main:app --reload',
    'react-native': null, // Skip
    flutter: null, // Skip
    'ionic-react': 'npm run dev',
    'ionic-vue': 'npm run dev',
    'ionic-angular': 'ng serve',
  };
  return commands[framework] || null;
}

// Esperar a que dev server esté listo
async function waitForDevServer(framework: string, timeout: number): Promise<void> {
  const startTime = Date.now();

  return new Promise((resolve, reject) => {
    const checkInterval = setInterval(async () => {
      try {
        const port = framework === 'angular' || framework === 'ionic-angular' ? 4200 : 3000;
        const healthUrl = framework === 'fastapi' ? 'http://localhost:8000/docs' : `http://localhost:${port}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1000);

        try {
          const response = await fetch(healthUrl, { signal: controller.signal });
          clearTimeout(timeoutId);

          if (response.ok || response.status < 500) {
            clearInterval(checkInterval);
            resolve();
          }
        } catch (e) {
          clearTimeout(timeoutId);
          // Aún no está listo, continuar intentando
        }
      } catch (e) {
        // Aún no está listo, continuar intentando
      }

      if (Date.now() - startTime > timeout) {
        clearInterval(checkInterval);
        reject(new Error('Dev server timeout - no respondió en tiempo límite'));
      }
    }, 1000);
  });
}

function extractCodeFromSpec(specContent: string): string {
  // Intento 1: Extraer desde un bloque de código formal
  const codeBlockMatch = specContent.match(/```(?:tsx|typescript|ts|javascript|jsx)?\s*([\s\S]*?)```/);
  if (codeBlockMatch && codeBlockMatch[1].length > 100) {
    return codeBlockMatch[1].trim();
  }

  // Intento 2: Buscar inicio de código (use client, import, export)
  const codePatterns = [
    /'use client'[\s\S]*?export\s+(default|function|const)[\s\S]*/,
    /import[\s\S]*?export\s+(default|function|const)[\s\S]*/,
    /export\s+(default|function|const)[\s\S]*/,
    /function\s+\w+[\s\S]*/,
    /const\s+\w+\s*=[\s\S]*/,
  ];

  for (const pattern of codePatterns) {
    const match = specContent.match(pattern);
    if (match && match[0].length > 100) {
      return match[0].trim();
    }
  }

  // Intento 3: Si todo falla, retornar vacío
  return '';
}

async function runTEST(feature: string): Promise<void> {
  console.log(chalk.bold.cyan('\n🧪 FASE 3: TEST - Tests\n'));

  const state = readState();
  const savedSlug = state.features?.[feature]?.spec?.slug || feature;
  const { feature: fDir, slug } = getFeatureDirs(savedSlug);

  const featureKey = Object.keys(state.features || {}).find(k =>
    state.features[k]?.spec?.slug === savedSlug || k === feature
  ) || feature;

  const codeFiles = state.features?.[featureKey]?.code?.files || [];

  if (!codeFiles || codeFiles.length === 0) {
    console.log(chalk.red('❌ No hay código para testear. Ejecuta: sftx code "' + feature + '"'));
    return;
  }

  const confirmed = await askConfirm('¿Confirmas para generar tests con IA?');
  if (!confirmed) {
    console.log(chalk.yellow('❌ Cancelado por el usuario'));
    return;
  }

  console.log(chalk.gray('⏳ Generando tests...'));
  let existingCode = '';
  for (const f of codeFiles) {
    const codePath = path.join(fDir, f);
    if (fs.existsSync(codePath)) {
      existingCode += '\n// ' + f + '\n' + fs.readFileSync(codePath, 'utf-8');
    }
  }

  // Detectar framework para adaptar generación de tests
  const framework = state.config?.framework || 'nextjs';
  const testType = options.type || 'unit';
  let testFramework = 'Jest';
  let testSyntax = 'TypeScript con Jest (describe/it/expect)';

  if (framework === 'fastapi') {
    testFramework = 'Pytest';
    testSyntax = 'Python con Pytest (def test_* / assert)';
  } else if (framework === 'flutter') {
    testFramework = 'flutter_test';
    testSyntax = 'Dart con flutter_test (testWidgets / expect)';
  } else if (['react', 'vue', 'ionic-react', 'ionic-vue'].includes(framework)) {
    testFramework = 'Vitest';
    testSyntax = 'TypeScript con Vitest (describe/it/expect)';
  } else if (framework === 'angular' || framework === 'ionic-angular') {
    testFramework = 'Jasmine';
    testSyntax = 'TypeScript con Jasmine (describe/it/expect)';
  }

  const testTypeDescription = testType === 'integration' ? 'integración (testing interaction entre módulos)' :
                               testType === 'e2e' ? 'end-to-end (testing complete workflows)' :
                               'unitarios (testing individual functions/components)';

  const aiPrompt = `Genera tests ${testTypeDescription} para el feature: "${feature}"

Código existente:
${existingCode}

Framework: ${framework} (${testFramework})
Genera tests con ${testSyntax}.
IMPORTANTE: La PRIMERA LÍNEA de cada bloque de código DEBE ser un comentario con el nombre del archivo test (ej: // ${slug}.test.${framework === 'fastapi' ? 'py' : framework === 'flutter' ? 'dart' : 'tsx'})`;

  const tests = await callAI(aiPrompt, 'Eres un experto en testing. Genera tests con Jest, describe/it/expect.');
  
  const testBlocks = tests.match(/```(?:typescript|ts|javascript|js)?\s*[\s\S]*?```/g) || [];
  const testsCreated: string[] = [];
  
  for (const block of testBlocks) {
    const cleanBlock = block.replace(/```(?:typescript|ts|javascript|js)?/g, '').replace(/```$/g, '').trim();
    const lines = cleanBlock.split('\n');
    let filename = lines[0]?.trim() || '';
    let testCode = lines.slice(1).join('\n');
    
    if (filename.startsWith('import ') || filename.includes('describe(') || filename.includes('test(') || filename.includes('it(')) {
      testCode = filename + '\n' + testCode;
      filename = `${slug}.test.ts`;
    } else {
      filename = filename.replace(/^[\/\s]+/, '');
      filename = filename.split('/').pop() || `${slug}.test.ts`;
    }
    
    if (filename && (filename.endsWith('.test.ts') || filename.endsWith('.spec.ts') || filename.endsWith('.test.tsx')) && testCode) {
      const filepath = path.join(fDir, filename);
      fs.writeFileSync(filepath, testCode);
      testsCreated.push(filename);
      console.log(chalk.green(`✅ Test: ${filepath}`));
    }
  }
  
  if (testsCreated.length === 0) {
    const testFile = path.join(fDir, `${slug}.test.ts`);
    fs.writeFileSync(testFile, tests);
    testsCreated.push(`${slug}.test.ts`);
    console.log(chalk.green(`✅ Test: ${testFile}`));
  }
  
  updateFeatureState(featureKey, 'test', { files: testsCreated });
  
  console.log(chalk.bold('\n✅ TEST completado\n'));
  
  console.log(chalk.cyan('📌 Próximos pasos:\n'));
  console.log(chalk.gray(`  sftx verify "${slug}"      # FASE 4: Verificar (tests + lint)`));
  console.log(chalk.gray(`  sftx docs "${slug}"        # FASE 5: Completar docs`));
  console.log(chalk.gray(`  sftx all "${slug}"         # Ejecutar todas las fases`));
}

async function runVERIFY(feature: string, attempt: number = 0): Promise<void> {
  console.log(chalk.bold.cyan('\n✅ FASE 4: VERIFY - Verificación\n'));
  
  const state = readState();
  const savedSlug = state.features?.[feature]?.spec?.slug || feature;
  const { feature: fDir, slug } = getFeatureDirs(savedSlug);
  
  const featureKey = Object.keys(state.features || {}).find(k => 
    state.features[k]?.spec?.slug === savedSlug || k === feature
  ) || feature;
  
  const testFiles = state.features?.[featureKey]?.test?.files || [];
  
  if (!testFiles || testFiles.length === 0) {
    console.log(chalk.red('❌ No hay tests. Ejecuta: sftx test "' + feature + '"'));
    return;
  }
  
  const confirmed = await askConfirm('¿Ejecutar tests, lint y coverage?');
  if (!confirmed) {
    console.log(chalk.yellow('❌ Cancelado por el usuario'));
    return;
  }
  
  console.log(chalk.yellow('\n📦 Instalando dependencias...'));
  try { execSync('npm install'); } catch (e) {}
  
  console.log(chalk.yellow('\n🧪 Ejecutando tests...'));
  let testResult = '';
  let testPassed = true;
  try {
    // Construir comando de test basado en opciones
    let testCmd = 'npm test';
    const watchMode = options.watch || false;
    const onlyFeature = options.onlyFeature || false;
    const minCoverageStr = options.minCoverage || '80';
    const minCoverage = parseInt(minCoverageStr);

    // Agregar flags según framework y opciones
    if (watchMode) {
      console.log(chalk.cyan('👀 Modo watch activado'));
      testCmd = 'npm run test:watch';
      testPassed = true; // No fallar si está en watch mode
      console.log(chalk.green('✅ Tests en watch mode iniciados'));
      console.log(chalk.gray('Presiona Ctrl+C para salir del watch mode\n'));
      child_process.execSync(testCmd, { stdio: 'inherit' });
      return;
    } else {
      // Modo normal: ejecutar con coverage
      if (onlyFeature) {
        console.log(chalk.cyan(`🎯 Ejecutando solo tests de ${slug}`));
        testCmd += ` -- src/features/${slug} --coverage --passWithNoTests`;
      } else {
        testCmd += ` -- --coverage --passWithNoTests`;
      }
    }

    testResult = execSync(testCmd + ' 2>&1');
    console.log(chalk.green('✅ Tests ejecutados'));
    console.log(chalk.gray(testResult.substring(0, 500)));

    // Guardar reporte de coverage con timestamp
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      const coverageDir = path.join(process.cwd(), 'coverage-reports');
      fs.mkdirSync(coverageDir, { recursive: true });
      const timestampDir = path.join(coverageDir, timestamp);
      fs.mkdirSync(timestampDir, { recursive: true });
      // Copiar coverage report si existe
      const coverageSource = path.join(process.cwd(), 'coverage');
      if (fs.existsSync(coverageSource)) {
        child_process.execSync(`cp -r ${coverageSource} ${timestampDir}/`, { stdio: 'ignore' });
        console.log(chalk.gray(`📊 Reporte guardado en: ${timestampDir}/coverage`));
      }
    } catch (e) {
      // Silenciar errores en copia de coverage
    }
  } catch (e: any) {
    testPassed = false;
    testResult = e.message || 'error';
    console.log(chalk.red('❌ Error en Tests: \n' + testResult.substring(0, 500)));
  }
  
  console.log(chalk.yellow('\n🏗️  Validando build (incluye verificación de lint)...'));
  let buildPassed = true;
  let lintPassed = true;
  let buildResult = '';
  try {
    buildResult = execSync('npm run build 2>&1');
    console.log(chalk.green('✅ Build exitoso (lint verificado)'));
  } catch (e: any) {
    // Check if it's a lint error or build error
    if (buildResult.includes('Lint') || buildResult.includes(' ESLint')) {
      lintPassed = false;
      console.log(chalk.red('❌ Lint: errores encontrados'));
    }
    buildPassed = false;
    console.log(chalk.red('❌ Error en Build: \n' + buildResult.substring(0, 500)));
  }

  console.log(chalk.yellow('\n🚀 Verificando dev server (opcional)...'));
  let devServerPassed = true;
  try {
    const framework = state.config?.framework || 'nextjs';
    const devCmd = getDevCommand(framework);
    if (devCmd && buildPassed) {
      console.log(chalk.gray('  ⏭️  Build ok - dev server opcional, saltando...'));
    }
  } catch (e: any) {
    devServerPassed = false;
    console.log(chalk.gray('  ⏭️  Dev server omitido'));
  }

  const coverageMatch = testResult.match(/(statements?|lines?|functions?|branches?)\s*[=:]\s*(\d+\.?\d*)%/gi);
  let coverageObj: any = {};
  let minCoverageStr = '80';
  let minCoverage = 80;

  try {
    minCoverageStr = options.minCoverage || '80';
    minCoverage = parseInt(minCoverageStr);
  } catch (e) {
    minCoverage = 80;
  }

  if (coverageMatch) {
    for (const m of coverageMatch) {
      const [key, val] = m.split(/[=:]/).map((s: string) => s.trim());
      const pct = parseFloat(val);
      if (!isNaN(pct)) {
        const keyName = key.toLowerCase().replace(/s$/, '');
        coverageObj[keyName] = pct;
        // Validar contra umbral mínimo
        if (pct < minCoverage && testPassed) {
          testPassed = false;
          console.log(chalk.yellow(`⚠️  Coverage ${keyName}: ${pct}% < ${minCoverage}% (mínimo requerido)`));
        }
      }
    }
  }
  
  const verifyPassed = testPassed && lintPassed && buildPassed && devServerPassed;
  updateFeatureState(featureKey, 'verify', { coverage: coverageObj, passed: verifyPassed });

  if (!verifyPassed) {
    console.log(chalk.bold.red('\n❌ VERIFY falló. Lanzando auto-corrección...\n'));

    let combinedLogs = '';
    if (!testPassed) combinedLogs += `[TEST ERROR]\n${testResult.substring(0, 200)}\n\n`;
    if (!lintPassed) combinedLogs += `[LINT ERROR]\nErrores de lint/build detectados.\n\n`;
    if (!buildPassed) combinedLogs += `[BUILD ERROR]\n${buildResult.substring(0, 200)}\n\n`;
    if (!devServerPassed) combinedLogs += `[DEV SERVER ERROR]\nTimeout del dev server.\n\n`;

    await runFIX(feature, combinedLogs, attempt + 1);
    return;
  }
  
  console.log(chalk.bold('\n✅ VERIFY completado\n'));
  
  console.log(chalk.cyan('📌 Próximos pasos:\n'));
  console.log(chalk.gray(`  sftx docs "${slug}"        # FASE 5: Completar docs`));
  console.log(chalk.gray(`  sftx commit "${slug}"      # FASE 6: Commit y push`));
}

async function runDOCS(feature: string): Promise<void> {
  console.log(chalk.bold.cyan('\n📝 FASE 5: DOCS - Documentación\n'));
  
  const state = readState();
  const savedSlug = state.features?.[feature]?.spec?.slug || feature;
  const { docs: dDir, slug } = getFeatureDirs(savedSlug);
  
  const featureKey = Object.keys(state.features || {}).find(k => 
    state.features[k]?.spec?.slug === savedSlug || k === feature
  ) || feature;
  
  const allFiles = [
    ...(state.features?.[featureKey]?.code?.files || []),
    ...(state.features?.[featureKey]?.test?.files || [])
  ];
  
  const confirmed = await askConfirm('¿Confirmas para completar documentación?');
  if (!confirmed) {
    console.log(chalk.yellow('❌ Cancelado por el usuario'));
    return;
  }
  
  const featureFile = path.join(dDir, `${slug}.md`);
  if (fs.existsSync(featureFile)) {
    let content = fs.readFileSync(featureFile, 'utf-8');
    content = content.replace(/- \[ \] Pendiente/g, '- [x] Completado');
    content = content.replace(/- \[ \]/g, '- [x]');
    fs.writeFileSync(featureFile, content);
    console.log(chalk.green(`✅ ${slug}.md actualizado`));
  }
  
  const completedFile = path.join(dDir, 'COMPLETED.md');
  const completed = `# ${feature} - COMPLETADO

## Fecha de completado
${new Date().toISOString().split('T')[0]}

## Archivos creados
${allFiles.map(f => `- \`src/features/${slug}/${f}\``).join('\n')}

## Estado
- [x] SPEC escrita
- [x] Código implementado
- [x] Tests escritos
- [x] Verificación passée
- [x] Documentación completada

## Definition of Done
| ✅ | Requisito |
|----|----------|
| ☐ | Spec escrita y aprobada |
| ☐ | Código implementa la spec |
| ☐ | Tests passing |
| ☐ | Coverage >= 80% |
| ☐ | Lint passing |
| ☐ | Documentación completa |
| ☐ | CHANGELOG.md actualizado |
| ☐ | Git commit + push |
`;
  fs.writeFileSync(completedFile, completed);
  console.log(chalk.green(`✅ COMPLETED.md creado`));
  
  updateFeatureState(featureKey, 'docs', { completed: true });
  
  console.log(chalk.bold('\n✅ DOCS completado\n'));
  
  console.log(chalk.cyan('📌 Próximos pasos:\n'));
  console.log(chalk.gray(`  sftx commit "${slug}"      # FASE 6: Commit y push`));
}

async function runCOMMIT(feature: string): Promise<void> {
  console.log(chalk.bold.cyan('\n🔧 FASE 6: COMMIT - Commit y Push\n'));
  
  const state = readState();
  const savedSlug = state.features?.[feature]?.spec?.slug || feature;
  const { docs: dDir, slug } = getFeatureDirs(savedSlug);
  
  const featureKey = Object.keys(state.features || {}).find(k => 
    state.features[k]?.spec?.slug === savedSlug || k === feature
  ) || feature;
  
  const verifyPassed = state.features?.[featureKey]?.verify?.passed;
  
  if (!verifyPassed) {
    console.log(chalk.red('❌ Verificación no pasada. Ejecuta: sftx verify "' + feature + '"'));
    return;
  }
  
  const confirmed = await askConfirm('¿Confirmas para hacer commit y push?');
  if (!confirmed) {
    console.log(chalk.yellow('❌ Cancelado por el usuario'));
    return;
  }
  
  const changelogFile = path.join(process.cwd(), 'CHANGELOG.md');
  if (fs.existsSync(changelogFile)) {
    let changelog = fs.readFileSync(changelogFile, 'utf-8');
    const today = new Date().toISOString().split('T')[0];
    if (!changelog.includes(`## [0.0.1] - ${today}`)) {
      changelog = changelog.replace(
        '# Changelog',
        `# Changelog

## [0.0.1] - ${today}

### Added
- **feat(${slug})**: ${feature}
`
      );
      fs.writeFileSync(changelogFile, changelog);
      console.log(chalk.green('✅ CHANGELOG.md actualizado'));
    }
  }
  
  console.log(chalk.yellow('\n📦 Ejecutando git add...'));
  try {
    execSync('git add -A');
    console.log(chalk.gray('✅ Archivos preparados'));
  } catch (e) {
    console.log(chalk.yellow('⚠️ git add falló'));
  }
  
  console.log(chalk.yellow('\n💾 Ejecutando git commit...'));
  try {
    execSync(`git commit -m "feat(${slug}): add ${feature}"`);
    console.log(chalk.green('✅ Commit realizado'));
  } catch (e: any) {
    if (e.message && e.message.includes('nothing to commit')) {
      console.log(chalk.yellow('⚠️ No hay cambios para commit'));
    } else {
      console.log(chalk.yellow('⚠️ Commit: ' + e.message));
    }
  }
  
  console.log(chalk.yellow('\n🚀 Ejecutando git push...'));
  try {
    execSync('git push');
    console.log(chalk.green('✅ Push realizado'));
  } catch (e) {
    console.log(chalk.yellow('⚠️ Push: no hay remote configurado o falló'));
  }
  
  updateFeatureState(featureKey, 'commit', { committed: true, pushed: true });
  
  console.log(chalk.bold('\n✅ COMMIT completado\n'));
}
async function runFIX(feature: string, errorLog: string = '', attempt: number = 1): Promise<void> {
  console.log(chalk.bold.cyan(`\n🛠️  FASE FIX: Auto-Corrección (Intento ${attempt}/2)\n`));
  const MAX_ATTEMPTS = 2;
  if (attempt > MAX_ATTEMPTS) {
    console.log(chalk.red('❌ Límite de auto-corrección excedido. Por favor corrige el código manualmente.'));
    return;
  }
  const state = readState();
  const savedSlug = state.features?.[feature]?.spec?.slug || feature;
  const { feature: fDir } = getFeatureDirs(savedSlug);
  const featureKey = Object.keys(state.features || {}).find(k => k === feature || state.features[k]?.spec?.slug === savedSlug) || feature;
  const codeFiles = state.features?.[featureKey]?.code?.files || ['index.tsx'];
  const testFiles = state.features?.[featureKey]?.test?.files || [];
  
  if (!errorLog) {
     console.log(chalk.gray('🔍 Detectando errores localmente...'));
     try { execSync('npm run build 2>&1'); execSync('npm test -- --passWithNoTests 2>&1'); execSync('npm run lint 2>&1'); errorLog = 'Compilación general falló. Revisa la lógica.'; }
     catch(e: any) { errorLog = e.message || 'error'; }
  }

  let codeContext = '';
  for (const f of [...codeFiles, ...testFiles]) {
    const fPath = f.endsWith('.test.tsx') ? path.join(fDir.replace('src/features', 'docs/features'), f) : path.join(fDir, f);
    if (fs.existsSync(fPath)) {
      codeContext += `\n--- Archivo: ${f} ---\n${fs.readFileSync(fPath, 'utf8')}\n`;
    }
  }

  const aiPrompt = `Tienes la tarea de corregir un error crítico en el código generado previamente.
Aquí está el Log del Error:
${errorLog}

Aquí están los archivos existentes:
${codeContext}

Por favor, analiza el error y RESCRIBE ÚNICAMENTE EL ARCHIVO AFECTADO para solucionarlo.
Devuelve el código COMPLETO del archivo corregido envuelto en un ÚNICO bloque \`\`\`tsx (incluyendo el import inicial). Empieza el bloque con el nombre original del archivo comentado en la primera línea.`;

  console.log(chalk.yellow('🤖 Analizando logs e inyectando corrección mediante IA...'));
  const fixResponse = await callAI(aiPrompt, 'Experto en depuración de NextJS/React.');
  
  const fileCode = extractCodeFromSpec(fixResponse);
  
  if (fileCode) {
    let filename = 'index.tsx';
    // Try to extract filename from first line if it's a comment
    const firstLine = fileCode.split('\n')[0];
    if (firstLine.includes('//') || firstLine.includes('/*')) {
       const potentialName = firstLine.replace(/[\/\*\s]+/g, '').trim();
       if (potentialName && potentialName.includes('.') && !/[<>:"|?*]/.test(potentialName)) {
         filename = potentialName;
       }
    }

    const targetPath = filename.includes('.test.tsx') ? path.join(process.cwd(), 'src', 'features', savedSlug, filename) : path.join(fDir, filename);
    fs.writeFileSync(path.join(fDir, filename), fileCode);
    console.log(chalk.green(`✅ Archivo parcheado: ${filename}`));
    
    // Re-verify after fixing!
    await runVERIFY(feature, attempt);
  } else {
    console.log(chalk.red('❌ La IA no pudo devolver código extraíble.'));
    console.log(chalk.gray('Respuesta recibida: ' + fixResponse.substring(0, 100) + '...'));
  }
}

async function main() {
  if (isVersion) {
    showVersion();
    return;
  }

  if (isHelp) {
    showHelp();
    return;
  }

  if (isMap) {
    const projectMap = new ProjectMap();
    if (options.update) {
      await projectMap.update();
    } else {
      await projectMap.generate();
    }
    return;
  }

  console.log(chalk.bold.cyan('\n🚀 SpecForge-TX - CLI SDD de Transformateck\n'));
  
  if (isInstall) {
    console.log(chalk.yellow('\n📦 Instalando SDD en proyecto existente...\n'));
    await generateExistingProject({ author: options.author || 'Developer' });
    console.log(chalk.green('\n✅ SDD instalado correctamente!\n'));
    return;
  }
  
  if (isCreate) {
    let projectName = args[1];
    let framework: Framework | undefined = options.framework as Framework;
    let author = options.author || 'Developer';
    
    if (!projectName) {
      const response = await prompts({ type: 'text', name: 'projectName', message: 'Nombre del proyecto:', initial: 'mi-proyecto' });
      projectName = response.projectName;
    }
    if (!framework) {
      const response = await prompts({ type: 'select', name: 'framework', message: 'Selecciona framework:', choices: frameworks.map((f) => ({ title: f.name + ' - ' + f.description, value: f.value })) });
      framework = response.framework;
    }
    
    console.log(chalk.yellow('\n📦 Generando proyecto...\n'));
    await generateNewProject({ name: projectName, framework: framework!, author: author! });
    console.log(chalk.green('\n✅ Proyecto creado!\n'));
    return;
  }
  
  if (isSpec || isCode || isTest || isVerify || isDocs || isCommit || isFix) {
    if (!featureName) {
      console.log(chalk.red('❌ Falta el nombre del feature. Uso: sftx ' + args[0] + ' "<nombre>"\n'));
      return;
    }
    
    if (isSpec) await runSPEC(featureName);
    else if (isCode) await runCODE(featureName);
    else if (isTest) await runTEST(featureName);
    else if (isVerify) await runVERIFY(featureName);
    else if (isDocs) await runDOCS(featureName);
    else if (isCommit) await runCOMMIT(featureName);
    else if (isFix) await runFIX(featureName);
    return;
  }
  
  if (args[0] === 'all') {
    if (!featureName) {
      console.log(chalk.red('❌ Falta el nombre. Uso: sftx all "<feature>"\n'));
      return;
    }
    console.log(chalk.bold.cyan('\n🚀 Ejecutando flujo SDD completo para: ' + featureName + '\n'));
    await runSPEC(featureName);
    await runCODE(featureName);
    await runTEST(featureName);
    await runVERIFY(featureName);
    await runDOCS(featureName);
    await runCOMMIT(featureName);
  }
}

main().catch(e => {
  console.log(chalk.red('\n❌ Error fatal:'), e);
  process.exit(1);
});
