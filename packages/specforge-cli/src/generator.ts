import * as fs from 'fs';
import * as path from 'path';
import * as child_process from 'child_process';
import chalk from 'chalk';
import { NewProjectOptions, ExistingProjectOptions } from './types';
import { getFrameworkConfig } from './frameworks';

const TEMPLATE_DIR = path.join(__dirname, '../templates');

export async function generateNewProject(options: NewProjectOptions): Promise<void> {
  const { name, framework, author } = options;
  const projectDir = path.join(process.cwd(), name);
  
  if (fs.existsSync(projectDir)) {
    throw new Error(`Directory ${name} already exists`);
  }

  fs.mkdirSync(projectDir, { recursive: true });
  
  const config = getFrameworkConfig(framework);
  
  fs.mkdirSync(path.join(projectDir, 'docs'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'docs', 'features'), { recursive: true });
  fs.mkdirSync(path.join(projectDir, 'tests'), { recursive: true });
  
  config.structure.forEach((dir: string) => {
    if (dir.startsWith('src/')) {
      const subDir = dir.replace('src/', '');
      fs.mkdirSync(path.join(projectDir, 'src', subDir), { recursive: true });
    } else {
      fs.mkdirSync(path.join(projectDir, dir), { recursive: true });
    }
  });

  const packageJson = generatePackageJson(name, config, framework, author);
  fs.writeFileSync(
    path.join(projectDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  const tsconfig = generateTsconfig(framework);
  if (tsconfig) {
    fs.writeFileSync(
      path.join(projectDir, 'tsconfig.json'),
      JSON.stringify(tsconfig, null, 2)
    );
  }

  fs.writeFileSync(
    path.join(projectDir, 'next.config.mjs'),
    `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
`
  );

  generateGitignore(projectDir, framework);
  generateEnvExample(projectDir, framework);
  generateMainFile(projectDir, framework);

  fs.mkdirSync(path.join(projectDir, 'SpecForge-TX'), { recursive: true });
  generateSpecForgeTX(projectDir, name, framework, author, config);
  copyTemplateRules(projectDir);
  generateLintConfig(projectDir, framework);
  generateTestConfig(projectDir, framework);
  generateReadmeFromRules(projectDir, name, framework, author, config);
  generateChangelog(projectDir, name, framework);
  generateContributing(projectDir, author);
  generateSecurity(projectDir, name);

  fs.mkdirSync(path.join(projectDir, '.github'), { recursive: true });
  fs.copyFileSync(
    path.join(__dirname, '../templates/ISSUE_TEMPLATE.md'),
    path.join(projectDir, '.github/ISSUE_TEMPLATE.md')
  );

  console.log(`✅ Proyecto: ${name}/`);
  console.log(`✅ Reglas SDD: SpecForge-TX/`);
  console.log(`✅ Framework: ${config.name}`);
  
  console.log(chalk.yellow('\n📦 Instalando dependencias...'));
  const originalCwd = process.cwd();
  process.chdir(projectDir);
  let step = 0;
  const steps = ['| Descargando paquetes...', '/ Instalando dependencias...', '- Configurando proyecto...'];
  const interval = setInterval(() => {
    if (step < steps.length) {
      process.stdout.write('\r' + chalk.yellow(steps[step]));
      step++;
    }
  }, 1200);
  
  try {
    child_process.execSync('npm install --silent', { stdio: 'ignore' });
    clearInterval(interval);
    process.stdout.write('\r' + chalk.green('✅ Dependencias instaladas     \n'));
  } catch (e) {
    clearInterval(interval);
    process.stdout.write('\r' + chalk.yellow('⚠️ npm install tuvo problemas\n'));
  }
  process.chdir(originalCwd);
  
  console.log(chalk.cyan('\n📌 Próximos pasos:\n'));
  console.log(chalk.gray(`  cd ${name}`));
  console.log(chalk.gray('  npm run dev'));
  console.log(chalk.gray('  # ¡Listo para desarrollar!'));
}

export async function generateExistingProject(options: ExistingProjectOptions): Promise<void> {
  const projectDir = process.cwd();
  
  const docsDir = path.join(projectDir, 'docs');
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir, { recursive: true });
  }
  
  const featuresDir = path.join(docsDir, 'features');
  if (!fs.existsSync(featuresDir)) {
    fs.mkdirSync(featuresDir, { recursive: true });
  }

  const specforgeDir = path.join(projectDir, 'SpecForge-TX');
  if (!fs.existsSync(specforgeDir)) {
    fs.mkdirSync(specforgeDir, { recursive: true });
  }

  const templatesDir = path.join(__dirname, '../templates');
  
  if (!fs.existsSync(path.join(specforgeDir, 'AGENTS_RULES.md'))) {
    fs.copyFileSync(
      path.join(templatesDir, 'AGENTS_TEMPLATE.md'),
      path.join(specforgeDir, 'AGENTS_RULES.md')
    );
    console.log('✅ Reglas SDD: AGENTS_RULES.md');
  }
  
  if (!fs.existsSync(path.join(specforgeDir, 'README_RULES.md'))) {
    fs.copyFileSync(
      path.join(templatesDir, 'README_TEMPLATE.md'),
      path.join(specforgeDir, 'README_RULES.md')
    );
    console.log('✅ Reglas SDD: README_RULES.md');
  }
  
  if (!fs.existsSync(path.join(specforgeDir, 'CHANGELOG_RULES.md'))) {
    fs.copyFileSync(
      path.join(templatesDir, 'CHANGELOG_TEMPLATE.md'),
      path.join(specforgeDir, 'CHANGELOG_RULES.md')
    );
    console.log('✅ Reglas SDD: CHANGELOG_RULES.md');
  }
  
  if (!fs.existsSync(path.join(specforgeDir, 'ISSUE_RULES.md'))) {
    fs.copyFileSync(
      path.join(templatesDir, 'ISSUE_TEMPLATE.md'),
      path.join(specforgeDir, 'ISSUE_RULES.md')
    );
    console.log('✅ Reglas SDD: ISSUE_RULES.md');
  }
  
  if (!fs.existsSync(path.join(projectDir, '.github/ISSUE_TEMPLATE.md'))) {
    fs.mkdirSync(path.join(projectDir, '.github'), { recursive: true });
    fs.copyFileSync(
      path.join(templatesDir, 'ISSUE_TEMPLATE.md'),
      path.join(projectDir, '.github/ISSUE_TEMPLATE.md')
    );
    console.log('✅ Template GitHub: ISSUE_TEMPLATE.md');
  }
  
  if (!fs.existsSync(path.join(specforgeDir, 'CONTRIBUTING_RULES.md'))) {
    fs.copyFileSync(
      path.join(templatesDir, 'CONTRIBUTING_TEMPLATE.md'),
      path.join(specforgeDir, 'CONTRIBUTING_RULES.md')
    );
    console.log('✅ Reglas SDD: CONTRIBUTING_RULES.md');
  }
  
  if (!fs.existsSync(path.join(specforgeDir, 'SECURITY_RULES.md'))) {
    fs.copyFileSync(
      path.join(templatesDir, 'SECURITY_TEMPLATE.md'),
      path.join(specforgeDir, 'SECURITY_RULES.md')
    );
    console.log('✅ Reglas SDD: SECURITY_RULES.md');
  }

  console.log(`✅ docs/features/`);
}

