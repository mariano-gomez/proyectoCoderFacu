const logger = require('../logger')
const { CustomError, ErrorType } = require('../errors/custom.error')

class TestController {
  static logger = async (req, res, next) => {
    try {
      
      logger.fatal('este es el logger fatal')
      logger.error('este es el logger error')
      logger.warning('este es el logger warning')
      logger.http('este es el logger http')
      logger.debug('este es el logger debug')

      res.send('se ejecuto la prueba del logger')
    } catch (err) {
      next(
        new CustomError(err.message, ErrorType.DB, 'CartController-getProducts')
      )
      //res.send({ status: 'Error', Error: e.message })
    }
  }
}

module.exports = TestController
