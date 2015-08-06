angular.module('tweetsToSoftware')
  .directive('menu', function($q, $document, MenuService, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'menu.html',
      scope: {},
      controller: function($scope) {
        $scope.menuOpen = false;

        MenuService.loaded
          .then(function() {
            $scope.menuItems = MenuService.menu.all;
          });

        $scope.hoverOpen = function(menuItem) {
          if ($scope.menuOpen) {
            MenuService.menu.close();

            menuItem.propagate(function(i) {
              i.isOpen = true;
            }, 'parents');
          }
        };

        $scope.clickOpen = function(menuItem) {
          if (!$scope.menuOpen) {
            menuItem.propagate(function(i) {
              i.isOpen = true;
            }, 'parents');

            $scope.menuOpen = true;
          }
        }
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var isMenu = $(e.target).parents('.menu').length ||
            $(e.target).hasClass('menu');

          if (!isMenu) {
            MenuService.menu.close();
            $scope.menuOpen = false;
            $scope.$apply();
          }
        });
      }
    };
  });
