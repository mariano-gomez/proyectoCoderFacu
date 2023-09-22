const { Router, request } = require('express')

//const myProducts = new ProductManager("products.json");
const cartManager = require('../../dao/cart.manager')
const cartModel = require('../../dao/models/cart.model')
const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/carts"

//ruta 1, crea un carrito nuevo (pero tengo que asociarlo a un userId)
router.post('/', async (req = request, res) => {
  try {
    const { userId } = req.query
    //aca podria ver si ese usuario ya tiene un carrito, y si lo tiene no lo creo y traigo el ya creado.

    if (!userId) {
      throw new Error('userId must be a query param')
    }

    await cartManager.createCart({ userId })
    res.send({ status: 'Success, a new was created' })
  } catch (e) {
    console.log(e)
    res.status(500).send({ status: 'Error', Error: e.message })
  }
})

//cuando un user no logueado toque el boton carts, del navBar, va aentrar aca y se lo va a redicreccionar automatciamente.
//con cuando un user logueado tocque ese boton va a entrar a carts/:cid
router.get('/', async (req, res) => {
  res.send("ruta vacia")
})


//ruta 2, devuelvo los productos de un carrito en especifico.
router.get('/:cid', async (req, res) => {
  try {
    const cartId = req.params.cid
    //const cart = await cartManager.getById(cartId)
    const cart = await cartManager.getByIdProductsPopulate(cartId)
    if (!cart) {
      throw new Error('cart not found')
    }
    res.send({ status: 'success', payload: {user:cart.user,products:cart.products}})
  } catch (e) {
    res.send({ status: 'Error', Error: e.message })
  }
})

//agrego un producto a un carrito, puedo pasar el qty y si no lo paso por default sera 1.
router.post('/:cid/product/:pid', async (req, res) => {
  try {
    const id = req.params.cid //es el id del cart
    const productId = req.params.pid
    const qty = req.query.qty
    const wasAdded = await cartManager.getByIdAndAddProduct({
      id,
      productId,
      qty,
    })
    if (wasAdded) {
      res.send({
        status: 'Success', payload:{operation:"add product to a cart", cart:id, product:productId,quantityAdded:qty}
      })
    }
  } catch (e) {
    console.log(e)
    res.send({ status: `Error`, Error: e.message })
  }
})

//seteo el product.qty, en un valor que recibo por body.
//Uso put por la consigna pero seria más adecuado es un metodo patch.

router.put('/:cid/product/:pid', async (req, res) => {
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
  } catch (e) {
    console.log(e)
    res.send({ status: `Error`, Error: e.message })
  }
})

//ruta para elminar un producto de un carrito. (elimina todas las cantidades que haya del mismo)
router.delete('/:cid/product/:pid', async (req, res) => {
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
  } catch (e) {
    console.log(e)
    res.send({ status: `Error`, Error: e.message })
  }
})

//ruta para vaciar un carrito (elimina todos los productos)
router.delete('/:cid', async (req, res) => {
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
  } catch (e) {
    console.log(e)
    res.send({ status: `Error`, Error: e.message })
  }
})


//esta ruta me hace un update de todos los productos (los cambio a todos, segun lo q recibo, incluido las qty)
router.put('/:cid', async(req, res)=>{
  
  const id = req.params.cid //es el id del cart
  const products = req.body;
  await cartManager.setAllProducts({id,productsUpdated:products})
  res.status(200).send({
    status: 'success',
    payload: {
      operation: 'set all products from cart',
      cart: id,
      products
    },
  })
})


module.exports = router
