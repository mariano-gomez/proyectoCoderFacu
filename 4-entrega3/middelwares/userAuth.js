const mongoose = require('mongoose')
const userManager = require('../dao/user.manager')
const cartManager = require('../dao/cart.manager')
const { response } = require('express')
//mail: Craig2@hotmail.com
//pass: Om1zfU1k7hSB
//cart: 64d522223398fe0ee7b278f8

//mail: Joanna.Watsica40@yahoo.com
//pass: Ujh0Cm3lQFPg9o
//cart: 64dd1ad318aef2b6cbe76f8e

function isAuth(req, res, next) {
  if (req.isAuthenticated()) {

    res.cookie('cartId', req.user.cartId)
    next()
    
  } else {
    res.redirect('/login')
  }
}

module.exports = isAuth
