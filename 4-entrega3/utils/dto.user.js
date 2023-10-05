// este DTO recibe un usuario tal cual viene de la BD y lo transforma para mostrarlo en el perfil.
const { factoryManager } = require('../config/process.config')
const cartManager = factoryManager.cartManager

class DTOuser {

  //hago un metodo statico que es accesible sin instanciar la clase
  static async converter(user) {
    let role
    let isAdmin
    let cartId
    if (user.email === 'adminCoder@coder.com') {
      role = 'admin'
      isAdmin = true
    } else {
      role = 'user'
      isAdmin = false
    }

    const cart = await cartManager.getByUserId(user.id)

    if (!cart) {
      const userCart = await cartManager.add({ user: this.id })
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
      cartId,
      sex: user.sex,
      email: user.email,
      address: user.address,
      age: user.age,
    }
  }
}

module.exports = DTOuser





// class DTOuser2 {
//   constructor(user) {
//     this.id = user.id
//     this.firstname = user.firstname
//     this.lastname = user.lastname
//     this.sex = user.sex
//     this.email = user.email
//     this.address = user.address
//     this.age = user.age

//     if (user.email === 'adminCoder@coder.com') {
//       this.role = 'admin'
//       this.isAdmin = true
//     } else {
//       this.role = 'user'
//       this.isAdmin = false
//     }
//   }

//   async cartAssign() {
//     const cart = await cartManager.getByUserId(this.id)
//     console.log('el cart es: ', cart)
//     let cartId
//     if (!cart) {
//       const userCart = await cartManager.add({ user: this.id })
//       cartId = userCart._id.toString()
//     } else {
//       cartId = cart._id.toString()
//     }
//     console.log('el id del cart es: ', cartId)
//     this.cartId = cartId
//     return
//   }
// }
