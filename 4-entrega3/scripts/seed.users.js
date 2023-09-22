require("dotenv").config()
const mongoose = require("mongoose");
const userModel = require("../dao/models/user.model");
const { faker } = require("@faker-js/faker");

const users = [];

for (let i = 0; i < 10; i++) {
  const sex = faker.person.sexType();
  const firstname = faker.person.firstName(sex);
  const lastname = faker.person.lastName();

  const user = {
    sex: sex,
    firstname: firstname,
    lastname: lastname,
    email: faker.internet.email({ firstName: firstname, lastName: lastname }),
    address: faker.location.streetAddress({ useFullAddress: true }),
    password: faker.internet.password({
      length: faker.helpers.rangeToNumber({ min: 8, max: 15 }),
    }),
    age: faker.helpers.rangeToNumber({ min: 18, max: 99 }),
  };

  users.push(user); // aca voy agregando los usuarios creados.
}


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
    result = await userModel.insertMany(users); //aca creo todos los documentos users en mongo atlas de una
    console.log(`${result.length} products had been added`);
    mongoose.disconnect() // mato la conexion para que no quede abierta.
  } catch (err) {
    console.log("Ha ocurrido un error en script seed.users.js");
    console.log(err);
  }
})();

