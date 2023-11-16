const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')

//spec viene de specifications, es un nombre muy comun para esta variable.
const spec = swaggerJsDoc({
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Proyecto CoderHouse- Backend',
      description: 'Documentacion de la API para un e-commerce',
      version:'1.0.0' //es la version de mi API, aparece en un tag Gris a la izquierda del tag verde de la version de swagger
    },
    contact:{
      name: "API Support",
      url: "https://www.linkedin.com/in/facundo-castellano",
      email:"support@myapi.com"
    }
  },
  apis: [`${__dirname}/*.yaml`],
})

//este se usa tipo middelware, es como que genera todo lo necesario para servir los archivos
const swaggerUiExpressServe = swaggerUiExpress.serve

//este se usa tipo controlador, setea que va a mostrar el la ruta 
const swaggerUiExpressSetup = swaggerUiExpress.setup(spec)

module.exports={
  swaggerUiExpressServe,
  swaggerUiExpressSetup
}