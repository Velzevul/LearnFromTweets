angular.module('tweetsToSoftware')
    .directive('menu', function(MenuService, $timeout) {
       'use strict';

        return {
            restrict: 'E',
            templateUrl: 'scripts/templates/menu.html',
            scope: {},
            controller: function($scope) {
                $scope.data = MenuService.get();

                $scope.activate = MenuService.activate;
                $scope.deactivate = MenuService.deactivate;
            }
        };
    });