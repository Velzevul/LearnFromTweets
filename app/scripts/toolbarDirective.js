angular.module('tweetsToSoftware')
  .directive('toolbar', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'toolbar.html',
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
