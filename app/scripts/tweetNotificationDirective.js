angular.module('tweetsToSoftware')
    .directive('tweetNotification', function($timeout, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/tweetNotification.html',
            scope: {
                notification: '='
            },
            controller: function($scope) {
                $scope.active = false;

                $scope.activate = function() {
                    MenuService.hideAll();
                    MenuService.open($scope.notification.command);
                    MenuService.highlight($scope.notification.command);
                    $scope.active = true;
                };

                $scope.deactivate = function() {
                    $scope.active = false;
                };
            }
        }
    });