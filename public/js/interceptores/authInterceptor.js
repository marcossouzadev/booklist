angular.module('Book').factory('authInterceptor', function($rootScope, $q){
  return{
    request: function(config){
      config.headers = config.headers || {};
      if(sessionStorage.getItem('token_id')){
        config.headers.Authorization = 'JWT ' + sessionStorage.getItem('token_id');
      }
      return config;
    },
    response: function(response){
      if(response.status === 401){
        alert("Usuário não autorizado!!")
      }
      return response || $q.when(response)
    }
  }
});
