angular.module('tweetsToSoftware')
    .directive('historyPopup', function($timeout) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/historyPopup.html',
            scope: {
                tweets: '='
            },
            controller: function($scope) {
                var hideTimeoutId = null,
                    showTimeoutId = null;

                $scope.visible = false;

                $scope.showPopup = function() {
                    clearTimeout(hideTimeoutId);

                    showTimeoutId = $timeout(function() {
                        $scope.visible = true;
                    }, 500).$$timeoutId;
                };

                $scope.hidePopup = function() {
                    clearTimeout(showTimeoutId);

                    hideTimeoutId = $timeout(function() {
                        $scope.visible = false;
                    }, 50).$$timeoutId;
                };
            }
        }
    });