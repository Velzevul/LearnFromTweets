angular.module('tweetsToSoftware')
    .factory('TweetService', function($q, $http) {
        'use strict';

        var tweets,
            domain = [],
            tweetCommandMap = {},
            tweetAuthorMap = {},
            // TODO: save the top limit of tweets in domain (have both X and Y axis limits)
            loaded,
            promise;

        function load() {
            var res = null;

            function reconstructCommandTree(commandId) {
                var path = commandId.split('/'),
                    pathCopy = [],
                    tree = [];

                angular.forEach(path, function(pathItem) {
                    pathCopy.push(pathItem);
                    tree.push(pathCopy.join('/'));
                });

                return tree;
            }

            if (loaded) {
                var deferred = $q.defer();

                deferred.resolve();
                res = deferred.promise;
            } else {
                if (!promise) {
                    promise = $q.all([
                        $http.get('/data/tweets.json'),
                        $http.get('/data/domain.json')
                    ])
                        .then(function(response) {
                            tweets = response[0].data;
                            domain = response[1].data;

                            angular.forEach(tweets, function(t) {
                                t.published = moment(t.published).toDate();

                                if (!tweetAuthorMap[t.author.name]) {
                                    tweetAuthorMap[t.author.name] = [];
                                }

                                tweetAuthorMap[t.author.name].push(t);

                                var commandTree = reconstructCommandTree(t.command.id);

                                angular.forEach(commandTree, function(command) {
                                    if (!tweetCommandMap[command]) {
                                        tweetCommandMap[command] = [];
                                    }

                                    tweetCommandMap[command].push(t);
                                })

                            });

                            loaded = true;
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
            getLatest: function(n) {
                return load()
                    .then(function() {
                        return tweets.slice(tweets.length - n);
                    });
            },
            getByCommand: function(commandId) {
                return load()
                    .then(function() {
                        return tweetCommandMap[commandId] ? tweetCommandMap[commandId] : [];
                    });
            },
            getByAuthor: function(commandId) {
                return load()
                    .then(function() {
                        return tweetAuthorMap[commandId] ? tweetAuthorMap[commandId] : [];
                    });
            },
            getDomain: function() {
                return load()
                    .then(function() {
                        return domain;
                    });
            }
        }
    });