// este DTO recibe un usuario tal cual viene de la BD y lo transforma para mostrarlo en el perfil.
const { factoryManager } = require('../config/process.config')

class DTOuserInfo {
  //hago un metodo statico que es accesible sin instanciar la clase
  static converter(user) {
    return {
      firstname: user.firstname,
      lastname: user.lastname,
      role: user.role,
      email: user.email,
      address: user.address,
      age: user.age,
    }
  }
}

module.exports = DTOuserInfo
