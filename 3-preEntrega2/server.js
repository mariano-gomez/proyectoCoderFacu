require('dotenv').config({ path: './.env' })
const http = require('http')
const express = require('express')
const { api, home } = require('./routes/mainRoutes')
const path = require('path')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const socketManager = require('./websocket')
const mongoose = require('mongoose')
const puerto = process.env.PORT || 8080

//settings del servidor / express /socket.io
const app = express()
const server = http.createServer(app) // server http montado con express
const io = new Server(server) // web socket montado en el http

//settings del motor de plantilla
app.engine('handlebars', handlebars.engine()) // registramos handlebars como motor de plantillas
app.set('views', path.join(__dirname, '/views')) // el setting 'views' = directorio de vistas
app.set('view engine', 'handlebars') // setear handlebars como motor de plantillas

//sirvo la carpeta public
app.use('/static', express.static(path.join(__dirname + '/public')))

//middelwares para dar formato a las request http
app.use(express.urlencoded({ extended: true })) // --> dar formato a los parametros query
app.use(express.json()) // -->para parsear el JSON enviados en el body

//inserto el io en la request.
app.use((req, res, next) => {
  req.io = io
  next()
})

//router de api
app.use('/api', api)

//router del home
app.use('/', home)

//seteo para q el socket-io, esccuhe las peticiones websocket
io.on('connection', socketManager)

//IIFE para poder usar el await en la coneccion de mongo y conectar a mongo atlas antes levantar el servidor
;(async () => {
  try {
    const uri = `mongodb+srv://${process.env.USER_ATLAS}:${process.env.PASS_ATLAS}@cluster0.xp1dk2t.mongodb.net/ecommerce?retryWrites=true&w=majority`
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(
      'database is connected to cluster0.xp1dk2t.mongodb.net/ecommerce'
    )
    server.listen(puerto, () => {
      console.log(`corriendo en puerto ${puerto}`)
    })
  } catch (err) {
    console.log('Ha ocurrido un error en el archivo server.js')
    console.log(err)
  }
})()