function generatePackageJson(name: string, config: any, framework: string, author: string): any {
  const base: any = {
    name: name.toLowerCase().replace(/\s+/g, '-'),
    version: '0.1.0',
    description: `${name} - SDD project with ${config.name}`,
    author: author,
    license: 'MIT',
    scripts: {
      ...config.scripts,
      "prepare": "husky"
    },
    dependencies: config.dependencies.reduce((acc: any, dep: string) => {
      acc[dep] = '*';
      return acc;
    }, {}),
    devDependencies: config.devDependencies.reduce((acc: any, dep: string) => {
      acc[dep] = '*';
      return acc;
    }, {}),
  };

  base.scripts = {
    ...base.scripts,
    prepare: "husky"
  };
  base["lint-staged"] = {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{js,jsx,json,md}": ["prettier --write"]
  };
  base["husky"] = {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm test"
    }
  };

  if (framework === 'fastapi') {
    base.python_version = '3.11';
    base.requirements = config.dependencies;
    base.dev_requirements = config.devDependencies;
    delete base.scripts;
    delete base.dependencies;
    delete base.devDependencies;
  } else if (framework === 'flutter') {
    base.pubspec = {
      name: name.toLowerCase().replace(/\s+/g, '_'),
      version: '0.1.0',
      dependencies: config.dependencies.reduce((acc: any, dep: string) => {
        acc[dep] = 'any';
        return acc;
      }, {}),
      dev_dependencies: config.devDependencies.reduce((acc: any, dep: string) => {
        acc[dep] = 'any';
        return acc;
      }, {}),
    };
    delete base.dependencies;
    delete base.devDependencies;
  }

  return base;
}

