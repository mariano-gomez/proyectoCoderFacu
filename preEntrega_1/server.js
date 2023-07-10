const express = require("express");
const { api } = require("./routes/mainRoutes");

PORT = 8081;

const app = express();

//middelwares para dar formato
app.use(express.urlencoded({ extended: true })); // -->dar formato a los parametros query
app.use(express.json()); // -->dar parsear los JSON enviados en el body

//router
app.use("/api", api);

app.get("/*", (req, res) => {
  res.send("hola facu,esta es la ruta generica GET");
});

app.listen(PORT, () => {
  console.log(`corriendo en puerto ${PORT}`);
});
