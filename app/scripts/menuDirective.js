angular.module('tweetsToSoftware')
    .directive('menu', function(MenuService, $timeout) {
       'use strict';

        return {
            restrict: 'E',
            templateUrl: 'scripts/templates/menu.html',
            scope: {

            },
            controller: function($scope) {
                $timeout(function() {
                    $scope.structure = MenuService.get();
                    MenuService.activate('Cut');
                }, 100);
            }
        };
    });