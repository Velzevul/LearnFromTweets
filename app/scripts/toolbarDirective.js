angular.module('tweetsToSoftware')
  .directive('toolbar', function($document) {
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
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var targetIsMenu =  $(e.target).parents('.js-toolbar').length ||
                              $(e.target).hasClass('js-toolbar');

          if ($scope.menu.isOpen && !targetIsMenu) {
            console.log('toolbar close');
            $scope.menu.close();
            $scope.$apply();
          }
        });
      }
    };
  });
