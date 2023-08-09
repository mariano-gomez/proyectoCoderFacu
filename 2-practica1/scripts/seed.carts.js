// para ejecutar este seeder, necesariamente se deben haber ejecutado los dos seeders anteriores, pq es necesario tener products y users en la BD
require("dotenv").config();
console.log("hola desde seed.carts.js");
const mongoose = require("mongoose");
const userModel = require("../dao/models/user.model");
const productModel = require("../dao/models/product.model");
const { faker } = require("@faker-js/faker");

(async function seeder() {
  try {
    const uri = `mongodb+srv://${process.env.USER_ATLAS}:${process.env.PASS_ATLAS}@cluster0.xp1dk2t.mongodb.net/ecommerce?retryWrites=true&w=majority`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "database is connected to cluster0.xp1dk2t.mongodb.net/ecommerce"
    );
    const allProductsId = await productModel.find({}, { _id: 1 });
    const allProductsIdArray = [];
    allProductsId.forEach((p) => {
      const id = p._id;
      allProductsIdArray.push(id);
    });
    const totalCarts = 6; //estos son la cantidad de carritos que quiero agregar
    const carts = [];
    for (let i = 0; i < totalCarts; i++) {
      const productsCart = [];
      const productsDifferents = faker.helpers.rangeToNumber({
        min: 1,
        max: 5,
      });
      const alreadyAdded = [];
      for (let j = 0; j < productsDifferents; j++) {
        pid = faker.helpers.arrayElement(allProductsIdArray);
        console.log("el pid es: ", pid);
        if (alreadyAdded.includes(pid)) {
          continue;
        }

        alreadyAdded.push(pid);

        product = {
          id: pid,
          qty: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
        };

        productsCart.push(product);
      }
      carts.push({products:productsCart});
    }

    console.log(carts);

    mongoose.disconnect(); // mato la conexion para que no quede abierta.
  } catch (err) {
    console.log("Ha ocurrido un error en script seed.products.js");
    console.log(err);
  }
})();
