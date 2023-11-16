const { Router } = require('express')
const ProductsRouter = require('./api/products.router')
const CartsRouter = require('./api/carts.router')
const SessionRouter = require('./api/sessions.router')
const HomeRouter = require('./home/home.router')
const MessageRouter = require('./api/messages.router')
const UserRouter = require("./api/user.router")
const TestRouter = require('../routes/test/test.logger')


const routerApi = Router()
const routerHome = Router()
const routerTest = Router()


// rutas de products --> estas rutas tiene el prefijo "/api"
routerApi.use('/products', ProductsRouter )
//rutas de carts
routerApi.use('/carts', CartsRouter)
//rutas de messages
routerApi.use('/messages', MessageRouter)
//rutas de sessions
routerApi.use('/sessions', SessionRouter)
//rutas de users
routerApi.use('/users', UserRouter)

// rutas de home - motor de plantillas --> estas rutas tiene el prefijo "/"
routerHome.use('/', HomeRouter)

//rutas de test --> estas rutas tiene el prefijo "/test"
routerTest.use('/', TestRouter)


module.exports = {
  api:routerApi,
  home:routerHome,
  test:routerTest
}