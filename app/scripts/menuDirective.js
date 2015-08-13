angular.module('tweetsToSoftware')
  .directive('menu', function($q, $document, MenuService, $rootScope) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'menu.html',
      scope: {},
      controller: function($scope) {
        if (typeof $rootScope.isOpen == 'undefined') {
          $rootScope.isOpen = [];
        }
        $rootScope.isOpen['menu'] = false;

        MenuService.loaded
          .then(function() {
            $scope.menuItems = MenuService.menu.all;
          });

        $scope.hoverOpen = function(menuItem) {
          if ($rootScope.isOpen['menu']) {
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
          console.log('showing tweets for ' + item.label);
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
