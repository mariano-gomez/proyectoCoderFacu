const { Router } = require('express')
const UserController = require('../../controllers/user.controller')
const isAuthToken = require('../../middelwares/userAuthToken')
const RoutePolices = require('../../middelwares/routes.polices')

const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.

// TODAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/users"

//esta ruta es la que efectivamente hace el update del password
router.post('/refresh-pass', isAuthToken, UserController.refreshPassword)

//esta ruta es la que efectivamente hace el update del password
router.post('/send-mail-refresh-pass', UserController.sendMailToRefreshPassword)

// esta ruta es un switch de roles entre user y premium, solo la puede usar un admin
// TIENE Q SER POOOSTTTTT!!!
router.get('/premium/:uid', RoutePolices.onlyAdmin, UserController.switchRole)

module.exports = router