function generateTsconfig(framework: string): any {
  if (framework === 'fastapi' || framework === 'flutter') {
    return null;
  }

  return {
    compilerOptions: {
      target: 'ES2020',
      lib: ['ES2020'],
      module: 'ESNext',
      moduleResolution: 'bundler',
      strict: true,
      esModuleInterop: true,
      skipLibCheck: true,
      forceConsistentCasingInFileNames: true,
      jsx: 'preserve',
      ignoreDeprecations: '6.0',
      noEmit: true,
      baseUrl: '.',
      paths: {
        '@/*': ['src/*'],
      },
    },
    include: ['src/**/*'],
    exclude: ['node_modules', 'dist'],
  };
}

function generateGitignore(projectDir: string, framework: string): void {
  const gitignore = `
node_modules/
dist/
build/
.env
.env.local
*.log
.DS_Store
coverage/
.vscode/
.idea/
*.swp
`;
  fs.writeFileSync(path.join(projectDir, '.gitignore'), gitignore);
}

function generateEnvExample(projectDir: string, framework: string): void {
  let envExample = '# Environment Variables\n';
  
  if (framework === 'express' || framework === 'nextjs' || framework === 'react') {
    envExample += `
NODE_ENV=development
PORT=3000
DATABASE_URL=
API_KEY=
`;
  } else if (framework === 'fastapi') {
    envExample += `
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
API_KEY=
SECRET_KEY=
`;
  }

  fs.writeFileSync(path.join(projectDir, '.env.example'), envExample);
}

