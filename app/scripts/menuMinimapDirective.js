angular.module('tweetsToSoftware')
    .directive('menuMinimap', function(MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/menuMinimap.html',
            scope: {},
            controller: function($scope) {
                MenuService.get()
                    .then(function(data) {
                        $scope.menu = data;
                    });
            }
        };
    });