const { Router, request } = require('express')
const { factoryManager } = require('../../config/process.config')
const userManager = factoryManager.userManager
const cartManager = factoryManager.cartManager
const productManager = factoryManager.productManager
const ticketManager = factoryManager.ticketManager
const RoutePolices = require('../../middelwares/routes.polices')
const CartController = require('../../controllers/carts.controller')
//const {onlyAdmin,onlyUser} = require('../../middelwares/routes.polices')
//const myProducts = new ProductManager("products.json");

// const cartModel = require('../../dao/models/cart.model')
const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/carts"

//ruta 1, crea un carrito nuevo (pero tengo que asociarlo a un userId)
router.post('/', CartController.create)

router.get('/:cid', CartController.getProducts)

router.post('/:cid/product/:pid',RoutePolices.onlyUser,CartController.addProduct)

router.put('/:cid/product/:pid',CartController.setProductQty)

router.delete('/:cid/product/:pid',CartController.deleteProduct)

router.delete('/:cid',CartController.clear)

//esta ruta me hace un update de todos los productos (los cambio a todos, segun lo q recibo, incluido las qty)
router.put('/:cid',CartController.updateProducts)

router.get('/:cid/purchase',CartController.makePurchase)







//esta ruta me hace un update de todos los productos (los cambio a todos, segun lo q recibo, incluido las qty)
router.put('/:cid', async (req, res) => {
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
})

//esta ruta me efectua la compra de los productos en el carrito.
router.get('/:cid/purchase', async (req, res) => {
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
})

module.exports = router
