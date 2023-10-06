const { factoryManager }=require("../config/process.config")
const messageManager = factoryManager.messageManager

class MessageController {

  static getPrevious = async (req, res) => {
    try {
      const previousMessages = await messageManager.getAll()
      res.send({
        messages: previousMessages,
      })
    } catch (err) {
      console.log("Error en la ruta get('/') de messages")
      console.log(err)
      res.send({
        messages: null
      })
    }
  }
  

}

module.exports = MessageController

