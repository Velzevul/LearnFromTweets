angular.module('tweetsToSoftware')
  .directive('menu', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'menu.html',
      scope: {
        menu: '=',
        onItemHover: '=',
        onItemClick: '=',
        onItemActivate: '='
      }
    };
  });
