angular.module('tweetsToSoftware')
  .directive('panelbar', function(rootPrefix, $document) {
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
      },
      controller: function($scope) {
        $scope.rootPrefix = rootPrefix;
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var targetIsMenu =  $(e.target).parents('.js-panelbar').length ||
                              $(e.target).hasClass('js-panelbar');

          if ($scope.menu.isOpen && !targetIsMenu) {
            console.log('panelbar close');
            $scope.menu.close();
            $scope.$apply();
          }
        });
      }
    };
  });