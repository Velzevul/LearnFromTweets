angular.module('tweetsToSoftware')
    .directive('panel', function($document, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'panel.html',
            scope: {
                panel: '='
            },
            controller: function($scope) {
                $scope.openPanel = function() {
                    MenuService.open($scope.panel, MenuService.panelbar);
                };
            },
            link: function($scope) {
                $document.on('click', function(e) {
                    var isPanel = $(e.target).parents('.panelbar-item').length ||
                            $(e.target).hasClass('panelbar-item');

                    if (!isPanel) {
                        MenuService.deactivate(MenuService.panelbar);
                        $scope.$apply()
                    }
                });
            }
        };
    });