function generateMainFile(projectDir: string, framework: string): void {
  const srcDir = path.join(projectDir, 'src');

  if (framework === 'nextjs') {
    const appDir = path.join(srcDir, 'app');
    const stylesDir = path.join(srcDir, 'styles');
    const componentsDir = path.join(srcDir, 'components');
    
    fs.mkdirSync(appDir, { recursive: true });
    fs.mkdirSync(stylesDir, { recursive: true });
    fs.mkdirSync(componentsDir, { recursive: true });

    fs.writeFileSync(path.join(stylesDir, 'globals.css'), `@import "tailwindcss";\n\n@theme {\n  --color-transformateck: #4ECCA3;\n}\n`);
    
    fs.writeFileSync(path.join(appDir, 'layout.tsx'), `import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'SpecForge-TX | SDD CLI for AI-Powered Development',
  description: 'CLI for Specification-Driven Development with AI. Generate projects, features, tests and docs with AI.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gray-950 text-white antialiased">
        {children}
      </body>
    </html>
  );
}
`);
    
    const landingPage = `import Link from 'next/link';
import { Button } from '@/components/Button';
import { FeatureCard } from '@/components/FeatureCard';
import { Badge } from '@/components/Badge';

const features = [
  {
    title: 'Desarrollo con IA',
    description: 'Genera features, tests y docs usando IA',
    icon: '🤖',
  },
  {
    title: 'Specification-Driven',
    description: 'Sigue las mejores prácticas SDD con templates',
    icon: '📋',
  },
  {
    title: 'Type-Safe',
    description: 'Soporte completo TypeScript con tipos automáticos',
    icon: '🛡️',
  },
  {
    title: 'Pre-Commit Hooks',
    description: 'husky + lint-staged para calidad de código',
    icon: '⚡',
  },
];

const commands = [
  { cmd: 'spec "<feature>"', desc: 'FASE 1: Escribir SPEC (User Story, criterios)' },
  { cmd: 'code "<feature>"', desc: 'FASE 2: Implementar código' },
  { cmd: 'test "<feature>"', desc: 'FASE 3: Escribir tests unitarios' },
  { cmd: 'verify "<feature>"', desc: 'FASE 4: Tests + lint + coverage' },
  { cmd: 'docs "<feature>"', desc: 'FASE 5: Completar docs' },
  { cmd: 'commit "<feature>"', desc: 'FASE 6: git commit + push' },
  { cmd: 'all "<feature>"', desc: 'Todas las fases (spec+code+test+verify+docs+commit)' },
  { cmd: 'fix "<bug>"', desc: 'Corregir bug con IA' },
];

const workflowSteps = [
  { phase: '1. SPEC', cmd: 'sftx spec "carrito de compras"', desc: 'Generate SPEC with User Story, criteria, rules' },
  { phase: '2. CODE', cmd: 'sftx code "carrito de compras"', desc: 'Implement code following SPEC' },
  { phase: '3. TEST', cmd: 'sftx test "carrito de compras"', desc: 'Write unit tests with Jest' },
  { phase: '4. VERIFY', cmd: 'sftx verify "carrito de compras"', desc: 'Run tests + lint + coverage' },
  { phase: '5. DOCS', cmd: 'sftx docs "carrito de compras"', desc: 'Complete docs + COMPLETED.md' },
  { phase: '6. COMMIT', cmd: 'sftx commit "carrito de compras"', desc: 'git commit + push + CHANGELOG' },
];

const exampleFeatures = [
  { name: 'Shopping Cart', files: ['index.ts', 'CartItem.ts', 'CartService.ts', 'cart.test.ts'], docs: ['SPEC.md', 'spec-shopping-cart.md'] },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-950 to-[#4ECCA3]/10" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4ECCA3]/20 rounded-full blur-[120px]" />
        
        <div className="relative max-w-6xl mx-auto">
          <Badge text="v1.0.0" />
          
          <h1 className="text-5xl md:text-7xl font-bold mt-8 mb-6">
            <span className="text-white">Desarrolla más rápido con</span>
            <br />
            <span className="text-[#4ECCA3]">SpecForge-TX</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mb-6">
            CLI para Desarrollo Orientado por Specs con IA. Genera proyectos, 
            features, tests y docs automáticamente.
          </p>
          <p className="text-lg text-gray-500 mb-10">
            Desarrollado por <span className="text-[#4ECCA3]">Transformateck</span> - Herramientas de desarrollo potenciadas por IA
          </p>
          
          <div className="flex gap-4">
            <Button variant="primary">
              <Link href="https://github.com/anomalyco/specforge-tx">
                Comenzar
              </Link>
            </Button>
            <Button variant="secondary">
              <Link href="#commands">
                Comandos
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="text-[#4ECCA3]">Poderosas</span> Características
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* SDD Workflow Section */}
      <section id="workflow" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">
            Flujo <span className="text-[#4ECCA3]">SDD</span> Completo
          </h2>
          <p className="text-gray-400 text-center mb-12">
            6 fases para desarrollar features con specification-driven development
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workflowSteps.map((step) => (
              <div key={step.phase} className="p-4 bg-gray-950 rounded-lg border border-gray-800 hover:border-[#4ECCA3]/50 transition-colors">
                <div className="text-[#4ECCA3] font-bold text-lg mb-2">{step.phase}</div>
                <code className="text-white text-sm block mb-2">{step.cmd}</code>
                <p className="text-gray-500 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-900 rounded-lg text-center">
            <p className="text-gray-400">
              <span className="text-[#4ECCA3] font-bold">Atajo:</span> Ejecuta todas las fases con un comando
            </p>
            <code className="text-[#4ECCA3] text-lg">sftx all "carrito de compras"</code>
          </div>
        </div>
      </section>

      {/* Example Section */}
      <section id="example" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Ejemplo: <span className="text-[#4ECCA3]">Carrito de Compras</span>
          </h2>
          
          <div className="bg-gray-900/50 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 text-[#4ECCA3]">Archivos generados</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-gray-400">Código:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-[#4ECCA3]">📄</span>
                    <code>src/features/carrito-de-compras/index.ts</code>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4ECCA3]">📄</span>
                    <code>src/features/carrito-de-compras/CartService.ts</code>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4ECCA3]">📄</span>
                    <code>src/features/carrito-de-compras/cart.test.ts</code>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-gray-400">Documentación:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-[#4ECCA3]">📄</span>
                    <code>docs/features/carrito-de-compras/SPEC.md</code>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-[#4ECCA3]">📄</span>
                    <code>docs/features/carrito-de-compras/completed.md</code>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-[#4ECCA3]">Estados del feature</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-xs">1</span>
                <span>SPEC escrita y aprobada</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-xs">2</span>
                <span>Código implementado siguiendo SPEC</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center text-xs">3</span>
                <span>Tests passing (coverage 80%+)</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-6 h-6 bg-[#4ECCA3] text-gray-900 rounded flex items-center justify-center text-xs">✓</span>
                <span>Verificación pasada</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Next Steps Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            Próximos <span className="text-[#4ECCA3]">Pasos</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">1. Entrar al proyecto</h3>
              <pre className="bg-gray-950 rounded-lg p-4 text-sm text-gray-300">
cd nombre-proyecto
              </pre>
            </div>
            
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
              <h3 className="text-lg font-semibold mb-4">2. Iniciar desarrollo</h3>
              <pre className="bg-gray-950 rounded-lg p-4 text-sm text-gray-300">
npm run dev
              </pre>
            </div>
            
            <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl col-span-2">
              <h3 className="text-lg font-semibold mb-4">3. Agregar tu primera feature SDD</h3>
              <pre className="bg-gray-950 rounded-lg p-4 text-sm text-gray-300">
sftx spec "carrito de compras"
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Commands Reference Section */}
      <section id="commands" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">
            Referencia de <span className="text-[#4ECCA3]">Comandos</span>
          </h2>
          
          <div className="space-y-4">
            {commands.map((c) => (
              <div key={c.cmd} className="flex items-center gap-4 p-4 bg-gray-950 rounded-lg">
                <code className="text-[#4ECCA3] font-mono text-sm min-w-[250px]">sftx {c.cmd}</code>
                <span className="text-gray-400 text-sm">{c.desc}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-gray-900 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#4ECCA3]">Atajo - Todas las fases</h3>
            <p className="text-gray-400 text-sm mb-2">
              Ejecuta spec + code + test + verify + docs + commit automáticamente
            </p>
            <code className="text-white">sftx all "carrito de compras"</code>
          </div>
          
          <div className="mt-4 p-4 bg-gray-900 rounded-lg">
            <h3 className="font-semibold mb-2 text-[#4ECCA3]">Corregir bug</h3>
            <code className="text-white">sftx fix "error en login"</code>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>Desarrollado con 🔥 por <span className="text-[#4ECCA3]">Transformateck</span></p>
          <p className="text-sm mt-2">Potenciado por IA • Licencia MIT</p>
        </div>
      </footer>
    </main>
  );
}
`;
    fs.writeFileSync(path.join(appDir, 'page.tsx'), landingPage);

    const buttonComponent = `export function Button({ 
  children, 
  variant = 'primary' 
}: { 
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}) {
  const baseStyles = 'px-6 py-3 rounded-lg font-semibold transition-all duration-200';
  const variants = {
    primary: 'bg-[#4ECCA3] text-gray-950 hover:bg-[#6FEDBD]',
    secondary: 'border border-[#4ECCA3] text-[#4ECCA3] hover:bg-[#4ECCA3]/10',
  };
  
  return (
    <button className={\`\${baseStyles} \${variants[variant]}\`}>
      {children}
    </button>
  );
}
`;
    fs.writeFileSync(path.join(componentsDir, 'Button.tsx'), buttonComponent);

    const featureCardComponent = `export function FeatureCard({ 
  title, 
  description, 
  icon 
}: { 
  title: string;
  description: string;
  icon: string;
}) {
  return (
    <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-[#4ECCA3]/50 transition-colors">
      <span className="text-4xl mb-4 block">{icon}</span>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
}
`;
    fs.writeFileSync(path.join(componentsDir, 'FeatureCard.tsx'), featureCardComponent);

    const badgeComponent = `export function Badge({ text }: { text: string }) {
  return (
    <span className="inline-block px-3 py-1 text-sm font-medium bg-[#4ECCA3]/20 text-[#4ECCA3] rounded-full">
      {text}
    </span>
  );
}
`;
    fs.writeFileSync(path.join(componentsDir, 'Badge.tsx'), badgeComponent);
    
    fs.writeFileSync(path.join(appDir, 'globals.css'), `@import "tailwindcss";`);
  } else if (framework === 'react') {
    fs.writeFileSync(path.join(srcDir, 'App.tsx'), `import { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>React SDD Project</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
    </div>
  );
}

export default App;
`);
  } else if (framework === 'vue') {
    fs.writeFileSync(path.join(srcDir, 'App.vue'), `<template>
  <div>
    <h1>Vue SDD Project</h1>
    <button @click="count++">Count: {{ count }}</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const count = ref(0);
</script>
`);
  } else if (framework === 'express') {
    fs.writeFileSync(path.join(srcDir, 'index.ts'), `import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});
`);
  } else if (framework === 'fastapi') {
    fs.writeFileSync(path.join(projectDir, 'main.py'), `from fastapi import FastAPI

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
`);
  } else if (framework === 'flutter') {
    fs.mkdirSync(path.join(projectDir, 'lib'), { recursive: true });
    fs.writeFileSync(path.join(projectDir, 'lib/main.dart'), `void main() {
  print('Hello, SDD Project!');
}
`);
  }
}

