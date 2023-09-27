console.log("ejecutando userManager")
const BaseManager = require('./base.manager')
//const { hashPassword, isValidPassword } = require('../../utils/password.utils')

class UserManager extends BaseManager {
  constructor(entity) {
    super(entity)
  }

   async getByMail(email) {
    
    const user = await this.findOne({email})
    return user
  }

  async getInfoByMail(email) {
    
    const user = await this.findOne({ email})
    const { _id, password, __v, ...rest } = user
    return rest
  }

}
////////aca cerrer el la definicion de la clase.


const userManager = new UserManager('usuarios')





module.exports = userManager
