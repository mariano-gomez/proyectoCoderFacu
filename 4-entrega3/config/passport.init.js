const passport = require('passport')
const GitHubStrategy = require('passport-github2')
const userManager = require('../dao/user.manager')
const { LocalStrategy, signup, loginLocal } = require('./passport.strategies')

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
        clientID: 'Iv1.e9ca21c39d56db6f',
        clientSecret: '3a6d83123b1a785fa54f6ce1be7d76965ee918fd',
        callbackURL: 'http://localhost:8080/api/sessions/login/github/callback',
      },

       async(accessToken, refreshToken, profile, done) => {
        const email = profile._json.email
        const _user= await userManager.getByMail(email)
     
        if(!_user){
          console.log("esa cuenta de github no esta registrada.")
          done(null,false)
          return
        }
        done(null,_user)
      }
    )
  )

  passport.serializeUser((user, done) => {
    
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    
    const user = await userManager.getByIdForPassport(id) //tuve que crear un metodo nuevo pq no puedo modificar el user, no se pq.
    done(null, user)
  })
}

module.exports = init
