const { Router } = require('express')
const ProductsRouter = require('./api/products.router')
const CartsRouter = require('./api/carts.router')
const HomeRouter = require('./api/home.router')


// /api
const router = Router()

// rutas de products
router.use('api/products', ProductsRouter )
// // rutas de carts
router.use('api/carts', CartsRouter)

// // rutas de home - motor de plantillas
router.use('/home', HomeRouter)


module.exports = {
  api: router
}