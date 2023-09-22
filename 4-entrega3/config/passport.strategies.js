const local = require('passport-local')
const userManager = require('../dao/user.manager')
const { hashPassword, isValidPassword } = require('../utils/password.utils')
const LocalStrategy = local.Strategy

const signup = async (req, email, password, done) => {
  try {
    const { password: _password, password2: _password2, ...user } = req.body
    const _user = await userManager.getByMail(email)

    if (_user) {
      console.log('usuario ya existe')
      return done(null, false)
    }

    const newUser = await userManager.add({
      ...user,
      password: hashPassword(_password),
    })

    console.log('newUser:', newUser)

    return done(null, newUser)
  } catch (e) {
    console.log('ha ocurrido un error')
    done(e, false)
  }
}

const loginLocal = async (email, password = '', done) => {
  try {
    const _user = await userManager.getByMail(email)

    if (!_user) {
      return done(null, false)
    }

    if (!isValidPassword(password, _user.password)) {
      return done(null, false)
    }

    done(null, _user)
  } catch (e) {
    console.log('ha ocurrido un error en la funcion loginLocal')
    done(e, false)
  }
}

module.exports = {
  LocalStrategy,
  signup,
  loginLocal,
}
