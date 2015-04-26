angular.module('tweetsToSoftware')
    .factory('TweetService', function($http) {
        'use strict';

        var tweets = {};

        $http.get('/data/tweets.json')
            .success(function(response) {
                tweets = response;
            });

        return {
            get: function(menuPath) {
                return tweets[menuPath];
            }
        };
    });