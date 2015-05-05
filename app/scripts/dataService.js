angular.module('tweetsToSoftware')
    .factory('DataService', function($rootScope, $q, $http) {
        'use strict';

        var tweets = [],
            filters = {
                active: false,
                time: null,
                author: null
            },
            rawData = {
                authors: [],
                domain: []
            },
            filteredData = {
                tweets: null,
                tweetsByItems: null,
                authors: null,
                activity: null,
                menuTweets: null
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
                        $http.get('/data/domain.json')
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

        function matchTweetsToConfig(tweets) {
            // TODO: configure based on the relevancy and command knowledge
            return tweets;
        }

        function generateActivity()

        function generateAuthors() {
        }

        function filterData() {
            console.log('refilter');

            filteredData = {
                tweets: [],
                tweetsByItems: {},
                activity: [],
                authors: [],
                menuTweets: {}
            };

            var activityMap = {},
                authorsMap = {};

            angular.forEach(rawData.tweets, function(tweet) {
               if (matchFilters(tweet)) {
                   filteredData.tweets.push(tweet);

                   if (filteredData.tweetsByItems[tweet.commandId]) {
                       filteredData.tweetsByItems[tweet.commandId].push(tweet);
                   } else {
                       filteredData.tweetsByItems[tweet.commandId] = [tweet];
                   }

                   if (filteredData.menuTweets[tweet.commandId]) {
                       filteredData.menuTweets[tweet.commandId] += 1;
                   } else {
                       filteredData.menuTweets[tweet.commandId] = 1;
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

            if (filters.author) {
                filteredData.authors.push(author);
            }

            angular.forEach(Object.keys(authorsMap), function(author) {
                filteredData.authors.push(authorsMap[author]);
            });

            function matchFilters(tweet) {
                if (filters.time) {
                    if ((tweet.published < filters.time.lower) ||
                        (tweet.published > filters.time.higher)) {
                        return false;
                    }
                }

                if (filters.author) {
                    if (tweet.author.name != filters.author.name) {
                        return false;
                    }
                }

                return true;
            }
        }

        return {
            //toggleFilters: function() {
            //    filters.active = !filters.active;
            //    if (filters.active) {
            //        $rootScope.$broadcast('filtersActivated');
            //    }
            //},
            //getFilters: function() {
            //    return filters;
            //},
            //setFilters: function(f) {
            //    if (f.time !== undefined) {
            //        filters.time = f.time;
            //        $rootScope.$broadcast('timeFiltersChanged');
            //    }
            //
            //    if (f.author !== undefined) {
            //        filters.author = f.author;
            //        $rootScope.$broadcast('authorFiltersChanged');
            //    }
            //
            //    $rootScope.$broadcast('filtersChanged');
            //    filterData();
            //},
            getDomain: function() {
                return load()
                    .then(function() {
                        return rawData.domain;
                    });
            },
            //getTweets: function(menuItemId) {
            //    return load()
            //        .then(function() {
            //            var result;
            //
            //            if (menuItemId) {
            //                result = filteredData.tweetsByItems[menuItemId];
            //            } else {
            //                result = filteredData.tweets;
            //            }
            //
            //            return result;
            //        });
            //},
            //getActivity: function() {
            //    return load()
            //        .then(function() {
            //            return {
            //                activity: filteredData.activity,
            //                nTweets: filteredData.tweets.length
            //            };
            //        });
            //},
            //getMenuTweets: function() {
            //    return load()
            //        .then(function() {
            //            return {
            //                menuTweets: filteredData.menuTweets,
            //                nTweets: filteredData.tweets.length
            //            };
            //        });
            //},
            //getAuthors: function() {
            //    return load()
            //        .then(function() {
            //            return filteredData.authors;
            //        });
            //}
        }
    });