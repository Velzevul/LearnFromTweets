angular.module('tweetsToSoftware')
    .directive('notificationPopup', function($timeout) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/notificationPopup.html',
            scope: {
                tweet: '='
            },
            controller: function($scope) {
                var hideTimeoutId = null,
                    showTimeoutId = null;

                $scope.visible = false;

                $scope.showPopup = function() {
                    clearTimeout(showTimeoutId);
                    clearTimeout(hideTimeoutId);

                    showTimeoutId = $timeout(function() {
                        $scope.visible = true;
                    }, 500).$$timeoutId;
                };

                $scope.hidePopup = function() {
                    clearTimeout(showTimeoutId);
                    clearTimeout(hideTimeoutId);

                    hideTimeoutId = $timeout(function() {
                        $scope.visible = false;
                    }, 100).$$timeoutId;
                };
            }
        }
    });