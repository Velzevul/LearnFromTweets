angular.module('tweetsToSoftware')
  .directive('toolbar', function(MenuService, $document, $rootScope) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'toolbar.html',
      scope: {},
      controller: function($scope) {
        if (typeof $rootScope.isOpen == 'undefined') {
          $rootScope.isOpen = [];
        }
        $rootScope.isOpen['toolbar'] = false;

        MenuService.loaded
          .then(function() {
            $scope.tools = MenuService.toolbar.all;
          });

        $scope.hoverOpen = function(tool) {
          if ($rootScope.isOpen['toolbar']) {
            MenuService.toolbar.close();
            MenuService.toolbar.removeHighlights();

            tool.propagate(function(i) {
              i.isOpen = true;
              i.isHighlighted = true;
            }, 'parents');
          }
        };

        $scope.clickOpen = function(tool) {
          if (!$rootScope.isOpen['toolbar']) {
            tool.propagate(function(i) {
              i.isOpen = true;
              i.isHighlighted = true;
            }, 'parents');

            $rootScope.isOpen['toolbar'] = true;
          } else if (tool.isOpen) {
            MenuService.toolbar.close();
            MenuService.toolbar.removeHighlights();
            $rootScope.isOpen['toolbar'] = false;
          }
        };
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var isToolbar = $(e.target).parents('.toolbar').length ||
            $(e.target).hasClass('toolbar');

          if (!isToolbar) {
            MenuService.toolbar.close();
            MenuService.toolbar.removeHighlights();
            $rootScope.isOpen['toolbar'] = false;
            $scope.$apply();
          }
        });
      }
    };
  });
