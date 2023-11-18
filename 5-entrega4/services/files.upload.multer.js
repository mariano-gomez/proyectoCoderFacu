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

    const folder = path.join(__dirname, '..', 'public', 'media', mediaFolder) // la carpeta varia segun el archivo q se cargue

    //multer no crea la carpeta sino la encuentra, por lo que la creo manualmente con fs.
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder) //si la carpeta no existe la creo, si existe no hago nada.
    }
    cb(null, folder) // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const extension = '.' + file.originalname.split('.')[1]
    const uniqueSuffix = Date.now()
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  },
})

const storageProfilePhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = file.mimetype.split('/')[0]
    const extension = file.mimetype.split('/')[1]
    let folder
    if (type === 'image') {
      folder = path.join(__dirname, '..', 'public', 'media', 'profilePhotos') // la carpeta varia segun el archivo q se cargue
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder) //si la carpeta no existe la creo, si existe no hago nada.
      }
    } else {
      folder = 'asdasd' // esta carpeta no existe por lo que no subira nada. Osea solo se guardaran imagenes, otros archivos seran descartados (deberia haber una forma mas prolija de hacer esto tipo un "next" o algo asi.)
    }
    cb(null, folder) // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const extension = '.' + file.originalname.split('.')[1]
    const uniqueSuffix = Date.now()
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  },
})

const storageProductPhoto = multer.diskStorage({
  destination: function (req, file, cb) {
    const type = file.mimetype.split('/')[0]
    const extension = file.mimetype.split('/')[1]
    let folder
    if (type === 'image') {
      folder = path.join(__dirname, '..', 'public', 'media', 'productsPhotos') // la carpeta varia segun el archivo q se cargue
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder) //si la carpeta no existe la creo, si existe no hago nada.
      }
    } else {
      folder = 'asdasd' // esta carpeta no existe por lo que no subira nada. Osea solo se guardaran imagenes, otros archivos seran descartados (deberia haber una forma mas prolija de hacer esto tipo un "next" o algo asi.)
    }
    cb(null, folder) // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    const extension = '.' + file.originalname.split('.')[1]
    const uniqueSuffix = Date.now()
    cb(null, file.fieldname + '-' + uniqueSuffix + extension)
  },
})

const uploadGeneric = multer({ storage: storageGereric })
const uploadProfilePhoto = multer({ storage: storageProfilePhoto })
const uploadProductPhoto = multer({ storage: storageProductPhoto })

module.exports = { uploadGeneric, uploadProfilePhoto, uploadProductPhoto }
