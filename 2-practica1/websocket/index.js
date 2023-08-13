// const { ProductManager } = require('../managers/productManager')


const messageManager = require('../dao/message.manager')

function socketManager(socket) {
  console.log(`user has connected: ${socket.id}`)

  socket.on('message', async (msg) =>  {
    await messageManager.create(msg)
    socket.broadcast.emit('message', msg)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
}

module.exports = socketManager
