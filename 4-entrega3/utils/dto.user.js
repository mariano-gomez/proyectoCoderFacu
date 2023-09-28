// este DTO recibe un usuario tal cual viene de la BD y lo transforma para mostrarlo en el perfil.
const { factoryManager } = require('../config/process.config')
const cartManager = factoryManager.cartManager

class DTOuser {
  constructor(user) {
    this.id = user.id
    this.firstname = user.firstname
    this.lastname = user.lastname
    this.sex = user.sex
    this.email = user.email
    this.address = user.address
    this.age = user.age

    if (user.email === 'adminCoder@coder.com') {
      this.role = 'admin'
      this.isAdmin = true
    } else {
      this.role = 'user'
      this.isAdmin = false
    }

  }

  async cartAssign() {
    const cart = await cartManager.getByUserId(this.id)
    console.log('el cart es: ', cart)
    let cartId
    if (!cart) {
      const userCart = await cartManager.add({ user: this.id })
      cartId = userCart._id.toString()
    } else {
      cartId = cart._id.toString()
    }
    console.log('el id del cart es: ', cartId)
    this.cartId = cartId
    return
  }
}

module.exports = DTOuser

// Mariano Gomez
// 14:42
// const {Schema} = require("mongoose");

// class UserDto {

//     static parse(userData) {
//         return {
//             name: userData.first_name,
//             first_name: userData.first_name,
//             last_name: userData.last_name,
//             email: userData.email,
//             age: userData.age,
//             role: userData.role,
//             cart: userData.cart
//         };
//     }
// }

// module.exports = UserDto;
// dyz-tvzv-nkr