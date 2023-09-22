const userModel = require('./models/user.model')
const cartManager = require('./cart.manager')

class UserManager{

  async add(user) {
    return await userModel.create(user)
  }


  async getById(id){
    return await userModel.findById(id)
  }

  async getByIdForPassport(userId){
    
    const userRaw= await userModel.findById(userId).lean()
    const {__v,password, ...rest} = userRaw

    const user = {...rest}

    if(user.email === "adminCoder@coder.com"){
      user.role = "admin"
      user.isAdmin = true
    }else{
      user.role = "user"
      user.isAdmin = false
    }

    const cart = await  cartManager.getByUserId(userId)
    
    let cartId
    if(!cart){
      const userCart = await cartManager.createCart({userId})
      cartId = userCart._id.toString()
    }else{
      cartId = cart._id.toString()
    }
    user.cartId = cartId
    
    return user
  }


  async getByMail(mail){
    return await userModel.findOne({email: mail})
  }

  async getInfoByMail(mail){
    const user = await userModel.findOne({email: mail}).lean()
    const {_id,password,__v, ...rest} = user
    return rest
  }

  async verifyUserPass({email,password}){

    const info = await userModel.findOne({email: email},{password:1,_id:0,user: '$_id',email:1}).lean()
    if(((info === null) || info.password !== password)){
      //ojo aca, en el condicional es clave poner el info === null primero, pq sino tira error cuando itenta leer el info.password de un null
      return false
    }

    info.user = info.user.toString()
    return {id: info.user,email:info.email}
  }


}

module.exports = new UserManager()

