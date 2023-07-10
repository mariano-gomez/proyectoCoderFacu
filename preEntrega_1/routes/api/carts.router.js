const { Router } = require("express");
const { CartManager} = require("../../managers/cartManager");

const myCarts = new CartManager("carts.json");
const router = Router(); //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/carts"

//ruta 1, crea un carrito nuevo.
router.post("/", async (req, res) => {
  const products = await req.body.products;
  console.log(products)
  if(await myCarts.addCart({products})){
    res.send("Cart Created")
  }

});

// //ruta 2, trae le producto cuyo id se le pase como Url Param.
// router.get("/:pid", (req, res) => {
//   const id = req.params.pid;
//   // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
//   if (isNaN(id)) {
//     res.send(
//       "Error en el valor del parametro pid\nEl valor del parametro pid debe poder parsearse a tipo Number."
//     );
//     return; //este return vacio es para cortar la funcion, sino tira como un "error" segun la correccion de mayra, si yo lo saco no veo ese error
//   }
//   let product;
//   try {
//     product = myProducts.getProductById(+id);
//   } catch {
//     product = "Product Not Found";
//   }
//   res.send(product); //res.send(JSON.stringify(product));
// });

// //ruta 3, ruta post para crear un nuevo producto
// router.post("/", async (req, res) => {
//   try {
//     const productToAdd = req.body;
//     const wasProductCreated = await myProducts.addProduct(productToAdd);
//     console.log(wasProductCreated);
//     if (wasProductCreated) {
//       res.send("Product Created");
//     }
//   } catch (e) {
//     console.log(e);
//     res.send("ha ocurrido un error");
//   }
// });

// //ruta 5, ruta post para eliminar producto
// router.delete("/:pid", async (req, res) => {
//   try {

//     myProducts.deleteProductById(+req.params.pid);
//     res.send("Product Deleted")
    
//   } catch (e) {
//     console.log(e);
//     res.send("ha ocurrido un error");
//   }
// });

module.exports = router;
