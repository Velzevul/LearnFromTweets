(function(window) {
  'use strict';

  var app = angular.module('tweetsToSoftware',
    [
      'app-templates',
      'angularMoment',
      'ngRoute',
      'truncate'
    ])
    .config(['$routeProvider', function($routeProvider){
      $routeProvider
          .when('/add-tweet',{
            templateUrl: "admin.html",
            controller: "adminController"
          })
          .when('/', {
            templateUrl: "app.html",
            controller: "mainController"
          })
          .otherwise({
            redirectTo: '/'
          });
    }]);

  window.app = app;
})(window);