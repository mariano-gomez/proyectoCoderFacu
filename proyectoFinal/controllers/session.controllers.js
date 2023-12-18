const { response } = require('express')
const passport = require('passport')

const { factoryManager } = require('../config/process.config')
const userManager = factoryManager.userManager

class SessionController {
  // ruta post('/singup')
  static singup = passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/login',
  })

  // ruta post('/login')
  static login = passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
  })

  //ruta get('/login/github)
  static githubAuth = passport.authenticate('github', { scope: ['user:email'] })

  //ruta get('/login/github/callback')
  static githubCb = passport.authenticate('github', {
    failureRedirect: '/singup',
  })

  static logout = async (req, res = response) => {
    try {
      req.session.destroy((err) => {
        if (err) {
          res.status(500).send('Error al intentar destruir la session')
          console.log(err)
        } else {
          res.clearCookie('connect.sid')
          res.redirect('/login')
        }
      })
    } catch (err) {
      console.log('error en get /logout del session router')
      console.log(err)
    }
  }

  //deberia ser un post, pero para q me lo tome el <a></a>, lo uso en get.

  //en esta ruta recupero los datos del usuario almacenado en el session de la cookie "connect.sid"
  static retriveUser = async (req, res = response) => {
    try {
      const { firstname, lastname, email } = await userManager.getById(
        req.user.id.toString()
      )

      res.send({ firstname, lastname, email })
    } catch (err) {
      console.log('error en get user/info del session router')
      console.log(err)
    }
  }
}

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/sessions"

module.exports = SessionController
