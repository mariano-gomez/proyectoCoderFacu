
cree dos tipos de conexiones con DAO, el de Mongo y el de fileSystem.
a su vez con el DAO mongo hay dos posibilidades de conectar a 2 bases de datos (ecommerce o ecommerce_dev)
estas 3 posiblidades se manejan con el npm segun lo que esta en script en package.json.

  "dev": "nodemon server.js -m mongo" --> es el que venimos usando, con DAO mongo y BD:ecommerce
  "dev-mg-dev": "nodemon server.js -m mongo -db _dev"--> una variante, con DAO mongo y BD:ecommerce_dev como para poder cambiar de BD
  "dev-fs": "nodemon server.js -m fileSystem" -->cambia el DAO de productos y usa algo otra Base de datos de Mongo exclusiva para este caso

si bien el patron DAO puede no andar del todo bien, se implemento el factory, para pasar de uno a otro, esto esta implementado en el config>process.config.js


Se implemento un DTO, pero no es muy comodo.. la implementacion se hacer en el archivo passport.init.js, en 
la funcion passport.deserializeUser.. el problema es que en DTOuser, que esta en la carpeta "util", no se puede obtener el cartId, desde el userId, ya q no se puede resolver una promesa en el cosntructor, entonces, tengo q pasarle en la funcion del "deserializeUser" el cartId, y el User.. y ya para hacer es me parece mejor implementar directamente el metodo GetUserIfForPassport que tengo en el user.Manager.