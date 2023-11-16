const { enviroment } = require('../config/process.config.enviroment')
const winston = require('winston')
const { createLogger } = winston
const { Console, File } = winston.transports
const { combine, timestamp, printf, colorize, align, simple } = winston.format

console.log('valor de enviroment:', enviroment)
let consoleLevel

if (enviroment === 'production') {
  consoleLevel = 'info'
} else if (enviroment === 'development') {
  consoleLevel = 'debug'
}

const options = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    http: 'blue',
    debug: 'white',
  },
}

const logger = createLogger({
  levels: options.levels,
  transports: [
    new Console({
      level: consoleLevel,
      format: combine(
        colorize({ colors: options.colors }),
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss A',
        }),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message} `)
      ),
    }),
    new File({
      filename: `./logs/error.log`,
      level: 'error', // 'error'
      format: combine(
        simple(),
        timestamp({
          format: 'YYYY-MM-DD hh:mm:ss.SSS A',
        }),
        printf((info) => `[${info.timestamp}] ${info.level}: ${info.message} `)
      ),
    }),
  ],
})

//logger.info('hola desde logger')

module.exports = logger
