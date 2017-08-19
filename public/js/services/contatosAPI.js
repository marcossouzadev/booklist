angular.module('Book').service('contatosAPI', function($http, config){
  var _get_contatos = function(){
    return $http.get(config.baseUrl +'/users');
  }

  var _get_contato_by_id = function(id){
    return $http.get(config.baseUrl +'/users/' +id);
  }

  var _add_contato = function(contato){
    return $http.post(config.baseUrl +'/users', contato);
  }

  var _update_contato = function(contato, id){
    return $http.put(config.baseUrl +'/users/'+id, contato);
  }

  var _remove_contato = function(id){
    return $http.delete(config.baseUrl +'/users/' + id);
  }

  return{
    getContatos: _get_contatos,
    getContatoById: _get_contato_by_id,
    addContato: _add_contato,
    atualizaContato: _update_contato,
    removeContato: _remove_contato,
  }
});
