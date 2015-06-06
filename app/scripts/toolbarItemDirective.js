angular.module('tweetsToSoftware')
    .directive('toolbarItem', function($document, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/toolbarItem.html',
            scope: {
                tool: '='
            },
            controller: function($scope) {
                $scope.openSubtools = function() {
                    MenuService.open($scope.tool, MenuService.toolbar);
                };
            },
            link: function($scope) {
                $document.on('click', function(e) {
                    var isTool = $(e.target).parents('.toolbar-item').length ||
                        $(e.target).hasClass('toolbar-item');

                    if (!isTool) {
                        MenuService.deactivate(MenuService.toolbar);
                        $scope.$apply()
                    }
                });
            }
        };
    });