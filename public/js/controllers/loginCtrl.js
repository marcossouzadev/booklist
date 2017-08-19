angular.module('Book').controller('loginCtrl', function($scope, $http, config){
  $scope.info = config.info;
  $scope.logar = function(login, senha){
    if(login && senha){
      var usuario = {
        'login': login.trim(),
        'password': senha.trim(),
      }
      $http.post(config.baseUrl + '/token', usuario)
        .then(function(data){
          sessionStorage.setItem('token_id', data.data.token);
          sessionStorage.setItem('usuario_atual', data.data.name);
          window.location.assign(config.baseUrl + '/admin');
        })
        .catch(function(err){
          alert("Usuario e/ou senha incorretos.Tente novamente!");
        })
    }else{
      alert("Nescessario informar usuário e senha!!");
    }
  }
});