function generateSpecForgeTX(projectDir: string, name: string, framework: string, author: string, config: any): void {
const projectName = name;
}

function generateReadmeFromRules(projectDir: string, name: string, framework: string, author: string, config: any): void {
  const scriptsList = Object.entries(config.scripts).map(([k, v]) => `- \`${k}\`: ${v}`).join('\n');
  
  const readme = `# ${name}

> SDD Project - ${config.name}

## Tech Stack

| Category | Value |
|----------|-------|
| Framework | ${config.name} |
| Language | ${config.language} |
| Testing | ${config.testing} |
| Lint | ${config.lint} |

## Inicio Rápido

\`\`\`bash
# Install dependencies
npm install

# Initialize husky (pre-commit hooks)
npx husky install

# Run development
${config.scripts.dev || config.scripts.start || config.scripts.run}
\`\`\`

## Scripts

${scriptsList}

## Estructura

\`\`\`
${name}/
├── src/
${config.structure.filter((d: string) => d.startsWith('src/')).map((d: string) => `│   ├── ${d.replace('src/', '')}/`).join('\n')}
${config.structure.filter((d: string) => !d.startsWith('src/')).map((d: string) => `├── ${d}/`).join('\n')}
├── docs/
│   └── features/
├── tests/
└── SpecForge-TX/
\`\`\`

## Reglas SDD

| Regla | Descripción |
|-------|------------|
| Coverage | Mínimo 80% |
| Documentación | docs/features/<feature>/ |
| Commits | CHANGELOG.md actualizado |
| Pre-commit | Ejecuta lint + test |

## Commands SDD

\`\`\`bash
sftx add "carrito"     # Agregar feature con IA
sftx fix "bug"         # Corregir bug con IA
sftx test "feature"    # Generar tests
sftx docs "tema"       # Generar docs
\`\`\`

## Git Hooks

- **pre-commit**: lint-staged (eslint + prettier)
- **pre-push**: npm test

## Author

${author}

## License

MIT
`;
  fs.writeFileSync(path.join(projectDir, 'README.md'), readme);
}

