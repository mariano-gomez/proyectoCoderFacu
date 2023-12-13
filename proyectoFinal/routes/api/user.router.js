const { Router } = require('express')
const UserController = require('../../controllers/user.controller')
const isAuthToken = require('../../middelwares/userAuthToken')
const RoutePolices = require('../../middelwares/routes.polices')
const isAuth = require('../../middelwares/userAuth')

// importo el middelware de multer
const {
  uploadGeneric,
  uploadProfilePhoto,
  uploadDocumentPDF,
} = require('../../services/files.upload.multer')

const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.

// TODAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/users"

//ruta para obtener todos los usuarios.
router.get('/', UserController.getAllUsersMainInfo)

//ruta para obtener un user por id.
router.get('/info/:uid', RoutePolices.onlyAdmin, UserController.getUserById)

//ruta para obtener todos los usuarios.
router.delete('/', UserController.deleteInactiveUsers)

//esta ruta es la que efectivamente hace el update del password
router.post('/refresh-pass', isAuthToken, UserController.refreshPassword)

//esta ruta es la que efectivamente hace el update del password
router.post('/send-mail-refresh-pass', UserController.sendMailToRefreshPassword)

// esta ruta es un switch de roles entre user y premium, solo la puede usar un admin
// el userID viaja en body.
router.post('/premium', RoutePolices.onlyAdmin, UserController.switchRole)

// //hago la ruta para cargar la imagen del perfil.
router.post(
  '/upload-profile-photo',
  isAuth,
  uploadProfilePhoto.single('uploadedFile'),
  UserController.redirectUploader
)

//hago la ruta para cargar los archivos PDF.
//hice 3 middelwares para poder identificar a que corresponde cada documento
router.post(
  '/upload-pdf',
  isAuth,
  uploadDocumentPDF.fields([
    { name: 'id', maxCount: 1 },
    { name: 'address', maxCount: 1 },
    { name: 'account', maxCount: 1 },
  ]),
  UserController.redirectUploader
)

//hago la ruta para cargar un archivo generico.
router.post(
  '/upload-generic-file',
  isAuth,
  uploadGeneric.single('uploadedFile'),
  UserController.redirectUploader
)

module.exports = router
