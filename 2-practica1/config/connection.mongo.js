

// ${SCHEMA}://{USER}:{PASS}@{HOSTNAME}:${PORT}/${DATABASE} -> LOCAL mongodb://localhost:27017/ecommerce

const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.USER_ATLAS}:${process.env.PASS_ATLAS}@cluster0.xp1dk2t.mongodb.net/ecommerce?retryWrites=true&w=majority`;

const db = mongoose.connection;

//IFFE para conectarse a mongo atlas.
(async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database is connected to cluster0.xp1dk2t.mongodb.net/ecommerce");
  } catch (err) {
    
    console.log("Ha ocurrido un error en la conexion de la BD");
    console.log(err);
  }
})();

module.exports = db; 
