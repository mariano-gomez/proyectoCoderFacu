const passport = require('passport')
const logger = require('../logger')

function isAuthToken(req, res, next) {

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    // console.log('XXXXXXXXXXXXXXXXXX')
    // console.log(req)
    // console.log('XXXXXXXXXXXXXXXXXX')

    if (err) {
      // Manejo de errores
      return next(err)
    }
    
    if (!user) {
      // El usuario no está autenticado
      logger.http('token incorrecto - redireccionando a /login')
      res.cookie('previousErr', 'the supplyed token is not valid')
      return res.status(401).redirect('/login')
    }

    // El usuario está autenticado, puedes almacenar el usuario en el objeto de solicitud si lo deseas
    req.user = user

    // Continúa con el siguiente middleware o controlador
    next()
  })(req, res, next)
}

module.exports = isAuthToken




// La función de callback en Passport.js se utiliza para manejar el resultado de la autenticación. Las variables err, user e info son parámetros que se pasan a la función de callback y contienen información relevante sobre el resultado de la autenticación.

//     err: Esta variable contendrá cualquier error que se haya producido durante la autenticación. Si no hay errores, su valor será null o undefined.
//     user: Esta variable contendrá el objeto de usuario autenticado si la autenticación fue exitosa. Si el usuario no está autenticado, su valor será false o undefined.
//     info: Esta variable contiene información adicional sobre el resultado de la autenticación. Puede contener mensajes de error o información adicional proporcionada por la estrategia de autenticación.


// La documentación oficial de passport-jwt no proporciona una explicación detallada de estos parámetros en particular. Sin embargo, estos parámetros son parte del estándar de Passport.js y se utilizan en varias estrategias de autenticación.

// Puedes encontrar más información sobre estos parámetros y cómo manejarlos en la documentación general de Passport.js en el siguiente enlace: Passport.js Documentation

// Recuerda que Passport.js es una biblioteca muy flexible y modular, por lo que las estrategias de autenticación pueden variar en su implementación y en los parámetros que se pasan a la función de callback. Es importante consultar la documentación específica de la estrategia de autenticación que estés utilizando para obtener más detalles sobre los parámetros específicos de la función de callback.

// Espero que esta explicación te ayude a comprender mejor la función de callback y los parámetros err, user e info en Passport.js. Si tienes alguna otra pregunta, no dudes en preguntar.