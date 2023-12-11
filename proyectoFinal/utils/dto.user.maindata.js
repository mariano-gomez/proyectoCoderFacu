// este DTO recibe un usuario tal cual viene de la BD y lo transforma para mostrarlo en el perfil.
const { factoryManager } = require('../config/process.config')
const cartManager = factoryManager.cartManager

class DTOuserMainData {
  //hago un metodo statico que es accesible sin instanciar la clase
  static converter(user) {
    return {
      fullname: user.firstname + ' ' + user.lastname,
      email: user.email,
      role: user.role,
    }
  }
}

module.exports = DTOuserMainData
