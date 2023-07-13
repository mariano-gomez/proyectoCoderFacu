const { Router } = require("express");
const { CartManager } = require("../../managers/cartManager");
const { ProductManager } = require("../../managers/productManager");
const { validationProductExistence } = require("../../middelwares/validations");

const myProducts = new ProductManager("products.json");
const myCarts = new CartManager("carts.json");
const router = Router(); //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/carts"

//ruta 1, crea un carrito nuevo.
router.post("/", async (req, res) => {
  try {
    const products = [];
    await myCarts.addCart({ products });
    res.send({ status: "Success, a new was created" });
  } catch (e) {
    res.status(500).send({ status: "Error, the cart was not created" });
  }
});

//ruta 2, devuelvo los productos de un carrito en especifico.
router.get("/:cid", async (req, res) => {
  try {
    const cartId = +req.params.cid; //--> RECORDAR: lo levanto como STRING! DEBO pasalor a NUMBER
    const cart = await myCarts.getCartById(cartId);
    res.send({ status: "Success", payload: cart.products });
  } catch (e) {
    res.send({ status: "Cart Not Found", payload: null });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const cartId = +req.params.cid;
    const productId = +req.params.pid;
    myCarts.checkCartExistence(cartId); //si el cartId es invalido salta aca
    myProducts.checkProductExistence(productId); //si el productId es invalido salta aca
    const wasProductAdded = myCarts.addProductToCart(cartId, productId);
    if (wasProductAdded) {
      res.send({
        status: `Success the product (id=${productId}), was added to the cart (id=${cartId})`,
      });
    }
  } catch (e) {
    res.send({ status: `Error`, Error: e.message });
  }
});

module.exports = router;
