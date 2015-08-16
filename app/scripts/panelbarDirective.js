angular.module('tweetsToSoftware')
  .directive('panelbar', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'panelbar.html',
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