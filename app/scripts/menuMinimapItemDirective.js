angular.module('tweetsToSoftware')
    .directive('menuMinimapItem', function(TweetService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/menuMinimapItem.html',
            scope: {
                item: '='
            },
            controller: function($scope) {
                TweetService.getForItem($scope.item.id)
                    .then(function(tweets) {
                        $scope.tweets = tweets;
                    });
            }
        };
    });