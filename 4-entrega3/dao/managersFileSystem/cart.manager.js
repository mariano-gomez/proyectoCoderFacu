console.log('ejecutando el cartManager de fileSystem')
const BaseManager = require('./base.manager')

class CartManager extends BaseManager {
  constructor(entity) {
    super(entity)
  }

  async getByUserId(id) {
    return await this.findOne({ user: id })
  }

  //esta ruta busca el producto y lo aumenta en 1, o en cualquier cantidad pasada, si no existe lo crea y le pone el qty que corresponde.
  async getByIdAndAddProduct({ id, productId, qty = 1 }) {
    console.log(id, productId)
    let existentProduct = null //aca en fileSystem lo uso como una flag
    try {
      const cart = await this.getById(id)
      if (!cart) {
        throw new Error('cart not found')
      }


      for(let p in cart.products){

        if(cart.products[p].product === productId){

          //esta linea busca el producto y le aumenta el qty
          this[this.entity][this[this.entity].indexOf(cart)].products[this[this.entity][this[this.entity].indexOf(cart)].products.indexOf(cart.products[p])].qty += qty

          existentProduct = true
        }
      }

      if(!existentProduct){
        this[this.entity][this[this.entity].indexOf(cart)].products.push({product:productId,qty:qty})
      }

      this.save() //importantisimo guardar el efecto en la persistencia! 
      return true
      
    } catch (err) {
      console.log('error en getByIdAndAddProduct del fileSystem')
      console.log(err)
    }
  }


}
////////aca cerrer el la definicion de la clase.

module.exports = {
  CartManager,
};

const cartManager = new CartManager('carritos')

// cartManager.add({
//   user:"a065874e-1c10-4c7a-b2bf-fd8f044f4e26",
//   products:[]
// })

cartManager.getByIdAndAddProduct({ id:"f82c2e33-c0ea-4ba3-856b-e681a703fcb1", productId:"003",qty:2})