function _generateReadmeLegacy(projectDir: string, name: string, framework: string, author: string, config: any): void {
  const rulesPath = path.join(projectDir, 'SpecForge-TX', 'README_RULES.md');
  const rules = fs.existsSync(rulesPath) ? fs.readFileSync(rulesPath, 'utf-8') : '';
  
  const readme = `# ${name}

> SDD Project - ${config.name}

## Descripción

${name} es un proyecto desarrollado con Specification-Driven Development (SDD).

## Tech Stack

- **Framework:** ${config.name}
- **Lenguaje:** ${config.language}
- **Testing:** ${config.testing}
- **Linting:** ${config.lint}

## Getting Started

\`\`\`bash
# Install dependencies
${framework === 'fastapi' ? 'pip install -r requirements.txt' : 'npm install'}

# Run development
${config.scripts.dev || config.scripts.start || config.scripts.run}

# Run tests
${config.scripts.test}
\`\`\`

## Estructura

\`\`\`
src/
${config.structure.filter((d: string) => d.startsWith('src/')).map((d: string) => `├── ${d.replace('src/', '')}/`).join('\n')}
${config.structure.filter((d: string) => !d.startsWith('src/')).map((d: string) => `├── ${d}/`).join('\n')}
docs/
├── features/
tests/
\`\`\`

## Comandos SDD

- \`sftx add "<task>"\` - Agregar feature con IA
- \`sftx fix "<issue>"\` - Corregir bug
- \`sftx test "<feature>"\` - Generar tests
- \`sftx docs "<topic>"\` - Generar docs

## Author

${author}

## License

MIT
`;
  fs.writeFileSync(path.join(projectDir, 'README.md'), readme);
}

