angular.module('tweetsToSoftware')
  .directive('tweet', function(TweetService, MenuService, $timeout, $rootScope) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweet.html',
      replace: true,
      scope: {
        data: '=',
        active: '='
      },
      controller: function($scope) {
        var highlightTimeout,
            highlightDelay = 100;

        $scope.tweet = $scope.data.retweetedStatus || $scope.data;

        $scope.highlight = function(menu, id) {
          if ($scope.data.id == $scope.active) {
            clearTimeout(highlightTimeout);

            highlightTimeout = $timeout(function() {
              MenuService[menu].removeHighlights();
              MenuService[menu].close();

              MenuService[menu].byId[id].propagate(function(i) {
                i.isHighlighted = true;
              }, 'parents');
            }, highlightDelay).$$timeoutId;
          }
        };

        $scope.removeHighlights = function(menu) {
          if ($scope.data.id == $scope.active) {
            clearTimeout(highlightTimeout);

            if ($rootScope.isOpen[menu] == false) {
              MenuService[menu].removeHighlights();
              MenuService[menu].close()
            }
          }
        };

        $scope.open = function(menu, id, e) {
          if ($scope.data.id == $scope.active) {
            e.stopPropagation();

            MenuService.menu.close();
            MenuService.toolbar.close();
            MenuService.panelbar.close();

            $rootScope.isOpen[menu] = true;

            MenuService[menu].byId[id].propagate(function(i) {
              i.isOpen = true;
            }, 'parents');
          }
        };
      }
    }
  });