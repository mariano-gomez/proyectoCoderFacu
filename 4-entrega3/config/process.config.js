const { Command } = require('commander')
require('dotenv').config({ path: './.env' })
//importo todos los managers para el DAO de mongo

const userManagerMongo = require('../dao/mongo/user.manager')
const productManagerMongo = require('../dao/mongo/product.manager')
const cartManagerMongo = require('../dao/mongo/cart.manager')
const messageManagerMongo = require('../dao/mongo/message.manager')
const ticketManagerMongo = require('../dao/mongo/ticket.manager')

//importo todos los managers para el DAO de fileSystem
const userManagerFileSystem = require('../dao/fileSystem/user.manager')
const productManagerFileSystem = require('../dao/fileSystem/product.manager')
const cartManagerFileSystem = require('../dao/fileSystem/cart.manager')

const program = new Command()

//aca seteo las q van a ser mis variables de CLI
program
  .option('-m,--mode <dao>', 'DAO selected', 'mongo')
  .option('-db,--database <database>', 'database extension selected', '')
  .option('-p <port>', 'selected port', 8080)

program.parse() //esta parsea a variables las seteadas arriba
const { p: port, mode, database } = program.opts()

process.env.PORT = port
//seteo la base de datos que voy a usar
const mongoUri = `mongodb+srv://${process.env.USER_ATLAS}:${process.env.PASS_ATLAS}@cluster0.xp1dk2t.mongodb.net/ecommerce${database}?retryWrites=true&w=majority`

//creo una varaible para saber a que cluster y BD le estoy pegando.
const clusterInfo = '@cluster' + mongoUri.split('@cluster')[1].split('?')[0]

class FactoryManger {
  constructor() {
    if (mode === 'mongo') {
      //console.log("ejecutando en mode: mongo")
      this.userManager = userManagerMongo
      this.productManager = productManagerMongo
      this.cartManager = cartManagerMongo
    } else if (mode === 'fileSystem') {
      //console.log("ejecutando en mode: fileSystem")
      this.userManager = userManagerFileSystem
      this.productManager = productManagerFileSystem
      this.cartManager = cartManagerFileSystem
    } else {
      throw Error('el mode de ejecuccion deber ser mongo o fileSystem')
    }
    //estos directamente los saco de mongo
    this.messageManager = messageManagerMongo
    this.ticketManager = ticketManagerMongo
  }
}

module.exports = {
  port,
  clusterInfo,
  mongoUri,
  factoryManager: new FactoryManger(),
}
