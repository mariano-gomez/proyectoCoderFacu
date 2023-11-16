const BaseManager = require('./base.manager')
const userModel = require('./models/user.model')
const cartManager = require('./cart.manager')
const { isValidPassword } = require('../../utils/password.utils')

class UserManager extends BaseManager {
  constructor() {
    super(userModel)
  }

  async getByIdForPassport(userId) {
    const userRaw = await this.model.findById(userId).lean()
    const { __v, password, ...rest } = userRaw

    const user = { ...rest }

    if (user.email === 'adminCoder@coder.com') {
      met
      user.role = 'admin'
      user.isAdmin = true
    } else {
      user.role = 'user'
      user.isAdmin = false
    }

    const cart = await cartManager.getByUserId(userId)

    let cartId
    if (!cart) {
      const userCart = await cartManager.add({ user: userId })
      cartId = userCart._id.toString()
    } else {
      cartId = cart._id.toString()
    }
    user.cartId = cartId

    return user
  }

  async getByMail(email) {
    return await this.model.findOne({ email })
  }

  async getInfoByMail(email) {
    const user = await this.model.findOne({ email }).lean()
    const { _id, password, __v, ...rest } = user
    return rest
  }

  async isSamePass(email, newPass) {
    const user = await this.model.findOne({ email }).lean()
    const { password: oldPass } = user
    if (isValidPassword(newPass, oldPass)) {
      return true
    } else {
      return false
    }
  }

  async switchRole(id) {
    const user = await this.getById(id)

    if (user.role === 'admin') {
      return //el admin no puede ser modificado desde aca.
    } else if (user.role === 'premium') {
      await this.updateById(id, { role: 'user' })
    } else if (user.role === 'user') {
      await this.updateById(id, { role: 'premium' })
    } else {
      throw new Error('User role in database is wrong')
    }
  }
}

module.exports = new UserManager()
