console.log('ejecutando las pruebass')

const userManager = require('./dao/mongo/user.manager')

const userId = '64f6332b6d04bb39390190c6'
const document = { name: 'account', reference: 'el link del id tinchex asdasd123' }
const main = async (userId) => {
  await userManager.setDocument(userId, document)
}
main(userId)

module.exports = {}
