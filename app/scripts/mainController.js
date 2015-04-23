angular.module('tweetsToSoftware')
    .controller('mainController', function($scope, MenuService) {
        'use strict';

        $scope.highlight = function(itemLabel) {
            MenuService.activate(itemLabel);
            MenuService.highlight(itemLabel);
        };
    });