'use strict'

const chalk = require('chalk')

module.exports = (
  label,
  { defaultValue = false, yesChar = 'y', noChar = 'n' } = {}
) => {
  return new Promise(resolve => {
    const { stdin, stdout } = process
    const isRaw = stdin.isRaw
    const abortSequences = new Set(['\u0003'])
    const resolveChars = new Set(['\r'])

    stdin.setRawMode(true)
    stdin.resume()

    const restore = () => {
      stdout.write('')
      stdin.setRawMode(isRaw)
      stdin.pause()
      stdin.removeListener('data', onData)
    }

    const onData = buffer => {
      const data = buffer.toString()

      if (data[0].toLowerCase() === yesChar) {
        restore()
        resolve(true)
      } else if (data[0].toLowerCase() === noChar) {
        restore()
        resolve(false)
      } else if (abortSequences.has(data)) {
        restore()
        resolve(false)
      } else if (resolveChars.has(data[0])) {
        restore()
        resolve(defaultValue)
      } else {
        // ignore
      }
    }

    const defaultText = defaultValue === null
      ? `[${yesChar}|${noChar}]`
      : defaultValue
        ? `[${chalk.bold(yesChar.toUpperCase())}|${noChar}]`
        : `[${yesChar}|${chalk.bold(noChar.toUpperCase())}]`
    stdout.write(`${chalk.gray('>')} ${label} ${chalk.gray(defaultText)} `)
    stdin.on('data', onData)
  })
}
