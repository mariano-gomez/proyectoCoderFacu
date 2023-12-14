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

  async getInactiveUsers(inactiveTime) {
    //inactiveTime tiene q estar en milisegundos
    const limitDate = new Date(Date.now() - inactiveTime)
    return await this.model.find({ last_connection: { $lt: limitDate } })
  }

  async deleteUsers(userArray) {
    //borra una lista de usuarios
    const idToDelete = userArray.map((user) => user.id)
    return await this.model.deleteMany({ _id: { $in: idToDelete } })
  }

  async deleteUserById(userId) {
    //borra un solo usuario
    await this.model.deleteOne({ _id: userId })
    return
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

  async setDocument(userId, document) {
    try {
      const user = await this.getById(userId)

      for (let index in user.documents) {
        if (document.name === user.documents[index].name) {
          user.documents[index] = document
          user.save()
          return
        }
      }
      user.documents.push(document)
      user.save()
      return
    } catch (err) {
      console.log('error en UserManager-setDocument')
      console.log(err)
    }
  }

  async checkDocuments(userId) {
    try {
      const user = await this.getById(userId)
      const requiredDocuments = ['id', 'address', 'account'] //se iran eliminando elementos a medida que los vaya encontrando en documents.

      for (let i in user.documents) {
        const docName = user.documents[i].name
        if (requiredDocuments.includes(docName)) {
          const index = requiredDocuments.indexOf(docName)
          if (index !== -1) {
            requiredDocuments.splice(index, 1) // elimino el elemento en requiredDocument.
          }
        }
      }

      if (requiredDocuments.length === 0) {
        //si requiredDocuments posee algun elemento, ese elemento es el que falta.
        //console.log('documentacion completa.')
        await user.save()
        return true
      } else {
        //console.log('faltan los siguientes documentos: \n', requiredDocuments)
        await user.save()
        return false
      }
    } catch (err) {
      console.log('error en UserManager-checkDocument')
      console.log(err)
    }
  }
}

module.exports = new UserManager()
