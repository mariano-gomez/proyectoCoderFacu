const { response } = require('express')
const passport = require('passport')
const { factoryManager } = require('../config/process.config')
const { hashPassword } = require('../utils/password.utils')
const { CustomError, ErrorType } = require('../errors/custom.error')
const mailSenderService = require('../services/mail.sender.service')
const createToken = require('../utils/jwt.utils')
const DTOuserMainData = require('../utils/dto.user.maindata')

const userManager = factoryManager.userManager
class UserController {
  static sendMailToRefreshPassword = async (req, res = response, next) => {
    try {
      const email = req.body.email

      if (await userManager.getByMail(email)) {
        const token = createToken(email) // como segundo argumento puedo poner el tiempo de expiracion (segundos) por defecto es 3600
        await mailSenderService.send(email, token)
        res.redirect('/login')
      } else {
        //el error no lo puedo mandar en un req.error, pq el redirect, crea una nueva solicitud http, por lo que tengo que usar cookies
        res.cookie(
          'previousErr',
          'the supplyed mail is not registered. Please try again.'
        )
        res.redirect('/refresh-pass-public')
      }
    } catch (err) {
      next(
        new CustomError(
          err.message,
          ErrorType.Otro,
          'UserController-sendMailToRefreshPassword'
        )
      )
    }
  }

  static refreshPassword = async (req, res = response, next) => {
    try {
      const { id, email } = req.user //lo saco del user que me da el token, para seguridad.
      const newPass = req.body.password
      if (!(await userManager.isSamePass(email, newPass))) {
        //si el nuevo pass es diferente al actual entro aca. sino voy al else
        const newPassHashed = hashPassword(newPass)
        userManager.updateById(id, { password: newPassHashed })
        res.redirect('/login')
      } else {
        res.cookie(
          'previousErr',
          `the supplyed password should be different to the current one. Please try again.`
        )
        res.redirect(`/refresh-pass-private?token=${req.query.token}`)
      }
    } catch (err) {
      console.log(err.message)
      next(
        new CustomError(
          'No se pudo cambiar el password',
          ErrorType.Otro,
          'UserController-refreshPassword'
        )
      )
    }
  }

  //switchRole
  static switchRole = async (req, res = response, next) => {
    try {
      const userId = req.body.userId //el id del user a modificar., siempre el q modifca es un admin.
      await userManager.switchRole(userId)
      res.send('rol changed succesfully')
    } catch (err) {
      next(
        new CustomError(err.message, ErrorType.DB, 'UserController-switchRole')
      )
    }
  }

  static redirectUploader = async (req, res = response, next) => {
    try {
      res.redirect('/uploader') //podria mejorar este endpoint
    } catch (err) {
      next(
        new CustomError(
          err.message,
          ErrorType.General,
          'UserController-uploadProfilePhoto'
        )
      )
    }
  }

  static getAllUsersMainInfo = async (req, res = response, next) => {
    try {
      const all = await userManager.getAll()
      const allMainInfo = all.map((user) => {
        return DTOuserMainData.converter(user)
      })

      res.status(200).send({ status: 'success', payload: allMainInfo })
    } catch (err) {
      next(
        new CustomError(
          err.message,
          ErrorType.General,
          'UserController-getAllUsersMainInfo'
        )
      )
    }
  }

  static deleteInactiveUsers = async (req, res = response, next) => {
    try {
      const inactiveTime = 2 * 24 * 60 * 60 * 1000 // aca se puede setear cualquier
      const inactiveUsers = await userManager.getInactiveUsers(inactiveTime)
      inactiveUsers.map(async (user) => {
        await mailSenderService.sendInactiveUser(user.email, user.firstname)
      })

      const userDeleted = await userManager.deleteUsers(inactiveUsers)

      res.status(200).send({ status: 'success', payload: userDeleted })
    } catch (err) {
      next(
        new CustomError(
          err.message,
          ErrorType.General,
          'UserController-deleteInactiveUsers'
        )
      )
    }
  }
}

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/user

module.exports = UserController
