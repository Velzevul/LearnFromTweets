angular.module('tweetsToSoftware')
  .directive('tweetList', function(TweetService, MenuService, FilterService,
                                   $timeout, $document, $rootScope) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweetList.html',
      scope: {},
      controller: function($scope) {
        $scope.activeId = null;
        $scope.filters = FilterService;

        TweetService.loaded
          .then(function() {
            $scope.tweets = TweetService.tweets;
          });

        $scope.activate = function(t) {
          $scope.activeId = t.id;
        };

        $scope.hasActiveCommand = function(tweet) {
          if (!$scope.filters.activeCommand) {
            return true;
          }

          return (tweet.menu.indexOf($scope.filters.activeCommand) !== -1) ||
                 (tweet.tools.indexOf($scope.filters.activeCommand) !== -1) ||
                 (tweet.panels.indexOf($scope.filters.activeCommand) !== -1);
        };

        $scope.resetActiveCommand = function() {
          $scope.filters.activeCommand = null;
        };

        var highlightTimeout,
            highlightDelay = 100;

        $scope.highlight = function() {
          clearTimeout(highlightTimeout);

          highlightTimeout = $timeout(function() {
            $scope.filters.activeCommandLocation.removeHighlights();
            $scope.filters.activeCommandLocation.close();

            $scope.filters.activeCommand.propagate(function(i) {
              i.isHighlighted = true;
            }, 'parents');
          }, highlightDelay).$$timeoutId;
        };

        $scope.removeHighlights = function() {
          clearTimeout(highlightTimeout);

          if ($rootScope.isOpen[$scope.filters.activeCommandLocation.name] == false) {
            $scope.filters.activeCommandLocation.removeHighlights();
            $scope.filters.activeCommandLocation.close()
          }
        };

        $scope.revealCommandLocation = function(e) {
          e.stopPropagation();

          MenuService.menu.close();
          MenuService.toolbar.close();
          MenuService.panelbar.close();

          $rootScope.isOpen[$scope.filters.activeCommandLocation.name] = true;

          $scope.filters.activeCommand.propagate(function(i) {
            i.isOpen = true;
          }, 'parents');
        };
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var isTweet = $(e.target).parents('.tweet').length ||
            $(e.target).hasClass('tweet');

          if (!isTweet) {
            $scope.activeId = null;
            $scope.$apply();
          }
        });
      }
    };
  });