function generateChangelog(projectDir: string, name: string, framework: string): void {
  const changelog = `# Changelog - ${name}

All notable changes to this project will be documented in this file.

## [0.1.0] - ${new Date().toISOString().split('T')[0]}

### Added
- **feat**: Initial SDD project setup with ${framework}

### Features
- **feat(sdd)**: AI-powered development with sftx CLI
- **feat(test)**: Automated testing generation
- **feat(docs)**: Documentation generation

---

## Generated with SpecForge-TX

\`\`\`bash
npx specforge-tx create ${name} --framework ${framework}
\`\`\`
`;
  fs.writeFileSync(path.join(projectDir, 'CHANGELOG.md'), changelog);
}

function generateContributing(projectDir: string, author: string): void {
  const content = `# Contributing

## Getting Started

1. Fork el repositorio
2. Crea tu rama (\`git checkout -b feat/nueva-feature\`)
3. Haz commit con conventional commits (\`git commit -m 'feat: add nueva feature'\`)
4. Push a la rama (\`git push origin feat/nueva-feature\`)
5. Abre un Pull Request

## Reglas SDD

| Regla | Descripción |
|-------|-------------|
| Coverage mínimo | 80% |
| Documentación | docs/features/<feature>/ |
| Commits | CHANGELOG.md actualizado |
| Commits format | conventional commits (feat:, fix:, docs:) |

## Conventional Commits

\`\`\`bash
feat: adds new feature
fix: resolves bug
docs: updates documentation
test: adds tests
refactor: improves code without changing behavior
\`\`\`

## Testing

\`\`\`bash
npm test
\`\`\`

## Generated by ${author}
`;
  fs.writeFileSync(path.join(projectDir, 'CONTRIBUTING.md'), content);
}

function generateSecurity(projectDir: string, name: string): void {
  const content = `# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| 0.1.x | ✅ |

## Reporting a Vulnerability

Si encuentras una vulnerabilidad, por favor reporta a:

1. No creer temas en GitHub
2. Contactar directamente al mantenedor

---

## Generated with SpecForge-TX - ${name}
`;
  fs.writeFileSync(path.join(projectDir, 'SECURITY.md'), content);
}

function copyTemplateRules(projectDir: string): void {
  const specforgeDir = path.join(projectDir, 'SpecForge-TX');
  
  fs.copyFileSync(
    path.join(__dirname, '../templates/CHANGELOG_TEMPLATE.md'),
    path.join(specforgeDir, 'CHANGELOG_RULES.md')
  );
  
  fs.copyFileSync(
    path.join(__dirname, '../templates/AGENTS_TEMPLATE.md'),
    path.join(specforgeDir, 'AGENTS_RULES.md')
  );
  
  fs.copyFileSync(
    path.join(__dirname, '../templates/README_TEMPLATE.md'),
    path.join(specforgeDir, 'README_RULES.md')
  );
  
  fs.copyFileSync(
    path.join(__dirname, '../templates/SECURITY_TEMPLATE.md'),
    path.join(specforgeDir, 'SECURITY_RULES.md')
  );
  
  fs.copyFileSync(
    path.join(__dirname, '../templates/CONTRIBUTING_TEMPLATE.md'),
    path.join(specforgeDir, 'CONTRIBUTING_RULES.md')
  );
  
  fs.copyFileSync(
    path.join(__dirname, '../templates/ISSUE_TEMPLATE.md'),
    path.join(specforgeDir, 'ISSUE_RULES.md')
  );
}

