import chalk from 'chalk'

const TECK_COLOR = '#4ECCA3'
const DIM = '#888888'

export function showHelp() {
  console.log('\n')

  console.log(chalk.hex(TECK_COLOR)('  SpecForge-TX') + chalk.white(' — Spec-Driven Development para builders latinos'))
  console.log(chalk.hex(TECK_COLOR)('  by Transformateck 🥑'))
  console.log('\n')

  console.log(chalk.white('  USO:'))
  console.log(chalk.hex(DIM)('  sftx <comando> [opciones]'))
  console.log('\n')

  console.log(chalk.hex(TECK_COLOR)('  SETUP:'))
  console.log(
    chalk.white('  sftx create <nombre>') +
    chalk.hex(DIM)('   → Crear proyecto nuevo con reglas SDD')
  )
  console.log(
    chalk.white('  sftx install') +
    chalk.hex(DIM)('          → Instalar reglas SDD en proyecto existente')
  )
  console.log('\n')

  console.log(chalk.hex(TECK_COLOR)('  PROYECTO:'))
  console.log(
    chalk.white('  sftx map') +
    chalk.hex(DIM)('              → Generar mapa del proyecto')
  )
  console.log(
    chalk.white('  sftx sync') +
    chalk.hex(DIM)('             → Sincronizar tablero con tasks.md')
  )
  console.log(
    chalk.white('  sftx sync --close <id>') +
    chalk.hex(DIM)(' → Cerrar task por ID')
  )
  console.log(
    chalk.white('  sftx doctor') +
    chalk.hex(DIM)('           → Validar que todo está listo')
  )
  console.log('\n')

  console.log(chalk.hex(TECK_COLOR)('  AGENTE:'))
  console.log(
    chalk.white('  sftx add <tarea>') +
    chalk.hex(DIM)('      → Flujo SDD completo con IA')
  )
  console.log(
    chalk.white('  sftx fix <error>') +
    chalk.hex(DIM)('      → Corregir bug rápido con IA')
  )
  console.log(
    chalk.white('  sftx revert <id>') +
    chalk.hex(DIM)('      → Deshacer una feature')
  )
  console.log('\n')

  console.log(chalk.hex(TECK_COLOR)('  SLASH COMMANDS (en tu agente):'))
  console.log(chalk.hex(DIM)('  /sftx:spec    → Generar spec desde tasks.md'))
  console.log(chalk.hex(DIM)('  /sftx:code    → Implementar según el spec'))
  console.log(chalk.hex(DIM)('  /sftx:test    → Generar y correr tests'))
  console.log(chalk.hex(DIM)('  /sftx:verify  → Verificar contra el spec'))
  console.log(chalk.hex(DIM)('  /sftx:docs    → Generar documentación'))
  console.log(chalk.hex(DIM)('  /sftx:commit  → Commit + push + sync'))
  console.log('\n')

  console.log(chalk.hex(TECK_COLOR)('  INFO:'))
  console.log(
    chalk.white('  sftx -v') +
    chalk.hex(DIM)('               → Mostrar versión')
  )
  console.log(
    chalk.white('  sftx help') +
    chalk.hex(DIM)('             → Mostrar esta ayuda')
  )
  console.log('\n')

  console.log(chalk.hex(TECK_COLOR)('  STATS:'))
  console.log(
    chalk.white('  sftx stats') +
    chalk.hex(DIM)('            → Ver historial de uso y costos')
  )
  console.log('\n')

  console.log(chalk.hex(DIM)('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
  console.log(chalk.hex(DIM)('  Docs: https://specforge-tx.dev'))
  console.log(chalk.hex(DIM)('  Issues: https://github.com/transformateck/specforge-tx'))
  console.log(chalk.hex(DIM)('  Comunidad: https://wa.me/transformateck'))
  console.log('\n')
}