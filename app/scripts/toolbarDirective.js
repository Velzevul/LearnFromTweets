angular.module('tweetsToSoftware')
  .directive('toolbar', function(MenuService, $document) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'toolbar.html',
      scope: {},
      controller: function($scope) {
        $scope.menuOpen = false;

        MenuService.loaded
          .then(function() {
            $scope.tools = MenuService.toolbar.all;
          });

        $scope.hoverOpen = function(tool) {
          if ($scope.menuOpen) {
            MenuService.toolbar.close();

            tool.propagate(function(i) {
              i.isOpen = true;
            }, 'parents');
          }
        };

        $scope.clickOpen = function(tool) {
          if (!$scope.menuOpen) {
            tool.propagate(function(i) {
              i.isOpen = true;
            }, 'parents');

            $scope.menuOpen = true;
          } else if (tool.isOpen) {
            MenuService.toolbar.close();
            $scope.menuOpen = false;
          }
        };
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var isToolbar = $(e.target).parents('.toolbar').length ||
            $(e.target).hasClass('toolbar');

          if (!isToolbar) {
            MenuService.toolbar.close();
            $scope.menuOpen = false;
            $scope.$apply();
          }
        });
      }
    };
  });
