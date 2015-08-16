angular.module('tweetsToSoftware')
  .directive('panelbar', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'panelbar.html',
      scope: {
        menu: '=',
        itemActivateCallback: '=',
        itemHoverCallback: '=',
        itemLeaveCallback: '=',
        rootItemClickCallback: '=',
        rootItemHoverCallback: '=',
        rootItemLeaveCallback: '='
      }
    };
  });