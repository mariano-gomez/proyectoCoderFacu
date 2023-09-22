const { Router } = require('express')
const router = Router()
const productManager = require("../../dao/product.manager");
const cartManager = require('../../dao/cart.manager')


//estas rutas no tienen prefijo (api) son las visualizaciones del home.

router.get('/', async(req, res) => {
  const {limit, page,sort,query} = req.query;
  // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
  if (isNaN(limit) && limit !== undefined) {
    res.send({
      status: "Error, the (limit) value is wrong",
      payload: null,
    });
    return;
  }
  if (isNaN(page) && page !== undefined) {
    res.send({
      status: "Error, the (page) value is wrong",
      payload: null,
    });
    return;
  }
  const data = await productManager.getAllPaginated({limit,page,sort,query})

  const products = []
  data.payload.forEach(p => {
    const {_id,title,description,price,category, ...rest} = p
    const product = {id:_id.toString(),title,description,price,category}
    products.push(product)
  })


  res.render('products', {

    products,
    route: {
      page:data.page,
      hasPrevPage:data.hasPrevPage,
      hasNextPage:data.hasNextPage,
      prevLink:data.prevLink,
      nextLink:data.nextLink,      
      hasCSS: true,
      cssFile: 'products.css',
      hasSocket: false,
      hasJsFile: true,
      jsFile: 'products.js',
    },
  })
})

//creo la ruta para listar los productos de un cart

router.get('/carts/:cid', async(req, res) => {
  const id = req.params.cid;
  
  const data = await cartManager.getByIdProductsPopulate(id)
  const products = []
  let total = 0

  data.products.forEach(p =>{
    const element = `${p.product.title.toLowerCase()} ($ ${p.product.price} c/u) x ${p.qty} units = $ ${+p.qty * p.product.price} `
    products.push(element)
    total += p.qty * p.product.price
  })
  
  res.render('carts', {

    products,
    total,
    route: {
      hasCSS: true,
      cssFile: 'carts.css',
      hasSocket: false,
      hasJsFile: false,
      jsFile: null,
    },
  })
})



router.get('/chat', async(req, res) => {

  res.render('chat', {
    route: {
      hasCSS: true,
      cssFile: '/chat.css',
      hasSocket: true,
      hasJsFile: true,
      jsFile: '/chat.js',
      hasSwalt:true,
    },
  })
})

router.get('/realtimeproducts', async (req, res) => {

  const { limit, page } = req.query;
  // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
  if (isNaN(limit) && limit !== undefined) {
    res.send({
      status: "Error, the (limit) value is wrong",
      payload: null,
    });
    return;
  }
  const productsRaw = await productManager.getAll({ limit, page })
  const products = []
  productsRaw.forEach(p => {
    const {_id,title,description,price,category, ...rest} = p
    const product = {id:_id.toString(),title,description,price,category}
    products.push(product)
  })

  res.render('realtimeproducts', {
    products,
    route: {
      hasCSS: true,
      cssFile: "realtimeproducts.css",
      hasSocket: true,
      hasJsFile: true,
      jsFile: 'realtimeproducts.js',
    },
  })
})

module.exports = router
