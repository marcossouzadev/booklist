angular.module('Book').config(function($httpProvider){
  $httpProvider.interceptors.push('authInterceptor');
});
