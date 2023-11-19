const fs = require('fs')
const path = require('path')
const multer = require('multer')
const userManager = require('../dao/mongo/user.manager')

const storageGereric = multer.diskStorage({
  //destination: path.join(__dirname,'..','public','images'),
  destination: function (req, file, cb) {
    console.log(req.originalUrl)
    const type = file.mimetype.split('/')[0]
    const extension = file.mimetype.split('/')[1]
    let mediaFolder
    if (type === 'application') {
      mediaFolder = extension
    } else {
      mediaFolder = type
    }

    const folder = path.join(
      __dirname,
      '..',
      'public',
      'usersFiles',
      'others',
      mediaFolder
    ) // la carpeta varia segun el archivo q se cargue

    //multer no crea la carpeta sino la encuentra, por lo que la creo manualmente con fs.
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder) //si la carpeta no existe la creo, si existe no hago nada.
    }
    cb(null, folder) // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    const userId = req.user.id
    const uniqueSuffix = Date.now()
    cb(null, `${userId}-${uniqueSuffix}.${extension}`)
  },
})

const storageProfilePhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = file.mimetype.split('/')[0]
    let folder
    if (type === 'image') {
      folder = path.join(
        __dirname,
        '..',
        'public',
        'usersFiles',
        'profilePhotos'
      ) // la carpeta varia segun el archivo q se cargue
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder) //si la carpeta no existe la creo, si existe no hago nada.
      }
    } else {
      cb(new Error('Tipo de archivo no permitido'), null)
    }
    cb(null, folder) // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    const userId = req.user.id
    const filename = `${userId}.${extension}`
    cb(null, filename)
  },
})

const storageProductPhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = file.mimetype.split('/')[0]
    const extension = file.mimetype.split('/')[1]
    let folder
    if (type === 'image') {
      folder = path.join(
        __dirname,
        '..',
        'public',
        'usersFiles',
        'productsPhotos'
      ) // la carpeta varia segun el archivo q se cargue
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder) //si la carpeta no existe la creo, si existe no hago nada.
      }
    } else {
      cb(new Error('Tipo de archivo no permitido'), null)
    }
    cb(null, folder) // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const extension = file.mimetype.split('/')[1]
    const productId = req.body.productId
    const uniqueSuffix = Date.now()
    cb(null, `${productId}-${uniqueSuffix}.${extension}`)
  },
})

const storageUserDocuments = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder
    req.reference = ''
    if (file.mimetype === 'application/pdf') {
      folder = path.join(
        __dirname,
        '..',
        'public',
        'usersFiles',
        'documents',
        file.fieldname //segun el input del que venga (el fieldname cambia) va a una carpeta u otra.
      ) // la carpeta varia segun el archivo q se cargue
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder) //si la carpeta no existe la creo, si existe no hago nada.
      }
      req.reference = path.join(
        'http://localhost:8080/static/usersFiles/documents',
        file.fieldname
      )
    } else {
      cb(new Error('Tipo de archivo no permitido'), null)
    }

    cb(null, folder) // Directorio donde se guardarán los archivos
  },

  filename: async function (req, file, cb) {
    console.log('---------')
    console.log(req.reference)
    console.log('---------')
    const extension = file.mimetype.split('/')[1]
    const userId = req.user.id
    const filename = `${userId}.${extension}`
    req.reference = path.join(req.reference, filename)
    console.log('---------')
    console.log(file)
    console.log('---------')
    const document = { name: file.fieldname, reference: req.reference }
    console.log(document)
    await userManager.setDocument(userId, document)
    cb(null, filename)
  },
})

const uploadGeneric = multer({ storage: storageGereric })
const uploadProfilePhoto = multer({ storage: storageProfilePhoto })
const uploadProductPhoto = multer({ storage: storageProductPhoto })
const uploadDocumentPDF = multer({ storage: storageUserDocuments })

module.exports = {
  uploadGeneric,
  uploadProfilePhoto,
  uploadProductPhoto,
  uploadDocumentPDF,
}
