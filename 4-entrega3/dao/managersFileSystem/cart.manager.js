
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
    try {
      const cart = await this.model.findById(id)
      if (!cart) {
        throw new Error('cart not found')
      }
      const existentProduct = cart.products.find(
        (p) => p.product.toString() === productId
      ) //--> Trucazo: se puede buscar dentro de un documento en particular, y dentro de este a su vez dentro de una propiedad del mismo.

      if (existentProduct) {
        existentProduct.qty += +qty //--> Esto queda "conectado" al documento al que pertenece (se pasa como referencia) entonces si actualizo esto actualizo el documento tm
      } else {
        cart.products.push({
          product: new mongoose.Types.ObjectId(productId),
          qty,
        })
      }
      await cart.save()
      return true
    } catch (err) {
      console.log('error en getByIdAndAddProduct')
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

console.log(cartManager.getByUserId("a065874e-1c10-4c7a-b2bf-fd8f044f4e26").then(data=>{console.log("aca va la data:\n",data)}))