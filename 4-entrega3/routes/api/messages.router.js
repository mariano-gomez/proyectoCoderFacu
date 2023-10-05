const { Router } = require('express')
const router = Router()
const { factoryManager }=require("../../config/process.config")
const messageManager = factoryManager.messageManager
const {onlyAdmin,onlyUser} = require('../../middelwares/routes.polices')
//const messageManager = require('../../dao/message.manager')

router.get('/', async (req, res) => {
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
})


module.exports = router