angular.module('tweetsToSoftware')
  .directive('tweetList', function(FilterService, MenuService,
                                   $document, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweetList.html',
      scope: {
        tweets: '='
      },
      controller: function($scope) {
        var highlightTimeout,
            highlightDelay = 50;

        $scope.filters = FilterService;

        $scope.activateTweet = function(tweet) {
          $scope.filters.activeTweetId = tweet.id;
        };

        $scope.resetCommandFilter = function() {
          $scope.filters.selectedCommand = null;
          $scope.filters.selectedMenu = null;
        };

        $scope.highlightCommand = function(menuName, commandId) {
          clearTimeout(highlightTimeout);
          highlightTimeout = $timeout(function() {
            var menu = MenuService[menuName],
                item = menu.byId[commandId];

            MenuService.menu.close();
            MenuService.panelbar.close();
            MenuService.toolbar.close();

            item.highlight();
          }, highlightDelay).$$timeoutId;
        };

        $scope.dimCommand = function(menuName, commandId) {
          clearTimeout(highlightTimeout);

          var menu = MenuService[menuName],
              item = menu.byId[commandId];

          if (!item.isOpen) {
            item.isHighlighted = false;
          }
        };

        $scope.revealCommandLocation = function(menuName, commandId, event) {
          clearTimeout(highlightTimeout);
          event.stopPropagation();

          var menu = MenuService[menuName],
              item = menu.byId[commandId];

          item.open();
          menu.isOpen = true;
        };
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var isTweet = $(e.target).parents('.js-tweet').length ||
                        $(e.target).hasClass('js-tweet'),
              isMenu  = $(e.target).parents('.js-menu').length ||
                        $(e.target).hasClass('js-menu');

          if (!isTweet && !isMenu) {
            $scope.filters.activeTweetId = null;
            $scope.$apply();
          }
        });
      }
    };
  });