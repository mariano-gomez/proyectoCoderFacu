//Desafio 2  - Castellano Facundo.
//El archivo prueba.json contiene elementos de prueba, por lo que se lo debe descargar si se quiere probar según los comentarios de mas abajo.

const fs = require("fs");
const path = require("path");

class ProductManager {
  constructor(fileNameDB) {
    this.productsCode = [];
    this.products = [];
    this.currentId = 0;
    this.path = path.join(__dirname, "..", "data", fileNameDB); // se debe poner de forma correcta y completa al momento de inicializar la clase.

    this.getSavedProducts = async function () {
      console.log("el path es: ", this.path);
      if (fs.existsSync(this.path)) {
        const allProductstFile = fs.readFileSync(this.path);
        this.products = JSON.parse(allProductstFile);
        this.products.forEach((product) => {
          this.productsCode.push(product.code);
        });
        if(this.products.length){
          this.currentId = (this.products[this.products.length - 1].id);
        }
        
      }
    };
    this.getSavedProducts();
  }

  async addProduct({
    title,
    description,
    price,
    code,
    stock,
    category,
    status = true,
    thumbnails,
  }) {
    const productToAdd = { title, description, price, code, stock, status, category };
    console.log(JSON.stringify(productToAdd))
    if (
      !this.productsCode.includes(code) &&
      !Object.values(productToAdd).includes(undefined)
    ) {
      productToAdd.thumbnails = thumbnails; //este parametro no es necesario, si no se lo pasa (sera undefined), y al guardar el producto nodejs lo crea solo si esta definido
      this.currentId += 1;
      productToAdd.id = this.currentId;
      this.productsCode.push(productToAdd.code);
      this.products.push(productToAdd);
      //si lo creo lo guarod en el archivo
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
      } else {
        const allProductstFile = fs.readFileSync(this.path);
        const allProductsAsArray = JSON.parse(allProductstFile);
        allProductsAsArray.push(productToAdd);
        fs.writeFileSync(this.path, JSON.stringify(allProductsAsArray));
      }
      return true //--> una vez creado el producto se devuelve true
    } else {
      if (this.productsCode.includes(code)) {
        throw new Error(
          "El campo code del producto que se intenta agregar, ya pertenece a otro producto"
        );
      } else {
        throw new Error("Productos con los parametros mal definidos");
      }
    }
  }

  getProducts() {
    return this.products;
  }

  showProductsCode() {
    console.log(this.productsCode);
  }

  // el metodo getProductById, retorna el producto (es decir no es que lo muestre por pantalla.
  getProductById(idFounded) {
    for (let product of this.products) {
      if (product.id === idFounded) {
        //decido usar el operador de comparacion estricto, por lo que se espera recibir un tipo Number, no un string.
        return product;
      }
    }
    throw new Error(`Not found, any product have the id: ${idFounded}`);
  }

  deleteProductById(idProduct) {
    try {
      const productToDelete = this.getProductById(idProduct);
      const index = this.products.indexOf(productToDelete);
      this.products.splice(index, 1);
      fs.writeFileSync(this.path, JSON.stringify(this.products));   
    } catch (err) {
      throw err;
    }
  }

  modifyProductById(idProduct, newProduct) {
    try {
      const oldProduct = this.getProductById(idProduct);
      const codeTodelete = oldProduct.code;
      const { title, description, price, thumbnail, code, stock } = newProduct;
      const productUpdated = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      const arrayCodeAuxiliar = [...this.productsCode]; // este array me ayuda a poder separar todos los code de los otros productos, (es decir sacar el del producto que estoy intentando modificar)
      arrayCodeAuxiliar.splice(this.productsCode.indexOf(codeTodelete), 1);

      if (
        !Object.values(productUpdated).includes(undefined) &&
        !arrayCodeAuxiliar.includes(code)
      ) {
        this.productsCode.splice(
          this.productsCode.indexOf(codeTodelete),
          1,
          code
        ); //--> modifico el code de productsCode
        productUpdated.id = oldProduct.id; //--> mantengo el Id que es generado automaticamente
        this.products.splice(
          this.products.indexOf(oldProduct),
          1,
          productUpdated
        );
        fs.writeFileSync(this.path, JSON.stringify(this.products));
      } else {
        if (this.productsCode.includes(code)) {
          throw new Error(
            "Se intenta modificar un producto, pero el campo code coincide con otro producto, solo se permite que coincida con el codigo que tenia el mismo producto anteriormente."
          );
        } else {
          throw new Error("Productos con los parametros mal definidos");
        }
      }
    } catch (err) {
      throw err;
    }
  }
}

module.exports = {
  ProductManager,
};

//TEST DE FUNCIONAMIENTO https://github.com/FacuCastellano/coderBackendDesafiosCastellanoFacundo.git

//const miVineria = new ProductManager(path.join(__dirname, "prueba.json"));

//console.log(miVineria.getProducts()) //-->obtengo los productos del archivo prueba.json

//descomentar el siguiente codigo para mostrar el error al cargar el producto por falta de un atributo (thumbnail en este caso.)
//miVineria.addProduct({title:"lobo con piel de cordero",description:"malbec",price:1850,code:"lobo1234",stock:36}) // debe lanzar error.

//descomentar el siguiente codigo para eliminar un producto por id
//miVineria.deleteProductByID(6)

//descomentar el siguiente codigo para agregar un producto, esto se deberia hacer una vez eliminado el producto en el paso anterior.
//miVineria.addProduct({title:"lobo con piel de cordero",description:"malbec",price:1850,thumbnail:"imagenes/lobo_con_piel_de_cordero",code:"lobo1234",stock:36})

//descomentar el siguiente codigo para mostrar el error al cargar el producto por cargar un producto con el mismo codigo (el code correspondo al producto 1)
//miVineria.addProduct({title:"El elixir",description:"malbec",price:2500,thumbnail:"imagenes/el_elixir",code:"abc4126",stock:36})

//descomentar el siguiente codigo para ver la modificacion de un producto.

// const productModified = {
//   title: "el gran amigo",
//   description: "blend",
//   price: 9500,
//   thumbnail: "imagen/el_gran_amigo",
//   code: "xyz987", //  --> debe ser diferente a los code de los otros productos que ya exisiten, si fuera un code de otro producto tira error, probar con "code":"abc4126" que pertenece al producto de id = 1, Este code SI puede ser igual al code que tenia el mismo producto antes de modificarse, como en este caso (aunque eso no es necesario.)
//   stock: 30,
// };

// miVineria.modifyProductById(2, productModified);