function generateTestConfig(projectDir: string, framework: string): void {
  // Jest-based frameworks: Next.js, Express, React Native
  if (framework === 'nextjs' || framework === 'express' || framework === 'react-native') {
    const jestConfig = `module.exports = {
  preset: ${framework === 'nextjs' ? "'next/jest'" : framework === 'react-native' ? "'react-native'" : "'ts-jest'"},
  testEnvironment: '${framework === 'nextjs' ? 'jsdom' : framework === 'react-native' ? 'node' : 'node'}',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.tsx',
    '!src/**/index.ts',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/.next/', '/dist/'],
  coverageThreshold: {
    global: {
      statements: 80,
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
};`;
    fs.writeFileSync(path.join(projectDir, 'jest.config.js'), jestConfig);
    console.log('✅ Generated: jest.config.js');
  }

  // Vitest-based frameworks: React (Vite), Vue, Ionic React, Ionic Vue
  if (['react', 'vue', 'ionic-react', 'ionic-vue'].includes(framework)) {
    const vitestConfig = `import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [${framework === 'react' || framework === 'ionic-react' ? 'react()' : 'vue()'}],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      include: ['src/**/*.{ts,tsx,vue}'],
      exclude: [
        'node_modules/',
        'src/**/*.d.ts',
        'src/**/*.stories.{ts,tsx,vue}',
      ],
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80,
    },
  },
});`;
    fs.writeFileSync(path.join(projectDir, 'vitest.config.ts'), vitestConfig);
    console.log('✅ Generated: vitest.config.ts');
  }

  // Angular & Ionic Angular (Jasmine + Karma)
  if (framework === 'angular' || framework === 'ionic-angular') {
    const karmaConfig = `// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {},
      clearContext: false,
    },
    jasmineHtmlReporter: {
      suppressAll: true,
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'lcovonly' }],
      check: {
        global: {
          statements: 80,
          branches: 80,
          lines: 80,
          functions: 80,
        },
      },
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true,
  });
};`;
    fs.writeFileSync(path.join(projectDir, 'karma.conf.js'), karmaConfig);
    console.log('✅ Generated: karma.conf.js');
  }

  // FastAPI (Pytest)
  if (framework === 'fastapi') {
    const pytestIni = `[pytest]
testpaths = tests
python_files = test_*.py *_test.py
python_classes = Test*
python_functions = test_*
addopts =
  --strict-markers
  --cov=app
  --cov-report=html
  --cov-report=term-missing
  --cov-fail-under=80
markers =
  unit: unit tests
  integration: integration tests
  e2e: end-to-end tests`;
    fs.writeFileSync(path.join(projectDir, 'pytest.ini'), pytestIni);
    console.log('✅ Generated: pytest.ini');

    const pytestConfig = `import pytest
from pathlib import Path

def pytest_configure(config):
    """Register custom markers"""
    config.addinivalue_line(
        "markers", "unit: mark test as a unit test"
    )
    config.addinivalue_line(
        "markers", "integration: mark test as an integration test"
    )
    config.addinivalue_line(
        "markers", "e2e: mark test as an end-to-end test"
    )`;
    fs.writeFileSync(path.join(projectDir, 'conftest.py'), pytestConfig);
    console.log('✅ Generated: conftest.py');
  }

  // Flutter
  if (framework === 'flutter') {
    const flutterTestConfig = `import 'package:flutter_test/flutter_test.dart';

void main() {
  group('Flutter Tests Configuration', () {
    test('Configuration loaded successfully', () {
      expect(true, isTrue);
    });
  });
}`;
    fs.mkdirSync(path.join(projectDir, 'test'), { recursive: true });
    fs.writeFileSync(
      path.join(projectDir, 'test', 'widget_test.dart'),
      flutterTestConfig
    );
    console.log('✅ Generated: test/widget_test.dart');
  }
}

function generateLintConfig(projectDir: string, framework: string): void {
  // Skip ESLint config - Next.js has its own lint setup with next lint
  // No config file needed; verification will use build check instead
  return;

  const prettier = `{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "tabWidth": 2,
  "useTabs": false,
  "printWidth": 80,
  "bracketSpacing": true,
  "arrowParens": "avoid"
}
`;
  fs.writeFileSync(path.join(projectDir, '.prettierrc'), prettier);

  if (framework === 'nextjs' || framework === 'react') {
    const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        transformateck: '#4ECCA3',
      },
    },
  },
}
`;
    fs.writeFileSync(path.join(projectDir, 'tailwind.config.js'), tailwindConfig);

    const postcssConfig = `export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
`;
    fs.writeFileSync(path.join(projectDir, 'postcss.config.mjs'), postcssConfig);
  }
}