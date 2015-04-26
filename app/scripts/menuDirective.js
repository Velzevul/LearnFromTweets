angular.module('tweetsToSoftware')
    .directive('menu', function(MenuService, $document) {
       'use strict';

        return {
            restrict: 'E',
            templateUrl: 'scripts/templates/menu.html',
            scope: {},
            controller: function($scope) {
                $scope.data = MenuService.get();

                $scope.activate = MenuService.activate;
            },
            link: function($scope, elem) {
                $document.on('click', function() {
                    MenuService.deactivate();
                    $scope.$apply()
                });
            }
        };
    });