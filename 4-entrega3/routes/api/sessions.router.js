const { Router } = require('express')
const { response } = require('express')

const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.
const passport = require('passport')
//const userManager = require('../../dao/user.manager')
const { factoryManager } = require('../../config/process.config')
const userManager = factoryManager.userManager
//const isAuth = require('../../middelwares/userAuth')

const SessionController = require('../../controllers/session.controllers')

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/sessions"

router.post('/singup', SessionController.singup)

router.post('/login', SessionController.login)

router.get(
  '/login/github',
  SessionController.githubAuth,
  (req, res) => {} //necesita este callback para funcionar pero nose pq, es algo passport
)

router.get(
  '/login/github/callback',
  SessionController.githubCb,
  async (req, res) => {
    res.redirect('/')
  } //necesita este callback para funcionar pero nose pq, es algo passport
)

//deberia ser un post, pero para q me lo tome el <a></a>, lo uso en get.
router.get('/logout', SessionController.logout)

//en esta ruta recupero los datos del usuario almacenado en el session de la cookie "connect.sid"
router.get('/user/info', SessionController.retriveUser)

module.exports = router
