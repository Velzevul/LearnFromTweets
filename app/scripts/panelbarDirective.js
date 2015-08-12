angular.module('tweetsToSoftware')
  .directive('panelbar', function(MenuService, $rootScope, $document) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'panelbar.html',
      scope: {},
      controller: function($scope) {
        if (typeof $rootScope.isOpen == 'undefined') {
          $rootScope.isOpen = [];
        }
        $rootScope.isOpen['panelbar'] = false;

        MenuService.loaded
          .then(function() {
            $scope.panels = MenuService.panelbar.all;
          });

        $scope.hoverOpen = function(panel) {
          if ($rootScope.isOpen['panelbar']) {
            MenuService.panelbar.close();
            MenuService.panelbar.removeHighlights();

            panel.propagate(function(i) {
              i.isOpen = true;
              i.isHighlighted = true;
            }, 'parents');
          }
        };

        $scope.clickOpen = function(panel) {
          if (!$rootScope.isOpen['panelbar']) {
            panel.propagate(function(i) {
              i.isOpen = true;
              i.isHighlighted = true;
            }, 'parents');

            $rootScope.isOpen['panelbar'] = true;
          } else if (panel.isOpen) {
            MenuService.panelbar.close();
            MenuService.panelbar.removeHighlights();
            $rootScope.isOpen['panelbar'] = false;
          }
        };
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var isPanelbar = $(e.target).parents('.toolbar').length ||
            $(e.target).hasClass('toolbar');

          if (!isPanelbar) {
            MenuService.panelbar.close();
            MenuService.panelbar.removeHighlights();
            $rootScope.isOpen['panelbar'] = false;
            $scope.$apply();
          }
        });
      }
    }
  });