const nodemailer = require('nodemailer')

require('dotenv').config({ path: './.env' })
const writeBody = require('../utils/mail.template')
const writeBodyInactiveUser = require('../utils/mail.inactive.user.template')
const writeBodyProductDeleted = require('../utils/mail.product.deleted.template')

class MailSender {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 587,
      auth: {
        user: process.env.GOOGLE_ACCOUNT,
        pass: process.env.GOOGLE_PASS,
      },
    })
  }

  async send(to, token) {
    await this.transporter.sendMail({
      from: 'no-reply@facucoder55225.com',
      subject: 'Mail Para Cambiar Contraseña',
      to,
      html: writeBody(token),
    })
  }

  async sendInactiveUser(to, name) {
    await this.transporter.sendMail({
      from: 'no-reply@facucoder55225.com',
      subject: 'Notificacion de eliminacion de usuario',
      to,
      html: writeBodyInactiveUser(name),
    })
  }

  async sendProductDeleted(to, user, product) {
    await this.transporter.sendMail({
      from: 'no-reply@facucoder55225.com',
      subject: 'Notificacion de eliminacion de producto',
      to,
      html: writeBodyProductDeleted(user, product),
    })
  }
}

module.exports = new MailSender()
