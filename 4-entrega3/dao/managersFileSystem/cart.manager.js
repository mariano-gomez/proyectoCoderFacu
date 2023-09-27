
const BaseManager = require('./base.manager')

class CartManager extends BaseManager {
  constructor(entity) {
    super(entity)
  }





}
////////aca cerrer el la definicion de la clase.

module.exports = {
  CartManager,
};

const CM = new ProductManager('carritos')

CM.add({
  user:"aca va el ID del user"
})
