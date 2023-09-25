const { Schema, model } = require('mongoose')
const { v4: uuid } = require('uuid')

const schema = new Schema(
  {
    code: { type: String, unique: true, default: uuid },
    amount: { type: Number, required: true },
    purchaser: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
)

const ticketModel = model('tickets', schema)
