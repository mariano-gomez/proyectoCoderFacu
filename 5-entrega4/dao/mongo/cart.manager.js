const mongoose = require('mongoose')
const BaseManager = require('./base.manager')
const cartModel = require('./models/cart.model')
const { CustomError, ErrorType } = require('../../errors/custom.error')


class CartManager extends BaseManager {
  constructor() {
    super(cartModel)
  }

  async getByUserId(id) {
    return await this.model.findOne({ user: new mongoose.Types.ObjectId(id) })
  }

  //esta ruta busca el producto y lo aumenta en 1, o en cualquier cantidad pasada, si no existe lo crea y le pone el qty que corresponde.
  async getByIdAndAddProduct({ id, productId, qty = 1 }) {
    try {
      const cart = await this.model.findById(id)
      if (!cart) {
        throw new CustomError('cart not found', ErrorType.DB)
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
      throw new Error(err.message)
    }
  }

  async getByIdAndModifyProductQty({ id, productId, qty = 1 }) {
    try {
      await this.model.updateOne(
        {
          _id: new mongoose.Types.ObjectId(id),
          'products.product': new mongoose.Types.ObjectId(productId), //-->aca seteo el valor del ($) como el indice del array que cumple con esta condicion.
        },
        { $set: { 'products.$.qty': qty } } // --> El operador ($) representa el índice del elemento coincidente en el array.
      )
    } catch (err) {
      throw new Error(err.message)
    }
  }

  async deleteProduct({ id, productId }) {
    await this.model.updateOne(
      { _id: new mongoose.Types.ObjectId(id) }, // busco el documento.
      {
        $pull: {
          products: { product: new mongoose.Types.ObjectId(productId) },
        },
      } // -->docu: https://www.mongodb.com/docs/manual/reference/operator/update/pull/
    )
    return
  }

  async clearProducts({ id }) {
    await this.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: { products: [] },
      }
    )
  }

  async setAllProducts({ id, productsUpdated }) {
    await this.model.updateOne(
      { _id: new mongoose.Types.ObjectId(id) },
      {
        $set: { products: productsUpdated },
      }
    )
  }

  async getByIdProductsPopulate(id) {
    try {
      return await cartModel.findById(id).populate({
        path: 'products.product',
        select: ['title', 'price', 'stock'],
      })
      //.populate({path:'user',select:['firstname','lastname','email','address']}) --> NO ANDA NO SE PQ ! :-(
    } catch (err) {
      throw new Error(err.message)
    }
  }
}

module.exports = new CartManager()
