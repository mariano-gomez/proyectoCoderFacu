const logger = require('../logger')

const httpLogger = (req, _res, next) => {
  logger.http(`[${req.method}] - ${req.url} Date:${(new Date()).toISOString()}`)
  next()
}

module.exports = httpLogger