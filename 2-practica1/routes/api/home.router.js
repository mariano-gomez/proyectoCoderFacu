const { Router } = require('express')
const router = Router()
const productManager = require("../../dao/product.manager");



//estas rutas no tienen prefijo (api) son las visualizaciones del home.

router.get('/', async(req, res) => {
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


  res.render('products', {
    products,
    route: {
      hasCSS: false,
      cssFile: null,
      hasSocket: false,
      hasJsFile: false,
      jsFile: null,
    },
  })
})

router.get('/chat', async(req, res) => {

  res.render('chat', {
    route: {
      hasCSS: false,
      cssFile: null,
      hasSocket: false,
      hasJsFile: false,
      jsFile: null,
    },
  })
})





// router.get('/realtimeproducts', (req, res) => {
//   const products = myProducts.getProducts()
//   res.render('realtimeproducts', {
//     products,
//     route: {
//       hasCSS: true,
//       cssFile: "realtimeproducts.css",
//       hasSocket: true,
//       hasJsFile: true,
//       jsFile: 'realtimeproducts.js',
//     },
//   })
// })

module.exports = router
