angular.module('tweetsToSoftware')
    .factory('DataService', function($rootScope, $q, $http) {
        'use strict';

        var filters = {
                time: null,
                author: null
            },
            rawData = {
                tweets: null,
                domain: null
            },
            filteredData = {
                tweets: null,
                authors: null,
                activity: null,
                menuItems: null
            },
            loaded,
            promise;

        function load() {
            var res = null;

            if (loaded) {
                var deferred = $q.defer();

                deferred.resolve();
                res = deferred.promise;
            } else {
                if (!promise) {
                    promise = $q.all([
                        $http.get('/data/tweets.json'),
                        $http.get('/data/domain.json'),
                    ])
                        .then(function(response) {
                            rawData.tweets = response[0].data;
                            rawData.domain = response[1].data;

                            filterData();
                        });
                }

                res = promise;
            }

            return res;
        }

        function filterData() {
            console.log('refilter');

            filteredData = {
                tweets: [],
                activity: [],
                authors: [],
                menuItems: {}
            };

            var activityMap = {},
                authorsMap = {};

            angular.forEach(rawData.tweets, function(tweet) {
               if (matchFilters(tweet)) {
                   filteredData.tweets.push(tweet);

                   if (filteredData.menuItems[tweet.commandId]) {
                       filteredData.menuItems[tweet.commandId] += 1;
                   } else {
                       filteredData.menuItems[tweet.commandId] = 1;
                   }

                   if (authorsMap[tweet.author.name]) {
                       authorsMap[tweet.author.name].tweetsCount += 1;
                   } else {
                       authorsMap[tweet.author.name] = tweet.author;
                       authorsMap[tweet.author.name].tweetsCount = 1;
                   }

                   if (activityMap[tweet.published]) {
                       activityMap[tweet.published] += 1;
                   } else {
                       activityMap[tweet.published] = 1;
                   }
               }
            });

            angular.forEach(rawData.domain, function(time) {
                filteredData.activity.push({ time: time, nTweets: activityMap[time] || 0 });
            });

            angular.forEach(Object.keys(authorsMap), function(author) {
                filteredData.authors.push(authorsMap[author]);
            });

            function matchFilters(tweet) {
                if (filters.time && filters.time != 'clear') {
                    if ((tweet.published < filters.time.lower) ||
                        (tweet.published > filters.time.higher)) {
                        return false;
                    }
                }

                if (filters.author && filters.author != 'clear') {
                    if (tweet.author.name != filters.author) {
                        return false;
                    }
                }

                return true;
            }
        }

        return {
            getFilters: function() {
                return filters;
            },
            setFilters: function(f) {
                if (f.time) {
                    filters.time = f.time;
                }

                if (f.author) {
                    filters.author = f.author;
                }

                $rootScope.$broadcast('filtersChanged');
                filterData();
            },
            getDomain: function() {
                return load()
                    .then(function() {
                        return rawData.domain;
                    });
            },
            getTweets: function(menuItem) {
                return load()
                    .then(function() {
                        var result;

                        if (menuItem) {
                            result = filteredData.tweets;
                        } else {
                            result = filteredData.tweets;
                        }

                        return result;
                    })
            },
            getActivity: function() {
                return load()
                    .then(function() {
                        return {
                            activity: filteredData.activity,
                            nTweets: filteredData.tweets.length
                        };
                    });
            },
            getMenuItems: function() {
                return load()
                    .then(function() {
                        return filteredData.menuItems;
                    });
            },
            getAuthors: function() {
                return load()
                    .then(function() {
                        return filteredData.authors;
                    });
            }
        }
    });