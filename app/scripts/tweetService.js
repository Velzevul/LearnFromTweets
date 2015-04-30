angular.module('tweetsToSoftware')
    .factory('TweetService', function($http, $q) {
        'use strict';

        var allTweets = {
                tweets: []
            },
            loaded = false,
            promise = null;

        function load() {
            var res = null;

            if (loaded) {
                var deferred = $q.defer();

                deferred.resolve();
                res = deferred.promise;
            } else {
                if (!promise) {
                    promise = $http.get('/data/tweets.json')
                        .then(function(response) {
                            loaded = true;
                            allTweets.tweets = response.data;
                        });
                }

                res = promise;
            }

            return res;
        }

        return {
            get: function() {
                return load()
                    .then(function() {
                        return allTweets;
                    });
            }
        };
    });