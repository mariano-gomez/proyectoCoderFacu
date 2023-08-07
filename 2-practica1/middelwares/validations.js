const { CartManager } = require("../managers/cartManager");
const { ProductManager } = require("../managers/productManager");

const myProducts = new ProductManager("products.json");

function validationProductExistence(req, res, next) {
  const productId = +req.params.pid;
  if (myProducts.getProductById(productId)) {
    next();
  }
  return res.send("not product found - middelware");
}

module.exports = {
  validationProductExistence,
};
