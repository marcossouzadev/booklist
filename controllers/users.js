'use strict'
//Resposta padrão para sucesso
const responseDefault = (data, statusCode) => ({
  data,
  statusCode,
});

//Resposta padrao para erros
const errorResponse = (error, codeStatus) => ({
  error,
  codeStatus,
});

class UsersController {
  constructor(Users) {
    this.Users = Users;
  }

  //Metodo CRUD
  getAll() {
    return this.Users.findAll({})
    .then(users => responseDefault(users, 200))
    .catch(error => errorResponse(error, 422));
  }

  getById(params) {
    return this.Users.findOne({ where: params })
    .then(user => responseDefault(user, 200))
    .catch(error => errorResponse(error, 422));
  }

  create(data) {
    data['password'] = "default";
    return this.Users.create(data)
    .then(user => responseDefault(user, 201))
    .catch(error => errorResponse(error, 422));
  }

  update(data, params) {
    return this.Users.update(data, { where: params })
    .then(user => responseDefault(user, 204))
    .catch(error => errorResponse(error, 422));
  }

  delete(params) {
    return this.Users.destroy({ where: params })
    .then(user => responseDefault(user, 204))
    .catch(error => errorResponse(error, 422));
  }
}
export default UsersController;
