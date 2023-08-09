require("dotenv").config({ path: "./.env" });
const mongoose = require("mongoose");
const express = require("express");
const { api } = require("./routes/mainRoutes");
const puerto = process.env.PORT || 8080;  
const app = express();

//middelwares para dar formato
app.use(express.urlencoded({ extended: true })); // --> dar formato a los parametros query
app.use(express.json()); // -->para parsear el JSON enviados en el body

//router de  api
app.use("/api", api);


//IIFE para poder usar el await en la coneccion de mongo y conectar a mongo atlas antes levantar el servidor
(async () => {  
  try {
    const uri = `mongodb+srv://${process.env.USER_ATLAS}:${process.env.PASS_ATLAS}@cluster0.xp1dk2t.mongodb.net/ecommerce?retryWrites=true&w=majority`;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "database is connected to cluster0.xp1dk2t.mongodb.net/ecommerce"
    );   
    app.listen(puerto, () => {
      console.log(`corriendo en puerto ${puerto}`);
    });
        
  } catch (err) {
    console.log("Ha ocurrido un error en el archivo server.js");
    console.log(err);
  }
})();
