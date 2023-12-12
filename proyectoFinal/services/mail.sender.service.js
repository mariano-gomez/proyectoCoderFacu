const nodemailer = require('nodemailer')

require('dotenv').config({ path: './.env' })
const writeBody = require('../utils/mail.template')
const writeBodyInactiveUser = require('../utils/mail.inactive.user.template')

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.GOOGLE_ACCOUNT,
        pass: process.env.GOOGLE_PASS
      }
    })
  }

  async send(to, token) {
    await this.transporter.sendMail({
      from: 'no-reply@facucoder55225.com',
      subject: 'Mensaje de prueba',
      to,
      html: writeBody(token)
    })
  }

  async sendInactiveUser(to, name) {
    await this.transporter.sendMail({
      from: 'no-reply@facucoder55225.com',
      subject: 'Notificacion de eliminacion de usuario',
      to,
      html: writeBodyInactiveUser(name)
    })
  }




}

module.exports = new MailSender()

