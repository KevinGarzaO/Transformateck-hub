import chalk from 'chalk'
import figlet from 'figlet'

const TECK_COLOR = '#4ECCA3'

export function showVersion() {
  const ascii = figlet.textSync('SFTX', {
    font: 'ANSI Shadow',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })

  console.log('\n')
  console.log(chalk.hex(TECK_COLOR)(ascii))
  console.log(chalk.hex(TECK_COLOR)('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
  console.log(
    chalk.hex(TECK_COLOR)('  SpecForge-TX ') +
    chalk.white('v0.1.0')
  )
  console.log(
    chalk.hex(TECK_COLOR)('  ') +
    chalk.white('Spec-Driven Development para builders latinos')
  )
  console.log(chalk.hex(TECK_COLOR)('  by Transformateck 🥑'))
  console.log(chalk.hex(TECK_COLOR)('  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━'))
  console.log('\n')
}