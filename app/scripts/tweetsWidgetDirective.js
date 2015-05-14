angular.module('tweetsToSoftware')
    .directive('tweetsWidget', function($timeout, TweetService, FilterService) {
    'use strict';

    return {
        restrict: 'E',
        templateUrl: 'templates/tweetsWidget.html',
        scope: {},
        controller: function($scope) {
            TweetService.getLatest(3)
                .then(function(tweets) {
                    $scope.latest = tweets;
                });

            $scope.filters = FilterService.get();
            $scope.toggleFilters = function() {
                $scope.filters.active = !$scope.filters.active;
            };
        }
    }
});