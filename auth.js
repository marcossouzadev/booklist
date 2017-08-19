'use strict'
import passport from 'passport';
import {Strategy, ExtractJwt} from 'passport-jwt';

export default (app) => {
  //importacao da model de usuários
  const User = app.datasource.models.user;
  //Opções esperadas pelo passport
  const opts = {};
  opts.secretOrKey = app.config.jwtSecret;
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();

  //Estrategia de Json web Token
  const strategy = new Strategy(opts, (payload, done) => {
    User.findById(payload.id)
    .then(user => {
      if(user){
        return done(null, {
          id: user.id,
          login: user.login,
        });
      }
      return done(null, false);
    })
    .catch(error => done(error, null));
  });

  //Diz ao passport pra usar a estrategia criada
  passport.use(strategy);

  return{
    initialize: () => passport.initialize(),
    authenticate: () => passport.authenticate('jwt', app.config.jwtSession),
  };
};
