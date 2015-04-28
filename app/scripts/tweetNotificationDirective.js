angular.module('tweetsToSoftware')
    .directive('tweetNotification', function($timeout) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/tweetNotification.html',
            scope: {
                notification: '='
            },
            controller: function($scope) {
                var showTimeoutId = null,
                    hidetimeoutId = null,
                    showDelay = 200,
                    hideDelay = 50;

                $scope.active = false;

                $scope.activate = function() {
                    clearTimeout(showTimeoutId);
                    clearTimeout(hidetimeoutId);

                    showTimeoutId = $timeout(function() {
                        $scope.active = true;
                    }, showDelay).$$timeoutId;
                };

                $scope.deactivate = function() {
                    clearTimeout(showTimeoutId);
                    clearTimeout(hidetimeoutId);

                    hidetimeoutId = $timeout(function() {
                        $scope.active = false;
                    }, hideDelay).$$timeoutId;
                };
            }
        }
    });