angular.module('tweetsToSoftware')
    .directive('menuPopup', function($timeout, filterFilter, TweetService, FilterService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/menuPopup.html',
            scope: {
                context: '='
            },
            controller: function($scope) {
                $scope.filters = FilterService.get();
                $scope.matchTweet = FilterService.matchTweet;
                $scope.popupVisible = false;

                function filter() {
                    $scope.filtered = filterFilter($scope.tweets, FilterService.matchTweet);
                }

                TweetService.getByCommand($scope.context.id)
                    .then(function(response) {
                        $scope.tweets = response;
                        filter();
                    });

                $scope.$watchGroup([
                    'filters.highlightRelevant',
                    'filters.highlightUnfamiliar',
                    'filters.author',
                    'filters.time'
                ], filter);

                var showTimeoutId = null,
                    hideTimeoutId = null,
                    showDelay = 300,
                    hideDelay = 20;

                $scope.show = function() {
                    if (!$scope.context.children) {
                        clearTimeout(showTimeoutId);
                        clearTimeout(hideTimeoutId);

                        showTimeoutId = $timeout(function() {
                            $scope.popupVisible = true;
                        }, showDelay).$$timeoutId;
                    }
                };

                $scope.hide = function() {
                    if (!$scope.context.children) {
                        clearTimeout(showTimeoutId);
                        clearTimeout(hideTimeoutId);

                        hideTimeoutId = $timeout(function () {
                            $scope.popupVisible = false;
                        }, hideDelay).$$timeoutId;
                    }
                };
            }
        };
    });