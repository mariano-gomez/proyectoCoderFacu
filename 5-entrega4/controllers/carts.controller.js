const { factoryManager } = require('../config/process.config')
const { CustomError, ErrorType } = require('../errors/custom.error')
const userManager = factoryManager.userManager
const cartManager = factoryManager.cartManager
const productManager = factoryManager.productManager
const ticketManager = factoryManager.ticketManager

class CartController {
  //funcion para ruta 1  router.post('/')
  static async create(req = request, res, next) {
    try {
      const { userId } = req.query
      //aca podria ver si ese usuario ya tiene un carrito, y si lo tiene no lo creo y traigo el ya creado.

      if (!userId) {
        throw new Error('userId must be a query param')
      }

      await cartManager.add({ userId })
      res.send({ status: 'success, a new was created' })
    } catch (err) {
      //console.log(e)
      next(new CustomError(err.message, ErrorType.DB, 'CartController-create'))
      //res.status(500).send({ status: 'Error', Error: e.message })
    }
  }
  //funcion para ruta 2    router.get('/:cid')
  static getProducts = async (req, res, next) => {
    try {
      const cartId = req.params.cid
      //const cart = await cartManager.getById(cartId)
      const cart = await cartManager.getByIdProductsPopulate(cartId)
      if (!cart) {
        throw new Error('cart not found')
      }
      res.send({
        status: 'success',
        payload: { user: cart.user, products: cart.products },
      })
    } catch (err) {
      next(
        new CustomError(err.message, ErrorType.DB, 'CartController-getProducts')
      )
      //res.send({ status: 'Error', Error: e.message })
    }
  }

  //funcion para ruta 3    router.post('/:cid/product/:pid')
  //agrego un producto a un carrito, puedo pasar el qty y si no lo paso por default sera 1.
  static addProduct = async (req, res, next) => {
    try {
      const user = req.user
      const productId = req.params.pid
      
      if ( await productManager.isOwnerOrAdmin({ user, productId })) {
        res.status(401).send('Unauthorized')
        return
      }
      
      const id = req.params.cid //es el id del cart
      const qty = req.query.qty
      const wasAdded = await cartManager.getByIdAndAddProduct({
        id,
        productId,
        qty,
      })
      if (wasAdded) {
        console.log('lo agregue')
        res.send({
          status: 'Success',
          payload: {
            operation: 'add product to a cart',
            cart: id,
            product: productId,
            quantityAdded: qty,
          },
        })
      }
    } catch (err) {
      //console.log(e)
      next(
        new CustomError(err.message, ErrorType.DB, 'CartController-addProduct')
      )
      //res.send({ status: `Error`, Error: e.message })
    }
  }

  //funcion para ruta 4    router.put('/:cid/product/:pid')
  //seteo el product.qty, en un valor que recibo por body.
  //Uso put por la consigna pero seria más adecuado es un metodo patch.

  static setProductQty = async (req, res, next) => {
    try {
      const id = req.params.cid //es el id del cart
      const productId = req.params.pid
      const qty = +req.body.qty
      await cartManager.getByIdAndModifyProductQty({
        id,
        productId,
        qty,
      })

      res.send({
        status: 'success',
        payload: {
          operation: 'Update quantity of a sigle product in cart',
          cart: id,
          product: productId,
          quantity: qty,
        },
      })
    } catch (err) {
      //console.log(e)
      //res.send({ status: `Error`, Error: e.message })
      next(
        new CustomError(
          err.message,
          ErrorType.DB,
          'CartController-setProductQty'
        )
      )
    }
  }

  //funcion para ruta 5    router.delete('/:cid/product/:pid')
  //ruta para eliminar un producto de un carrito. (elimina todas las cantidades que haya del mismo)
  static deleteProduct = async (req, res, next) => {
    try {
      const id = req.params.cid //es el id del cart
      const productId = req.params.pid
      await cartManager.deleteProduct({
        id,
        productId,
      })

      res.status(200).send({
        status: 'success',
        payload: {
          operation: 'delete product from cart',
          cart: id,
          product: productId,
        },
      })
    } catch (err) {
      //console.log(e)
      //res.send({ status: `Error`, Error: e.message })

      next(
        new CustomError(
          err.message,
          ErrorType.DB,
          'CartController-deleteProduct'
        )
      )
    }
  }

  //funcion para ruta 6    router.delete('/:cid')
  //ruta para vaciar un carrito (elimina todos los productos)
  static clear = async (req, res, next) => {
    try {
      const id = req.params.cid //es el id del cart
      await cartManager.clearProducts({
        id,
      })

      res.status(200).send({
        status: 'success',
        payload: {
          operation: 'delete all products from cart',
          cart: id,
        },
      })
    } catch (err) {
      //console.log(e)
      //res.send({ status: `Error`, Error: e.message })
      next(new CustomError(err.message, ErrorType.DB, 'CartController-clear'))
    }
  }

  //funcion para ruta 7    router.put('/:cid')
  //esta ruta me hace un update de todos los productos (los cambio a todos, segun lo q recibo, incluido las qty)
  static updateProducts = async (req, res, next) => {
    try {
      const id = req.params.cid //es el id del cart
      const products = req.body
      await cartManager.setAllProducts({ id, productsUpdated: products })
      res.status(200).send({
        status: 'success',
        payload: {
          operation: 'set all products from cart',
          cart: id,
          products,
        },
      })
    } catch (err) {
      next(
        new CustomError(
          err.message,
          ErrorType.DB,
          'CartController-updateProducts'
        )
      )
    }
  }

  //funcion para ruta 8    router.get('/:cid/purchase')
  //esta ruta me efectua la compra de los productos en el carrito.
  static makePurchase = async (req, res, next) => {
    try {
      const cid = req.params.cid //es el id del cart
      const cart = await cartManager.getById(cid)
      const { email: purchaser } = await userManager.getById(cart.user)
      //const products = cart.products
      const concept = []
      const notEnoughtProducts = []
      let amount = 0
      let status

      for (const index in cart.products) {
        const { product: pid, qty } = cart.products[index]
        const product = await productManager.getById(pid)
        const { stock, price } = product

        if (stock >= qty) {
          amount += qty * price
          product.stock -= qty
          concept.push({
            product: product.title,
            price,
            units: qty,
            subtotal: qty * price,
          })
          cartManager.deleteProduct({ id: cid, productId: pid })
          product.save()
        } else {
          notEnoughtProducts.push({
            title: product.title,
            stock,
            demannding: qty,
            pid: product.id.toString(),
          })
        }
      }
      if (amount) {
        ticketManager.add({ purchaser, amount, concept })
        status = 'success'
        if (notEnoughtProducts.length) {
          res.send({ status, purchaser, notBuyed: notEnoughtProducts })
          return
        }
      } else {
        status = 'error'
      }
      res.send({ status, purchaser })
    } catch (err) {
      next(
        new CustomError(
          err.message,
          ErrorType.DB,
          'CartController-makePurchase'
        )
      )
    }
  }
}

module.exports = CartController
