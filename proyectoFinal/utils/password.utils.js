const bcrypt = require('bcrypt')

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  return bcrypt.hashSync(password, salt)
}

const isValidPassword = (pwd1, pwd2) => {
  //pwd1: pass a validar
  //pwd2: pass patron
  return bcrypt.compareSync(pwd1, pwd2)
}

module.exports = { hashPassword, isValidPassword }


