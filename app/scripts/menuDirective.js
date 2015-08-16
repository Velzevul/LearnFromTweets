angular.module('tweetsToSoftware')
  .directive('topMenu', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'menu.html',
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
