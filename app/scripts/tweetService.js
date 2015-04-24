angular.module('tweetsToSoftware')
    .factory('TweetService', function($http, $interval) {
        'use strict';

        var data = {
            tweets: []
        };

        $http.get('/data/tweets.json')
            .success(function(response) {
                data.tweets = response;
            });

        return {
            get: function() {
                return data;
            }
        };
    });