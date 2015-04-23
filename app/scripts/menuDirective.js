angular.module('tweetsToSoftware')
    .directive('menu', function(MenuService, $timeout) {
       'use strict';

        return {
            restrict: 'E',
            templateUrl: 'scripts/templates/menu.html',
            scope: {},
            controller: function($scope) {
                $scope.menuItems = MenuService.get();
                //MenuService.activate('Cut');

                $scope.activate = MenuService.activate;
                $scope.deactivate = MenuService.deactivate;
            }
        };
    });