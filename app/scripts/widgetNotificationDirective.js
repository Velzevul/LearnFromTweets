angular.module('tweetsToSoftware')
    .directive('widgetNotification', function($timeout, MenuService, TweetsFilter) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/widgetNotification.html',
            scope: {
                notification: '='
            },
            controller: function($scope) {
                var showTimeoutId = null,
                    showDelay = 50;

                $scope.showCommand = function() {
                    clearTimeout(showTimeoutId);

                    showTimeoutId = $timeout(function() {
                        MenuService.hideAll();
                        MenuService.open($scope.notification.command);
                        MenuService.highlight($scope.notification.command);
                    }, showDelay).$$timeoutId;
                };

                $scope.hideCommand = function() {
                    clearTimeout(showTimeoutId);
                }
            }
        }
    });