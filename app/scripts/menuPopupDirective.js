angular.module('tweetsToSoftware')
    .directive('menuPopup', function($timeout, TweetService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/menuPopup.html',
            scope: {
                context: '='
            },
            controller: function($scope) {
                $scope.tweets = [];
                $scope.popupVisible = false;

                var showTimeoutId = null,
                    hideTimeoutId = null,
                    showDelay = 300,
                    hideDelay = 20;

                TweetService.get($scope.context.id)
                    .then(function(data) {
                        $scope.tweets = data;
                    });

                $scope.show = function() {
                    clearTimeout(showTimeoutId);
                    clearTimeout(hideTimeoutId);

                    showTimeoutId = $timeout(function() {
                        $scope.popupVisible = true;
                    }, showDelay).$$timeoutId;
                };

                $scope.hide = function() {
                    clearTimeout(showTimeoutId);
                    clearTimeout(hideTimeoutId);

                    hideTimeoutId = $timeout(function() {
                        $scope.popupVisible = false;
                    }, hideDelay).$$timeoutId;
                };
            }
        };
    });