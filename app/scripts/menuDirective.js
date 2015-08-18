angular.module('tweetsToSoftware')
  .directive('topMenu', function($document) {
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
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var targetIsMenu =  $(e.target).parents('.js-top-menu').length ||
                              $(e.target).hasClass('js-top-menu');

          if ($scope.menu.isOpen && !targetIsMenu) {
            console.log('menu close');
            $scope.menu.close();
            $scope.$apply();
          }
        });
      }
    };
  });
