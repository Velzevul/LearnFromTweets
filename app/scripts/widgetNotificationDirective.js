angular.module('tweetsToSoftware')
    .directive('widgetNotification', function($timeout, MenuService, Notification) {
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

                $scope.show = function() {
                    clearTimeout(showTimeoutId);

                    showTimeoutId = $timeout(function() {
                        Notification.tweet = $scope.notification;

                        MenuService.hideAll();
                        MenuService.open($scope.notification.command.id);
                        MenuService.highlight($scope.notification.command.id);
                    }, showDelay).$$timeoutId;
                };

                $scope.hide = function() {
                    clearTimeout(showTimeoutId);
                }
            }
        }
    });