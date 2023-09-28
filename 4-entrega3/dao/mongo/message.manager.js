const mongoose = require('mongoose')
const BaseManager = require('./base.manager')
const messageModel = require('./models/message.model')

class MessageManager extends BaseManager  {

  constructor(){
    super(messageModel)
  }

  //reescribo el metodo heredado de BaseManager
  async getAll() {
    const messages = await messageModel.find().sort({ createdAt: 'asc' })
    return messages
  }
}

module.exports = new MessageManager()
