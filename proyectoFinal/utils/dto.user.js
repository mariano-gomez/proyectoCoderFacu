// este DTO recibe un usuario tal cual viene de la BD y lo transforma para mostrarlo en el perfil.
const { factoryManager } = require('../config/process.config')
const cartManager = factoryManager.cartManager

class DTOuser {
  //hago un metodo statico que es accesible sin instanciar la clase
  
  static async converter(user) {
    
    if (user) {
      
      let role
      let isAdmin
      let isPremium
      let cartId
      if (user.email === 'adminCoder@coder.com') {
        role = 'admin'
        isAdmin = true
        isPremium = false
      } else {
        role = user.role
        if (user.role === 'admin') {
          isAdmin = true
          isPremium = false
        } else if (user.role === 'premium') {
          isAdmin = false
          isPremium = true
        } else {
          isPremium = false
          isAdmin = false
        }
      }
      const cart = await cartManager.getByUserId(user.id)
      
      if (!cart) {
        
        
        const userCart = await cartManager.add({ user: user.id })
        cartId = userCart._id.toString()
      } else {
        cartId = cart._id.toString()
      }

      return {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        role,
        isAdmin,
        isPremium,
        cartId,
        sex: user.sex,
        email: user.email,
        address: user.address,
        age: user.age,
      }
    }
  }
}

module.exports = DTOuser
