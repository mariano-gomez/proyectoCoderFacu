const BaseManager = require('./base.manager')
const cartManager = require('./cart.manager')
//const { hashPassword, isValidPassword } = require('../../utils/password.utils')

class UserManager extends BaseManager {
  constructor(entity) {
    super(entity)
  }

  async getByMail(email) {
    const user = await this.findOne({ email })
    return user
  }

  async getInfoByMail(email) {
    const user = await this.findOne({ email })
    const { _id, password, __v, ...rest } = user
    return rest
  }
 
  //esto no lo estoy usando pq estoy usando el DTO, igual lo dejo.
  async getByIdForPassport(userId) {
    const userRaw = await this.getById(userId)
    const { __v, password, ...rest } = userRaw
    const user = { ...rest }
    if (user.email === 'adminCoder@coder.com') {
      user.role = 'admin'
      user.isAdmin = true
    } else {
      user.role = 'user'
      user.isAdmin = false
    }

    const cart = await cartManager.getByUserId(userId)
    let cartId

    if (!cart) {
      const userCart = await cartManager.add({
        user: userId,
        products: [],
      })

      cartId = userCart._id
    } else {
      cartId = cart._id
    }

    user.cartId = cartId
    console.log(user)
    return user
  }
}

////////aca cerrer el la definicion de la clase.

const userManager = new UserManager('users')

module.exports = userManager
