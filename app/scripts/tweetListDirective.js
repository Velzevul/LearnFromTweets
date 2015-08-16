angular.module('tweetsToSoftware')
  .directive('tweetList', function(FilterService, MenuService, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweetList.html',
      scope: {
        tweets: '=',
        activeTweetId: '=',
        activeItem: '=',
        activeMenu: '=',
        //onItemClick: '=',
        onItemReset: '=',
        onTweetActivate: '='
      },
      controller: function($scope) {
        var highlightTimeout,
            highlightDelay = 100;

        // "opens" tweet and makes it "active", so that user can
        // interact with the command links in it
        $scope.tweetClickCallback = function(t, e) {
          e.stopPropagation();
          $scope.activeTweetId = t.id;
        };

        // remove all previous highlights, close menus, and
        // highlight hovered command in the interface
        $scope.mouseOverCommandCallback = function(menuName, commandId) {
          clearTimeout(highlightTimeout);
          highlightTimeout = $timeout(function() {
            MenuService.closeAll();

            MenuService[menuName].byId[commandId].propagate(function(i) {
              i.isHighlighted = true;
            }, 'parents');
          }, highlightDelay).$$timeoutId;
        };

        $scope.hoverEndCommandCallback = function(menuName) {
          clearTimeout(highlightTimeout);

          if ($scope.activeMenu !== menuName) {
            MenuService[menuName].removeHighlights().close();
          }
        };

        $scope.clickCommandCallback = function(menuName, commandId, e) {
          e.stopPropagation();
          MenuService.closeAll();
          $scope.activeMenu = menuName;

          MenuService[menuName].byId[commandId].propagate(function(i) {
            i.isHighlighted = true;
            i.isOpen = true;
          }, 'parents');
        };



        //$scope.hasActiveCommand = function(tweet) {
        //  if (!$scope.filters.activeCommand) {
        //    return true;
        //  }
        //
        //  return (tweet.menu.indexOf($scope.filters.activeCommand) !== -1) ||
        //         (tweet.tools.indexOf($scope.filters.activeCommand) !== -1) ||
        //         (tweet.panels.indexOf($scope.filters.activeCommand) !== -1);
        //};

        //$scope.resetActiveCommand = function() {
        //  $scope.filters.activeCommand = null;
        //};

        //$scope.highlight = function() {
        //  clearTimeout(highlightTimeout);
        //
        //  highlightTimeout = $timeout(function() {
        //    $scope.filters.activeCommandLocation.removeHighlights();
        //    $scope.filters.activeCommandLocation.close();
        //
        //    $scope.filters.activeCommand.propagate(function(i) {
        //      i.isHighlighted = true;
        //    }, 'parents');
        //  }, highlightDelay).$$timeoutId;
        //};

        //$scope.removeHighlights = function() {
        //  clearTimeout(highlightTimeout);
        //
        //  if ($rootScope.isOpen[$scope.filters.activeCommandLocation.name] == false) {
        //    $scope.filters.activeCommandLocation.removeHighlights();
        //    $scope.filters.activeCommandLocation.close()
        //  }
        //};

        //$scope.revealCommandLocation = function(e) {
        //  e.stopPropagation();
        //
        //  MenuService.menu.close();
        //  MenuService.toolbar.close();
        //  MenuService.panelbar.close();
        //
        //  $rootScope.isOpen[$scope.filters.activeCommandLocation.name] = true;
        //
        //  $scope.filters.activeCommand.propagate(function(i) {
        //    i.isOpen = true;
        //  }, 'parents');
        //};
      }
    };
  });