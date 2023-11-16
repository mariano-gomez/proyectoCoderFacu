// const { ProductManager } = require('../managers/productManager')

const { factoryManager } = require('../config/process.config')
const messageManager = factoryManager.messageManager

// const messageManager = require('../dao/message.manager')

function socketManager(socket) {
  //console.log(`user has connected: ${socket.id}`)

  socket.on('message', async (msg) => {
    if (socket.request.user.role === 'user') {
      //console.log("flag 1")
      await messageManager.add(msg)
      socket.broadcast.emit('message', msg)
    }else if (socket.request.user.role === 'admin'){
      //cleconsole.log("flag 2")
      socket.emit("alertMsg",{
        alertCode: 1,
        message: "Admins can't write in chat"
      })
    }
    
  })

  socket.on('disconnect', () => {
    //console.log('user disconnected')
  })
}

module.exports = socketManager
