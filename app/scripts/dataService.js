angular.module('tweetsToSoftware')
    .factory('DataService', function($rootScope, $q, $http) {
        'use strict';

        var tweets = [],
            domain = [],
            commandRelevancyData = {},
            commandVocabularyData = {},
            commandRelevancyThreshold = 85,
            commandVocabularyThreshold = 20,
            filters = {
                active: false,
                time: null,
                author: null,
                highlightRelevant: false,
                highlightUnknown: false
            },
            filteredData = {
                tweets: null,
                tweetsByItems: null,
                menuItemsPrivacy: null,
                menuCounters: null
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
                        $http.get('/data/commandRelevancy.json'),
                        $http.get('/data/commandVocabulary.json')
                    ])
                        .then(function(response) {
                            tweets = response[0].data;
                            domain = response[1].data;
                            commandRelevancyData = response[2].data;
                            commandVocabularyData = response[3].data;

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
                tweetsByItems: {},
                menuItemsPrivacy: {},
                menuCounters: {}
            };

            angular.forEach(tweets, function(tweet) {
               if (matchFilters(tweet)) {
                   filteredData.tweets.push(tweet);

                   if (filteredData.tweetsByItems[tweet.commandId]) {
                       filteredData.tweetsByItems[tweet.commandId].push(tweet);
                   } else {
                       filteredData.tweetsByItems[tweet.commandId] = [tweet];
                   }

                   if (filteredData.menuCounters[tweet.commandId]) {
                       filteredData.menuCounters[tweet.commandId] += 1;
                   } else {
                       filteredData.menuCounters[tweet.commandId] = 1;
                   }

                   if (filters.highlightRelevant &&
                       filters.highlightUnknown &&
                       (commandRelevancyData[tweet.commandId] >= commandRelevancyThreshold) &&
                       (commandVocabularyData[tweet.commandId] <= commandVocabularyThreshold)) {
                       filteredData.menuItemsPrivacy[tweet.commandId] = true;
                   } else if (filters.highlightRelevant &&
                              !filters.highlightUnknown &&
                              (commandRelevancyData[tweet.commandId] >= commandRelevancyThreshold)) {
                       filteredData.menuItemsPrivacy[tweet.commandId] = true;
                   } else if (filters.highlightUnknown &&
                              !filters.highlightRelevant &&
                              (commandVocabularyData[tweet.commandId] <= commandVocabularyThreshold)) {
                       filteredData.menuItemsPrivacy[tweet.commandId] = true;
                   } else {
                       filteredData.menuItemsPrivacy[tweet.commandId] = false;
                   }
               }
            });

            function matchFilters(tweet) {
                if (filters.time) {
                    if ((moment(tweet.published).minutes(0).toDate() <= filters.time.lower) ||
                        (moment(tweet.published).minutes(0).toDate() >= filters.time.upper)) {
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
            toggleFilters: function() {
                filters.active = !filters.active;
                if (filters.active) {
                    $rootScope.$broadcast('filtersActivated');
                }
            },
            getFilters: function() {
                return filters;
            },
            setFilters: function(f) {
                if (f.time !== undefined) {
                    filters.time = f.time;
                    $rootScope.$broadcast('timeFiltersChanged');
                }

                if (f.author !== undefined) {
                    filters.author = f.author;
                    $rootScope.$broadcast('authorFiltersChanged');
                }

                if (f.highlightUnknown !== undefined) {
                    filters.highlightUnknown = f.highlightUnknown;
                    $rootScope.$broadcast('privacyFiltersChanged');
                }

                if (f.highlightRelevant !== undefined) {
                    filters.highlightRelevant = f.highlightRelevant;
                    $rootScope.$broadcast('privacyFiltersChanged');
                }

                $rootScope.$broadcast('filtersChanged');
                filterData();
            },
            getDomain: function() {
                return load()
                    .then(function() {
                        return domain;
                    });
            },
            getTweets: function(menuItemId) {
                return load()
                    .then(function() {
                        var result;

                        if (menuItemId) {
                            result = filteredData.tweetsByItems[menuItemId];
                        } else {
                            result = filteredData.tweets;
                        }

                        return result;
                    });
            },
            getMenuCounters: function() {
                return load()
                    .then(function() {
                        return filteredData.menuCounters;
                    });
            },
            getMenuItemsPrivacy: function() {
                return load()
                    .then(function() {
                        return filteredData.menuItemsPrivacy;
                    });
            }
        }
    });