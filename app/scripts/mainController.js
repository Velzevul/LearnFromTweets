angular.module('tweetsToSoftware')
  .controller('mainController', function(TweetService, MenuService, $scope) {
    'use strict';

    $scope.tweets = TweetService.tweets;
    $scope.menu = MenuService.menu;
    $scope.toolbar = MenuService.toolbar;
    $scope.panelbar = MenuService.panelbar;

    var openMenu = null;

    $scope.hoverMenuItem = function(menu, item) {
      if (openMenu === menu) {
        menu.close();
        menu.removeHighlights();

        item.propagate(function(i) {
          i.isOpen = true;
          i.isHighlighted = true;
        }, 'parents');
      }
    };

    $scope.clickMenuItem = function(menu, item) {
      if (openMenu !== menu) {
        item.propagate(function(i) {
          i.isOpen = true;
          i.isHighlighted = true;
        }, 'parents');

        $rootScope.isOpen['menu'] = true;
      } else {
        if (openMenu !== null) {
          MenuService.menu.close();
          MenuService.menu.removeHighlights();
        }

        $rootScope.isOpen['menu'] = false;
      }
    };


    TweetService.loaded
      .then(function() {
        console.log('tweets loaded!');
      });

    MenuService.loaded
      .then(function() {
        TweetService.tweets.mockCommands([
          MenuService.menu,
          MenuService.toolbar,
          MenuService.panelbar
        ]);
      });
  });