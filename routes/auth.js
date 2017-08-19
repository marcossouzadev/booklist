'use stric'
import jwt from 'jwt-simple';

export default (app) => {
  //Import configs e model
  const config  = app.config;
  const User = app.datasource.models.user;

  //Rota de login para adquirir o token de acesso
  app.post('/token', (req, res) => {
    //Verifica se vem os dados na requesição
    if(req.body.login && req.body.password){
      //Pega valores do requisição
      const login = req.body.login;
      const password = req.body.password;
      //Localiza registro
      User.findOne({where: { login }})
      .then(user => {
        if(user.role && user.password === password){
          const payload = {id: user.id};
          res.json({
            name:user.name,
            token: jwt.encode(payload, config.jwtSecret)
          });
        }else{
          res.sendStatus(401);
        }
      })
      .catch(() => res.sendStatus(401));
    }else{
      res.sendStatus(401)
    }
  });
}
