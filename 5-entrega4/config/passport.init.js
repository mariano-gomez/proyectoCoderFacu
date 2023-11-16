require('dotenv').config({ path: './.env' })
const passport = require('passport')
const GitHubStrategy = require('passport-github2')
//const userManager = require('../dao/user.manager')
//const userManager = require('../dao/managersFileSystem/user.manager')
const { factoryManager } = require('./process.config')
const userManager = factoryManager.userManager
const cartManager = factoryManager.cartManager
const {
  LocalStrategy,
  signup,
  loginLocal,
  JWTstrategy,
  ExtractJwt,
} = require('./passport.strategies')
const DTOuser = require('../utils/dto.user')

const init = () => {
  /// options por default
  /// { usernamField: 'username', passwordField: 'password' }

  passport.use(
    'local-signup',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      signup
    )
  )

  passport.use(
    'local-login',
    new LocalStrategy({ usernameField: 'email' }, loginLocal)
  )

  // login con github
  //App ID: 384057
  passport.use(
    new GitHubStrategy(
      {
        //no los pongo en el .env para que may no tenga q modificar nada

        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/sessions/login/github/callback',
      },

      async (_accessToken, _refreshToken, profile, done) => {
        const email = profile._json.email
        const _user = await userManager.getByMail(email)

        if (!_user) {
          console.log('esa cuenta de github no esta registrada.')
          done(null, false)
          return
        }
        done(null, _user)
      }
    )
  )

  //logueo con JWT

  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter('token')
  opts.secretOrKey = process.env.SECRETO_JWT

  passport.use(
    new JWTstrategy(opts, async function (jwt_payload, done) {
      try {
        //console.log('payload desde passport: ', jwt_payload)
        const _user = await userManager.getByMail(jwt_payload.payload.email)
        if (_user) {
          done(null, _user)
          return
        } else {
          done(null, false)
          return
        }
      } catch (err) {
        return done(err, false)
      }
    })
  )

  // serelizador
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    //est o que esta comentado abajo, me parece mejor, pero lo comento para implementar un DTO
    //const user = await userManager.getByIdForPassport(id) //tuve que crear un metodo nuevo pq no puedo modificar el user, no se pq.
    //done(null, user)

    // no le veo la ventaja, pero lo implemento por la cosigna.
    const user2 = await userManager.getById(id)
    const user4 = await DTOuser.converter(user2)
    done(null, user4)
  })
}

module.exports = init
