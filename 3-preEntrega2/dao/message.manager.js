const messageModel = require('./models/message.model')

class MessageManager {
  async create(m) {
    await messageModel.create(m)
  }

  async getAll() {

    const messages = await messageModel.find().sort({ createdAt: 'asc' })
    return messages
  }
}

module.exports = new MessageManager()
