angular.module('tweetsToSoftware')
  .directive('toolbar', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'toolbar.html',
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
