angular.module('tweetsToSoftware')
  .directive('tweet', function(MenuService, $rootScope) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweet.html',
      replace: true,
      scope: {
        data: '='
      },
      controller: function($scope) {
        $scope.tweet = $scope.data.retweetedStatus || $scope.data;

        $scope.highlight = function(menu, id) {
          $scope.removeHighlights(menu);

          MenuService[menu].byId[id].propagate(function(i) {
            i.isHighlighted = true;
          }, 'parents');
        };

        $scope.removeHighlights = function(menu, id) {
          if (typeof id == 'undefined' ||
              MenuService[menu].byId[id].isOpen == false) {
            MenuService[menu].removeHighlights();
            MenuService[menu].close()
          }
        };

        $scope.open = function(menu, id, e) {
          e.stopPropagation();

          MenuService.menu.close();
          MenuService.toolbar.close();
          MenuService.panelbar.close();

          $rootScope.isOpen[menu] = true;

          MenuService[menu].byId[id].propagate(function(i) {
            i.isOpen = true;
          }, 'parents');
        };
      }
    }
  });