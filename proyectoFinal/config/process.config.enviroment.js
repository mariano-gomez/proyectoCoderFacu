
//esta configuracion la tengo q hacer aparte, para no generar referencias cruzadas
const { Command } = require('commander')
require('dotenv').config({ path: './.env' })
const program = new Command()

//aca seteo las q van a ser mis variables de CLI
program
  .option('-m,--mode <dao>', 'DAO selected', 'mongo')
  .option('-db,--database <database>', 'database extension selected', '')
  .option('-p <port>', 'selected port', 8080)
  .option('-env,--enviroment <enviroment>', 'enviroment deployed', 'production')

program.parse() //esta parsea a variables las seteadas arriba
const { enviroment } = program.opts()

module.exports = { enviroment }
