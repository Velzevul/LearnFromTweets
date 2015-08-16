angular.module('tweetsToSoftware')
  .controller('mainController', function(TweetService, MenuService, $scope, $q) {
    'use strict';

    $scope.tweets = TweetService.tweets;
    $scope.menu = MenuService.menu;
    $scope.toolbar = MenuService.toolbar;
    $scope.panelbar = MenuService.panelbar;

    $scope.activeMenu = null;
    $scope.activeItem = null;
    $scope.activeTweetId = null;

    $scope.deactivateItem = function() {
      $scope.activeMenu = null;
      $scope.activeItem = null;
      $scope.activeTweetId = null;
      $scope.tweets.resetFilter();
      resetCounters();
    };

    /**
     * common for all menus
     */
    $scope.activateItem = function(menu, item, event) {
      if (item.children.length === 0) {
        event.stopPropagation();

        $scope.menu.close();
        $scope.panelbar.close();
        $scope.toolbar.close();

        $scope.activeMenu = menu;
        $scope.activeItem = item;
        $scope.activeTweetId = null;

        $scope.tweets.filter($scope.activeMenu.name, $scope.activeItem);
        resetCounters();
      }
    };

    $scope.itemHoverHandler = function(menu, item) {
      if (menu.lastOpenItem) {
        menu.lastOpenItem.dim().close();
      }

      item.highlight().open();
      menu.lastOpenItem = item;
    };

    $scope.itemLeaveHandler = function(item) {
      if (item.children.length === 0) {
        item.isHighlighted = false;
      }
    };

    $scope.rootItemHoverHandler = function(menu, rootItem) {
      if (menu.lastOpenItem) {
        menu.lastOpenItem.dim().close();
      }

      rootItem.highlight();
      if (menu.isOpen) {
        rootItem.open();
      }

      menu.lastOpenItem = rootItem;
    };

    $scope.rootItemClickHandler = function(menu, rootItem) {
      if (menu.isOpen) {
        menu.isOpen = false;
        rootItem.close();
      } else {
        $scope.menu.close();
        $scope.toolbar.close();
        $scope.panelbar.close();

        rootItem.open();
        menu.isOpen = true;
      }
    };

    $scope.rootItemLeaveHandler = function(menu, rootItem) {
      if (!menu.isOpen) {
        rootItem.isHighlighted = false;
      }
    };

    $scope.reset = function() {
      $scope.menu.close();
      $scope.toolbar.close();
      $scope.panelbar.close();

      $scope.activeTweetId = null;
    };

    function resetCounters() {
      var processedTweetIds = {};

      $scope.menu.resetCounters();
      $scope.panelbar.resetCounters();
      $scope.toolbar.resetCounters();

      $scope.tweets.filtered.forEach(function(t) {
        var tweet = t.retweeted_status || t;

        // avoid processing retweets multiple times
        if (processedTweetIds[t.id] === undefined) {
          processedTweetIds[t.id] = true;

          ['menu', 'toolbar', 'panelbar'].forEach(function(menuName) {
            t[menuName].forEach(function(item) {
              item.increaseCounter();
            });
          });
        }
      });
    }

    $q.all([
      TweetService.loaded,
      MenuService.loaded
    ])
      .then(function() {
        console.log('tweets loaded!');

        $scope.tweets.mockCommands([
          $scope.menu,
          $scope.toolbar,
          $scope.panelbar
        ]);

        resetCounters();
      });
  });