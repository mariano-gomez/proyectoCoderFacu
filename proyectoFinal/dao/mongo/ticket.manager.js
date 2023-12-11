const BaseManager = require('./base.manager')
const ticketModel = require('./models/ticket.model')
//const db = require("../config/connection.mongo");


class TicketManager extends BaseManager {
  constructor() {
    super(ticketModel)
  }
}

module.exports = new TicketManager() //singleton --> siempre exporto una misma instancia de clase.
