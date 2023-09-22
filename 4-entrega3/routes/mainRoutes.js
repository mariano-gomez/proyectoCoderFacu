const { Router } = require('express')
const ProductsRouter = require('./api/products.router')
const CartsRouter = require('./api/carts.router')
const SessionRouter = require('./api/sessions.router')
const HomeRouter = require('./home/home.router')
const MessageRouter = require('./api/messages.router')

const routerApi = Router()
const routerHome = Router()

// rutas de products
routerApi.use('/products', ProductsRouter )
//rutas de carts
routerApi.use('/carts', CartsRouter)
//rutas de messages
routerApi.use('/messages', MessageRouter)
//rutas de sessions
routerApi.use('/sessions', SessionRouter)


// rutas de home - motor de plantillas
routerHome.use('/', HomeRouter)


module.exports = {
  api:routerApi,
  home:routerHome
}