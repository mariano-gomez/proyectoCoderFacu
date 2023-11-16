const { request, response } = require('express')
const { factoryManager } = require('../config/process.config')
const productManager = factoryManager.productManager
const cartManager = factoryManager.cartManager

class HomeController {
  //funciones seran el middelware final de las rutas del Home

  //ruta para .get('/')
  static showHome = async (req = request, res = response) => {
    const { limit, page, sort, query } = req.query
    console.log(req.user)
    // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
    if (isNaN(limit) && limit !== undefined) {
      res.send({
        status: 'Error, the (limit) value is wrong',
        payload: null,
      })
      return
    }
    if (isNaN(page) && page !== undefined) {
      res.send({
        status: 'Error, the (page) value is wrong',
        payload: null,
      })
      return
    }
    const data = await productManager.getAllPaginated({
      limit,
      page,
      sort,
      query,
    })

    const products = []
    data.payload.forEach((p) => {
      const { _id, title, description, price, category, ...rest } = p
      const product = {
        id: _id.toString(),
        title,
        description,
        price,
        category,
      }
      products.push(product)
    })

    const fullname = req.user.firstname + ' ' + req.user.lastname

    res.render('products', {
      user: req.user,
      fullname,
      products,
      route: {
        page: data.page,
        hasPrevPage: data.hasPrevPage,
        hasNextPage: data.hasNextPage,
        prevLink: data.prevLink,
        nextLink: data.nextLink,
        hasCSS: true,
        cssFile: 'products.css',
        hasSocket: false,
        hasJsFile: true,
        jsFile: 'products.js',
      },
    })
  }

  //para redireccionar al home ('/')
  static redirectToHome = async (req, res) => {
    res.redirect('/')
  }

  // para .get('/carts/:cid')
  static showCartProducts = async (req, res) => {
    const id = req.params.cid

    const data = await cartManager.getByIdProductsPopulate(id)
    const products = []
    let total = 0

    data.products.forEach((p) => {
      const element = `${p.product.title.toLowerCase()} ($ ${
        p.product.price
      } c/u) x ${p.qty} units = $ ${+p.qty * p.product.price} `
      products.push(element)
      total += p.qty * p.product.price
    })

    res.render('carts', {
      user: req.user,
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
  }

  // para .get('/chat')
  static showChat = async (req, res) => {
    res.render('chat', {
      user: req.user,
      route: {
        hasCSS: true,
        cssFile: '/chat.css',
        hasSocket: true,
        hasJsFile: true,
        jsFile: '/chat.js',
        hasSwalt: true,
      },
    })
  }

  // para .get('/realtimeproducts')
  static showRealTimeProducts = async (req, res) => {
    const { limit, page } = req.query
    // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
    if (isNaN(limit) && limit !== undefined) {
      res.send({
        status: 'Error, the (limit) value is wrong',
        payload: null,
      })
      return
    }
    const productsRaw = await productManager.getAll({ limit, page })
    const products = []
    productsRaw.forEach((p) => {
      const { _id, title, description, price, category, ...rest } = p
      const product = {
        id: _id.toString(),
        title,
        description,
        price,
        category,
      }
      products.push(product)
    })

    res.render('realtimeproducts', {
      products,
      route: {
        hasCSS: true,
        cssFile: 'realtimeproducts.css',
        hasSocket: true,
        hasJsFile: true,
        jsFile: 'realtimeproducts.js',
      },
    })
  }

  //para .get('/singup')

  static showSingup = async (req, res) => {
    res.render('singup', {
      route: {
        hasCSS: true,
        cssFile: 'singup.css',
        hasSocket: true,
        hasJsFile: false,
        jsFile: null,
      },
    })
  }

  // para .get('/login')
  static showLogin = async (req, res) => {
    // si vengo al login por una redireccion desde otro lado con una cookie de previousErr, aca levanto el msj de error
    let hasError
    let error
    if (req.cookies.previousErr) {
      hasError = true
      error = req.cookies.previousErr
      res.clearCookie('previousErr')
    }
    //console.log(req.error)
    res.render('login', {
      route: {
        hasError,
        error,
        hasCSS: false,
        cssFile: null,
        hasSocket: true,
        hasJsFile: false,
        jsFile: null,
      },
    })
  }

  //para .get('/profile')
  static showProfile = async (req, res) => {
    res.render('profile', {
      user: req.user,
      route: {
        hasCSS: false,
        cssFile: null,
        hasSocket: true,
        hasJsFile: false,
        jsFile: null,
      },
    })
  }

  static refreshPassPublic = async (req, res) => {
    // si vengo al login por una redireccion desde otro lado con una cookie de previousErr, aca levanto el msj de error
    let hasError
    let error
    if (req.cookies.previousErr) {
      hasError = true
      error = req.cookies.previousErr
      res.clearCookie('previousErr')
    }
    res.render('refresh-pass-public', {
      route: {
        hasError,
        error,
        hasCSS: false,
        cssFile: null,
        hasSocket: true,
        hasJsFile: null,
        jsFile: null,
      },
    })
  }

  //para .get('/refresh-pass')
  static refreshPassPrivate = async (req, res) => {
    const user = JSON.parse(JSON.stringify(req.user)) // rarisimo esto que tuve que hacer, pero si pongo directo el req.user, me tirar un error de handdlebars, y es raro pq solo lo tira con esta ruta, es decir el error se introduce con el middelware de autenticacion isAuthToken, no se pq.
    const token = req.query.token
    // si vengo al login por una redireccion desde otro lado con una cookie de previousErr, aca levanto el msj de error
    let hasError
    let error
    if (req.cookies.previousErr) {
      hasError = true
      error = req.cookies.previousErr
      res.clearCookie('previousErr')
    }
    res.render('refresh-pass-private', {
      user,
      token,
      route: {
        hasError,
        error,
        hasCSS: false,
        cssFile: null,
        hasSocket: true,
        hasJsFile: true,
        jsFile: 'refresh-pass-private.js',
      },
    })
  }
}

module.exports = HomeController
