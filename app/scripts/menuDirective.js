angular.module('tweetsToSoftware')
  .directive('menu', function(FilterService, $document) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'menu.html',
      scope: {
        menu: '=',
        openMenu: '='
      },
      controller: function($scope) {
        $scope.hoverOpen = function(menuItem) {
          if ($scope.openMenu == 'menu') {
            MenuService.menu.close();
            MenuService.menu.removeHighlights();

            menuItem.propagate(function(i) {
              i.isOpen = true;
              i.isHighlighted = true;
            }, 'parents');
          }
        };

        $scope.clickOpen = function(menuItem) {
          if (!$rootScope.isOpen['menu']) {
            menuItem.propagate(function(i) {
              i.isOpen = true;
              i.isHighlighted = true;
            }, 'parents');

            $rootScope.isOpen['menu'] = true;
          } else if (menuItem.isOpen) {
            MenuService.menu.close();
            MenuService.menu.removeHighlights();
            $rootScope.isOpen['menu'] = false;
          }
        };

        $scope.showTweetsFor = function(item) {
          if (item.children.length == 0) {
            FilterService.activeCommand = item;
            FilterService.activeCommandLocation = MenuService.menu;
          }
        };
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var isMenu = $(e.target).parents('.menu').length ||
            $(e.target).hasClass('menu');

          if (!isMenu) {
            MenuService.menu.close();
            MenuService.menu.removeHighlights();
            $rootScope.isOpen['menu'] = false;
            $scope.$apply();
          }
        });
      }
    };
  });
