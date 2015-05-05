angular.module('tweetsToSoftware')
    .directive('menuPopup', function($timeout, DataService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/menuPopup.html',
            scope: {
                context: '='
            },
            controller: function($scope) {
                $scope.filters = DataService.getFilters();
                $scope.popupVisible = false;

                DataService.getTweets($scope.context.id)
                    .then(function(response) {
                         $scope.tweets = response;
                    });

                $scope.$on('filtersChanged', function() {
                    DataService.getTweets($scope.context.id)
                        .then(function(response) {
                            $scope.tweets = response;
                        });
                });

                var showTimeoutId = null,
                    hideTimeoutId = null,
                    showDelay = 300,
                    hideDelay = 20;

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