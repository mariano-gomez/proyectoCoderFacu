const { Router } = require('express')
const router = Router()
const productManager = require("../../dao/product.manager");



//estas rutas no tienen prefijo (api) son las visualizaciones del home.

router.get('/chat', async(req, res) => {
 
  res.render('chat', {
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

module.exports = router
