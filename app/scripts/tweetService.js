angular.module('tweetsToSoftware')
    .factory('TweetService', function($http) {
        'use strict';

        var tweets = {};

        return {
            get: function(menuItem) {
                return $http.get('/data/tweets.json')
                    .then(function(response) {
                        tweets = response.data;
                        return tweets[menuItem];
                    });
            }
        };
    });