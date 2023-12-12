const userManager = require('../dao/mongo/user.manager')

const setLastConnection = async (req, res, next) => {
  try {
    await userManager.updateById(req.user.id, { last_connection: Date.now() })
    next()
  } catch (err) {
    console.error('Error al actualizar la última conexión:', err)
    next(err)
  }
}

module.exports = setLastConnection
