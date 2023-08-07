const express = require("express");
const { api } = require("./routes/mainRoutes");

PORT = 8080;

const app = express();

//middelwares para dar formato
app.use(express.urlencoded({ extended: true })); // --> dar formato a los parametros query
app.use(express.json()); // -->para parsear el JSON enviados en el body

//router de  api
app.use("/api", api);


app.listen(PORT, () => {
  console.log(`corriendo en puerto ${PORT}`);
});
