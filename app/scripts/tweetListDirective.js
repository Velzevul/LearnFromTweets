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
        deactivateCallback: '='
      },
      controller: function($scope) {
        var highlightTimeout,
            highlightDelay = 50,
            lastOpenItem = null;

        // "opens" tweet and makes it "active", so that user can
        // interact with the command links in it
        $scope.activateTweet = function(t) {
          $scope.activeTweetId = t.id;
        };

        $scope.highlightCommand = function(menuName, commandId) {
          clearTimeout(highlightTimeout);
          highlightTimeout = $timeout(function() {
            var menu = MenuService[menuName],
                item = menu.byId[commandId];

            MenuService.menu.close();
            MenuService.panelbar.close();
            MenuService.toolbar.close();

            menu.lastOpenItem = item;
            item.highlight();
          }, highlightDelay).$$timeoutId;
        };

        $scope.dimCommand = function(menuName, commandId) {
          clearTimeout(highlightTimeout);
        };

        $scope.revealCommandLocation = function(menuName, commandId, event) {
          clearTimeout(highlightTimeout);
          event.stopPropagation();

          var menu = MenuService[menuName],
              item = menu.byId[commandId];

          item.open();
          menu.isOpen = true;
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