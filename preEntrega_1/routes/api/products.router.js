const { Router } = require("express");
const { ProductManager } = require("../../managers/productManager");

const myProducts = new ProductManager("products.json");
const router = Router(); //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/products"

//ruta 1, acepta un query parm "limit", que limita la cantidad de productos, si no esta este limite, se traen todos los productos.
router.get("/", (req, res) => {
  const limit = req.query.limit;

  // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
  if (isNaN(limit) && limit !== undefined) {
    res.send(
      "Error en el valor de limit\nEl valor de limit, debe poder parsearse a tipo Number."
    );
  }
  if (!limit) {
    res.send(JSON.stringify(myProducts.getProducts()));
    return; //este return vacio es para cortar la funcion, sino tira como un "error" segun la correccion de mayra, si yo lo saco no veo ese error
  }
  const productsToshow = myProducts.getProducts().slice(0, limit);
  res.send(JSON.stringify(productsToshow));
});

//ruta 2, trae le producto cuyo id se le pase como Url Param.
router.get("/:pid", (req, res) => {
  const id = req.params.pid;
  // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
  if (isNaN(id)) {
    res.send(
      "Error en el valor del parametro pid\nEl valor del parametro pid debe poder parsearse a tipo Number."
    );
    return; //este return vacio es para cortar la funcion, sino tira como un "error" segun la correccion de mayra, si yo lo saco no veo ese error
  }
  let product;
  try {
    product = myProducts.getProductById(+id);
  } catch {
    product = "Product Not Found";
  }
  res.send(product); //res.send(JSON.stringify(product));
});

//ruta 3, ruta post para crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const productToAdd = req.body;
    const wasProductCreated = await myProducts.addProduct(productToAdd);
    console.log(wasProductCreated);
    if (wasProductCreated) {
      res.send("Product Created");
    }
  } catch (e) {
    console.log(e);
    res.send("ha ocurrido un error");
  }
});

//ruta 5, ruta post para eliminar producto
router.delete("/:pid", async (req, res) => {
  try {

    myProducts.deleteProductById(+req.params.pid);
    res.send("Product Deleted")
    
  } catch (e) {
    console.log(e);
    res.send("ha ocurrido un error");
  }
});


module.exports = router;
