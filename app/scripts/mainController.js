angular.module('tweetsToSoftware')
    .controller('mainController', function($scope, TweetService, FilterService) {
        'use strict';

        $scope.matchTweet = FilterService.matchTweet;

        TweetService.get()
            .then(function(tweets) {
                $scope.tweets = tweets;
            });
    });