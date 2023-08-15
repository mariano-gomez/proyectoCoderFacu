const cartModel = require('./models/cart.model')
const mongoose = require('mongoose')

class CartManager {
  async createCart({ userId }) {
    console.log('pacuno el userId: ', userId)
    await cartModel.create({ user: new mongoose.Types.ObjectId(userId) })
  }

  async getById(id) {
    return await cartModel.findById(id)
  }

  async getByIdAndAddProduct({ id, productId, qty = 1}) {
    const cart = await cartModel.findById(id)
    if (!cart) {
      throw new Error('cart not found')
    }

    const existentProduct = cart.products.find(
      (p) => p.product.toString() === productId
    ) //--> Trucazo: se puede buscar dentro de un documento en particular, y dentro de este a su vez dentro de una propiedad del mismo.

    if (existentProduct) {
      console.log(existentProduct)
      existentProduct.qty += +qty //--> Esto que "conectado" al documento al que pertenece (se pasa como referencia) entonces si actualizo esto actualizo el documento tm
    } else {
      cart.products.push({
        product: new mongoose.Types.ObjectId(productId),
        qty,
      })
    }
    await cart.save()
    return true
  }

  async deleteProduct({ id, productId }) {



    //

    // const cart = await cartModel.findById(id)
    // if (!cart) {
    //   throw new Error('cart not found')
    // }

    // cart.products.update(async (p) => {
    //   if (p.product.toString() === productId) {
    //     delete cart.products.p
    //     await cart.save()
    //     return
    //   } 
    // })
  }
}

module.exports = new CartManager()

setTimeout(async () => {
  const CM = new CartManager()
  CM.deleteProduct({ id:'64d522223398fe0ee7b278f8', productId:'64d18fbf2f2934c6c4614483' })
  console.log('iuujuuu')
}, 3000)
