angular.module('tweetsToSoftware')
    .factory('TweetService', function($http, $q) {
        'use strict';

        var tweets = [],
            commandMap = {},
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
                            tweets = response.data;

                            angular.forEach(tweets, function(item) {
                               if (commandMap[item.commandId]) {
                                   commandMap[item.commandId].push(item);
                               } else {
                                   commandMap[item.commandId] = [item];
                               }
                            });
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
                        return tweets;
                    });
            },
            getForItem: function(menuItem) {
                return load()
                    .then(function() {
                        return commandMap[menuItem];
                    });
            }
        };
    });