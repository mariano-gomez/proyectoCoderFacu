
const ErrorType = {
  DB: 'Error en la base de datos',
  General: 'Error general en la aplicacion',
  Otro: 'Otro codigo de error',
  Mocker: 'No se pudieron crear los productos Mockeados'
}

class CustomError extends Error {
  constructor(message, type,place) {
    super(message)
    this.type = type
    this.place = place
  }
}

module.exports = {
  CustomError,
  ErrorType
}