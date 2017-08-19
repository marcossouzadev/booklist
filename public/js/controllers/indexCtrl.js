angular.module('Book').controller('indexCtrl', function($scope, $http, config){
  $scope.info = config.info;
  //Retorna lista de contatos
  var getContatos = function(){
    $http.get(config.baseUrl +'/list')
    .then(function(res){
      $scope.contatos = res.data;
    })
    .catch(function(res){
      alert(res.error);
    });
  };
  getContatos();
});
