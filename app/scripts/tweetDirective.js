angular.module('tweetsToSoftware')
    .directive('tweet', function(TweetService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'tweet.html',
            scope: {
                tweet: '='
            },
            controller: function($scope) {
                $scope.activateTweet = TweetService.activate;
            }
        }
    });