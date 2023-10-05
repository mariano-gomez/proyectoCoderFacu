function isAuth(req, res, next) {

  //console.log(req.user)
  // const route = req.route.path
  // const method = req.route.stack[0].method
  // console.log({method,route})
  if (req.isAuthenticated()) {
    res.cookie('cartId', req.user.cartId)
    next()
  } else {
    console.log('te voy a redireccionar')
    res.redirect('/login')
  }
}

module.exports = isAuth
