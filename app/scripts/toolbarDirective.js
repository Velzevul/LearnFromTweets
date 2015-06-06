angular.module('tweetsToSoftware')
    .directive('toolbar', function(MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'toolbar.html',
            scope: {},
            controller: function($scope) {
                MenuService.loaded
                    .then(function() {
                        $scope.tools = MenuService.toolbar.all;
                    });
            }
        };
    });