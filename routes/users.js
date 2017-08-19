'use stric'
import UsersCtrl from '../controllers/users';

//Recebe app e exporta as rotas
export default (app) => {
  //Instancia controler passando a model por parametro.
  const usersCtrl = new UsersCtrl(app.datasource.models.user);

  //Rotas
  app.route('/list')
  .get((req, res) => {
    usersCtrl.getAll()
    .then(response => res.json(response.data))
    .catch(() => res.sendStatus(204));
  });

  app.route('/users')
  .all(app.auth.authenticate())
  .get((req, res) => {
    usersCtrl.getAll()
    .then(response => res.json(response.data))
    .catch(() => res.sendStatus(204));
  });

  app.route('/users')
  .all(app.auth.authenticate())
  .post((req, res) => {
    usersCtrl.create(req.body)
    .then(response => res.json(response))
    .catch(() => res.sendStatus(204));
  });


  app.route('/users/:id')
  .all(app.auth.authenticate())
  .get((req, res) => {
    usersCtrl.getById(req.params)
    .then(response => res.json(response.data))
    .catch(() => res.sendStatus(204));
  })
  .put((req, res) => {
    usersCtrl.update(req.body, req.params)
    .then(response => res.json(response))
    .catch(() => res.sendStatus(204));
  })
  .delete((req, res) => {
    usersCtrl.delete(req.params)
    .then(response => res.sendStatus(200))
    .catch(() => res.sendStatus(204));
  })
}
