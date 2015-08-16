angular.module('tweetsToSoftware')
  .directive('topMenu', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'menu.html',
      scope: {
        menu: '=',
        onItemActivate: '=',
        onItemHover: '=',
        onItemLeave: '=',
        onRootItemClick: '=',
        onRootItemHover: '=',
        onRootItemLeave: '='
      }
    };
  });
