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
      if (fs.existsSync(this.path)) {
        const allProductstFile = fs.readFileSync(this.path);
        this.products = JSON.parse(allProductstFile);
        this.products.forEach((product) => {
          this.productsCode.push(product.code);
        });
        if (this.products.length) {
          this.currentId = this.products[this.products.length - 1].id;
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
    const productToAdd = {
      title,
      description,
      price,
      code,
      stock,
      status,
      category,
    };

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
      return true; //--> una vez creado el producto se devuelve true
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

  checkProductExistence(productId) {
    if (this.getProductById(productId)) {
      return true;
    } else {
      //en verdad nunca entra en este else pq el getProductById tira un error si retorna un producto
      throw Error("product id not found");
    }
  }

  deleteProductById(idProduct) {
    try {
      const productToDelete = this.getProductById(idProduct);
      const index = this.products.indexOf(productToDelete);
      this.products.splice(index, 1);
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      return true;
    } catch (err) {
      throw err;
    }
  }

  async updateProductById(productId, newPropiertiesValues) {
    try {
      const productModify = this.getProductById(productId);
      const propiertiesNames = Object.keys(newPropiertiesValues);
      //No permito cambier el ID
      if (propiertiesNames.includes("id")) {
        throw new Error("The Product id can't be modified");
      } else {
        //No permito cambier el ID pero SI el CODE, pero a la vez controlo que el CODE NUEVO no pertenezca a otro producto
        //si pertenece al mismo producto, si lo dejo "cambiar" por el mismo valor, es decir me fijo que no le tire el error por igualdad de codigo.
        if (propiertiesNames.includes("code")) {
          if (
            this.productsCode.includes(newPropiertiesValues["code"]) &&
            productModify["code"] !== newPropiertiesValues["code"]
          ) {
            throw new Error(
              "The value of the new code alredy owns to another product"
            );
          } else {
            //si esta todo bien saco de juego el codeViejo the this.productsCode pq ya no pertenece a ningun producto.
            const oldCodeIndex = this.productsCode.indexOf(
              newPropiertiesValues.code
            );
            const newCodeValue = propiertiesNames.code;
            this.productsCode.splice(oldCodeIndex, 1, newCodeValue);
          }
        }
        propiertiesNames.forEach((propierty) => {
          productModify[propierty] = newPropiertiesValues[propierty];
        });
        fs.writeFileSync(this.path, JSON.stringify(this.products));
      }
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
