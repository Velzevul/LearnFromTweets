angular.module('tweetsToSoftware')
  .controller('mainController', function(TweetService, MenuService, $scope) {
    'use strict';

    $scope.tweets = TweetService.tweets;
    $scope.menu = MenuService.menu;
    $scope.toolbar = MenuService.toolbar;
    $scope.panelbar = MenuService.panelbar;

    var openMenu = null,
        activeMenu = null,
        activeItem = null;

    $scope.itemHoverCallback = function(menu, item) {
      if (openMenu === menu) {
        menu.close().removeHighlights();

        item.propagate(function(i) {
          i.isOpen = true;
          i.isHighlighted = true;
        }, 'parents');
      }
    };

    $scope.itemClickCallback = function(menu, item) {
      if (openMenu !== menu) {
        console.log('click open');
        if (openMenu) {
          openMenu.close().removeHighlights();
        }

        item.propagate(function(i) {
          i.isOpen = true;
          i.isHighlighted = true;
        }, 'parents');

        openMenu = menu;
      } else if (item.parents.length === 0) {
        console.log('click close');
        openMenu.close().removeHighlights();
        openMenu = null;
      }
    };

    $scope.itemActivateCallback = function(menu, item, event) {
      if (item.children.length === 0) {
        event.stopPropagation();

        console.log('activate');
        activeItem = item;
        activeMenu = menu;

        if (openMenu) {
          openMenu.close().removeHighlights();
          openMenu = null;
        }
      }
    };

    $scope.hideMenus = function() {
      $scope.menu.close().removeHighlights();
      $scope.panelbar.close().removeHighlights();
      $scope.toolbar.close().removeHighlights();

      openMenu = null;
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