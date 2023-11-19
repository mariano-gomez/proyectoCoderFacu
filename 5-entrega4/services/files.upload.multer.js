const fs = require('fs')
const path = require('path')
const multer = require('multer')

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
    console.log('---------')
    console.log(file)
    console.log('---------')
    let folder
    if (file.mimetype === 'application/pdf') {
      folder = path.join(
        __dirname,
        '..',
        'public',
        'usersFiles',
        'documents',
        file.fieldname
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
    cb(null, `${userId}.${extension}`)
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
