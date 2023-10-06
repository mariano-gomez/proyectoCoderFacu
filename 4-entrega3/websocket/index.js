// const { ProductManager } = require('../managers/productManager')

const { factoryManager }=require("../config/process.config")
const messageManager = factoryManager.messageManager

// const messageManager = require('../dao/message.manager')

function socketManager(socket) {
  //console.log(`user has connected: ${socket.id}`)

  socket.on('message', async (msg) =>  {
    console.log("----user-----")
    console.log(socket.user)
    

    await messageManager.add(msg)
    socket.broadcast.emit('message', msg)
  })

  socket.on('disconnect', () => {
    //console.log('user disconnected')
  })
}

module.exports = socketManager
