const { mongoUri, clusterInfo } = require('./config/process.config')
//require('dotenv').config({ path: './.env' }) // lo estoy ejecutando en el archivo de config.process
const http = require('http')
const express = require('express')
const path = require('path')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')

const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const passportSocketIo = require('passport.socketio')
const initPassportLocal = require('./config/passport.init')
const socketManager = require('./websocket')
const SocketPolices = require('./middelwares/socket.polices')
const { api, home } = require('./routes/mainRoutes')
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
app.use(cookieParser())

//creo una instancia de mongoStore, para usar la  misma para socketIo y para HTTP
const mongoStore = new MongoStore({
  mongoUrl: mongoUri,
  //mongoUrl:`mongodb+srv://${process.env.USER_ATLAS}:${process.env.PASS_ATLAS}@cluster0.xp1dk2t.mongodb.net/ecommerce?retryWrites=true&w=majority`,
  ttl: 3600, ///-->tiempo en segundos que mongo guarda los datos.
})

app.use(
  session({
    secret: process.env.SECRETO_SESSION,
    resave: true, //--> para que la session no caduque con el tiempo.
    saveUninitialized: true, //-> para que guarde el obj session aun cuando este este vacio
    store: mongoStore,
  })
)

//cargo las estrategias de passport.

initPassportLocal()

app.use(passport.initialize())
app.use(passport.session())

//inserto el io en la request.
app.use((req, res, next) => {
  req.io = io
  next()
})

//router de api
app.use('/api', api)

//router del home
app.use('/', home)

//seteo para q el socket-io, 
//aca seteo el io, para que use passport, y meterle el user, en las peticiones.
io.use(
  passportSocketIo.authorize({
    cookieParser: cookieParser, // the same middleware you registrer in express
    key: 'connect.sid', // the name of the cookie where express/connect stores its session_id
    secret: process.env.SECRETO_SESSION, // the session_secret to parse the cookie
    store: mongoStore, // we NEED to use a sessionstore. no memorystore please
    //success: onAuthorizeSuccess, // *optional* callback on success - read more below
    //fail: onAuthorizeFail, // *optional* callback on fail/error - read more below
  })
)
/
io.use(SocketPolices.prueba) //aca podria meter middelwares en las peticiones de socketIo, aunque ahora esta al vicio.
io.on('connection', socketManager)

//IIFE para poder usar el await en la coneccion de mongo y conectar a mongo atlas antes levantar el servidor
;(async () => {
  try {
    const uri = mongoUri
    //const uri = `mongodb+srv://${process.env.USER_ATLAS}:${process.env.PASS_ATLAS}@cluster0.xp1dk2t.mongodb.net/ecommerce?retryWrites=true&w=majority`

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log(`database is connected to ${clusterInfo}`)
    server.listen(puerto, () => {
      console.log(`corriendo en puerto ${puerto}`)
    })
  } catch (err) {
    console.log('Ha ocurrido un error en el archivo server.js')
    console.log(err)
  }
})()
