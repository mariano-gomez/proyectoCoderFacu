// const { ProductManager } = require('../managers/productManager')

// const productManager = new ProductManager('products.json')

function socketManager(socket) {
  console.log(`user has connected: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
}

module.exports = socketManager
