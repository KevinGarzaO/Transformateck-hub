import fs from 'fs'
import path from 'path'
import chalk from 'chalk'
import { glob } from 'glob'

const TECK_COLOR = '#4ECCA3'

const IGNORED_DIRS = [
  'node_modules', '.git', '.next', 'dist',
  'build', 'sftx', '.turbo', 'coverage'
]

const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx']

export class ProjectMap {

  detectStack(): string[] {
    if (!fs.existsSync('package.json')) return ['Desconocido']
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))
    const deps = { ...pkg.dependencies, ...pkg.devDependencies }
    const stack: string[] = []

    if (deps['next']) stack.push(`Next.js ${deps['next'].replace('^', '')}`)
    if (deps['react']) stack.push('React')
    if (deps['typescript']) stack.push('TypeScript')
    if (deps['@supabase/supabase-js']) stack.push('Supabase')
    if (deps['prisma']) stack.push('Prisma')
    if (deps['express']) stack.push('Express')
    if (deps['tailwindcss']) stack.push('Tailwind')
    if (deps['jest']) stack.push('Jest')
    if (deps['vitest']) stack.push('Vitest')

    return stack.length > 0 ? stack : ['Node.js']
  }

  extractSummary(content: string, filePath: string): string {
    const lines: string[] = []

    const exports = content
      .match(/export\s+(?:default\s+)?(?:const|function|class|type|interface|enum)\s+(\w+)/g)
      ?.map(e => e.split(/\s+/).pop() || '')
      .filter(Boolean) || []
    if (exports.length > 0) {
      lines.push(`- Exports: ${exports.join(', ')}`)
    }

    const imports = content
      .match(/from\s+'([^']+)'/g)
      ?.map(i => i.replace(/from\s+'|'/g, ''))
      .filter(i => !i.startsWith('.'))
      .slice(0, 5) || []
    if (imports.length > 0) {
      lines.push(`- Deps: ${imports.join(', ')}`)
    }

    const routes = content
      .match(/['"`]\/(api|auth|dashboard)[a-z\/\-]*['"`]/g)
      ?.map(r => r.replace(/['"`]/g, ''))
      .slice(0, 3) || []
    if (routes.length > 0) {
      lines.push(`- Rutas: ${routes.join(', ')}`)
    }

    lines.push(`- Líneas: ${content.split('\n').length}`)

    return lines.join('\n')
  }

  async generate(): Promise<void> {
    console.log('\n')
    console.log(chalk.hex(TECK_COLOR)('  ⚡ sftx map — Generando mapa del proyecto...'))
    console.log('\n')

    const pattern = `**/*{${EXTENSIONS.join(',')}}`
    const allFiles = await glob(pattern, {
      ignore: IGNORED_DIRS.map(d => `**/${d}/**`),
      absolute: false
    })

    if (allFiles.length === 0) {
      console.log(chalk.red('  ❌ No se encontraron archivos para mapear'))
      console.log(chalk.gray('  → Asegúrate de correr sftx map desde la raíz del proyecto'))
      return
    }

    const stack = this.detectStack()
    console.log(chalk.hex(TECK_COLOR)(`  → Stack detectado: ${stack.join(', ')}`))
    console.log(chalk.hex(TECK_COLOR)(`  → ${allFiles.length} archivos encontrados`))

    let map = `# Mapa del Proyecto — SpecForge-TX\n\n`
    map += `Generado: ${new Date().toISOString()}\n`
    map += `Stack: ${stack.join(', ')}\n`
    map += `Archivos: ${allFiles.length}\n\n`
    map += `---\n\n`

    const byDir: Record<string, string[]> = {}
    for (const file of allFiles.sort()) {
      const dir = path.dirname(file)
      if (!byDir[dir]) byDir[dir] = []
      byDir[dir].push(file)
    }

    for (const [dir, files] of Object.entries(byDir)) {
      map += `## 📁 ${dir}/\n\n`

      for (const file of files) {
        if (!fs.existsSync(file)) continue
        const content = fs.readFileSync(file, 'utf8')
        const summary = this.extractSummary(content, file)
        map += `### ${file}\n${summary}\n\n`
        console.log(chalk.gray(`  → Mapeando: ${file}`))
      }
    }

    fs.mkdirSync('sftx', { recursive: true })
    fs.writeFileSync('sftx/project-map.md', map)

    console.log('\n')
    console.log(chalk.hex(TECK_COLOR)('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
    console.log(chalk.hex(TECK_COLOR)('  ✅ Mapa generado correctamente'))
    console.log(chalk.white(`  → sftx/project-map.md`))
    console.log(chalk.white(`  → ${allFiles.length} archivos mapeados`))
    console.log(chalk.white(`  → Stack: ${stack.join(', ')}`))
    console.log(chalk.hex(TECK_COLOR)('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
    console.log('\n')
  }

  async update(): Promise<void> {
    if (!fs.existsSync('sftx/project-map.md')) {
      console.log(chalk.gray('  → No existe mapa — generando desde cero'))
      return await this.generate()
    }

    const mapStat = fs.statSync('sftx/project-map.md')
    const pattern = `**/*{${EXTENSIONS.join(',')}}`
    const allFiles = await glob(pattern, {
      ignore: IGNORED_DIRS.map(d => `**/${d}/**`)
    })

    const modifiedFiles = allFiles.filter(file => {
      if (!fs.existsSync(file)) return false
      const fileStat = fs.statSync(file)
      return fileStat.mtime > mapStat.mtime
    })

    if (modifiedFiles.length === 0) {
      console.log(chalk.gray('  → Mapa actualizado — sin cambios'))
      return
    }

    console.log(chalk.hex(TECK_COLOR)(`  → Actualizando ${modifiedFiles.length} archivos en el mapa`))

    let map = fs.readFileSync('sftx/project-map.md', 'utf8')

    for (const file of modifiedFiles) {
      const content = fs.readFileSync(file, 'utf8')
      const summary = this.extractSummary(content, file)
      const newSection = `### ${file}\n${summary}\n\n`

      if (map.includes(`### ${file}`)) {
        const regex = new RegExp(`### ${file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[\\s\\S]*?(?=###|##|$)`)
        map = map.replace(regex, newSection)
      } else {
        map += newSection
      }

      console.log(chalk.gray(`  → Actualizado: ${file}`))
    }

    map = map.replace(
      /Generado: .*/,
      `Generado: ${new Date().toISOString()} (actualizado)`
    )

    fs.writeFileSync('sftx/project-map.md', map)
    console.log(chalk.hex(TECK_COLOR)('  ✅ Mapa actualizado'))
  }
}