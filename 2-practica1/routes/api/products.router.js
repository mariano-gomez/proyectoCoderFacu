const { Router } = require("express");
const router = Router(); //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.
const productManager = require("../../dao/product.manager");

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/products"

//ruta 1, acepta un query parm "limit", que limita la cantidad de productos, si no esta este limite, se traen todos los productos.
//tmb adimite un query param "page", para poder hacer paginacion, si no esta trae la primera pagina.
router.get("/", async (req, res) => {
  const { limit, page } = req.query;
  // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
  if (isNaN(limit) && limit !== undefined) {
    res.send({
      status: "Error, the (limit) value is wrong",
      payload: null,
    });
    return;
  }
  res
    .status(200)
    .send({
      status: "success",
      payload: await productManager.getAll({ limit, page }),
    });
  return;
});

//ruta 2, trae le producto cuyo id se le pase como Url Param.
router.get("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    product = await productManager.getById(id);
    res.send({ status: "success", payload: product });
  } catch {
    res.send({ status: "product not found", payload: null });
  }
});

//ruta 3, ruta post para crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const info = await productManager.addProduct(product);
    res.send({ status: "success", productId: info._id });
  } catch (e) {
    res.status(500).send({ status: "Error, the product was not created" });
  }
});

//ruta 4 ruta put modificar ciertas propiedades de un producto
router.patch("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const newPropiertiesValues = req.body;
    const productUpdated = await productManager.updateById(
      id,
      newPropiertiesValues
    );
    res.send({ status: "success", payload: productUpdated });
  } catch (e) {
    res.status(500).send({ status: "Error", "Error type": e.message });
  }
});

//ruta 5, ruta post para eliminar producto
router.delete("/:pid", async (req, res) => {
  try {
    const id = req.params.pid;
    const info = await productManager.deleteById(id);
    if (info.deletedCount === 1) {
      res.send({ status: `success, the product with id:${id} was deleted` });
      return;
    }
    res.status(404).send({ status: `error, product not found` });
    return;
  } catch (err) {
    res.send({ status: "Error", "Error type": err.message });
  }
});

module.exports = router;
