class RoutePolices {
  static onlyAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
      res.status(401).send('Unauthorized')
      return
    }
    next()
  }

  static onlyUser(req, res, next) {
    if (req.user.role !== 'user') {
      res.status(401).send('Unauthorized')
      return
    }
    next()
  }
}

module.exports = RoutePolices

// function onlyAdmin(req, res, next) {
//   if (req.user.role !== 'admin') {
//     res.status(401).send('Unauthorized')
//     return
//   }
//   next()
// }

// function onlyUser(req, res, next) {
//   if (req.user.role !== 'user') {
//     res.status(401).send('Unauthorized')
//     return
//   }
//   next()
// }

// module.exports = {
//   onlyAdmin,
//   onlyUser,
// }