angular.module('tweetsToSoftware')
    .directive('widgetNotification', function($timeout, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/widgetNotification.html',
            scope: {
                notification: '='
            },
            controller: function($scope) {
                $scope.showCommand = function() {
                    MenuService.hideAll();
                    MenuService.open($scope.notification.command);
                    MenuService.highlight($scope.notification.command);
                };
            }
        }
    });