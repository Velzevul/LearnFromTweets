angular.module('tweetsToSoftware')
    .factory('TweetService', function($http) {
        'use strict';

        var tweets = {
                all: [],
                byId: {},
                byAuthor: {},
                byCommand: {},
                byPanel: {},
                byTool: {},
                active: null
            },
            authors = [],
            domain = [],
            promise;

        promise = $http.get('/data/tweets.json')
            .then(function(response) {
                tweets.all = response.data;

                angular.forEach(tweets.all, function(t) {
                    t.published = moment(t.published, "h:m a - DD MM YYYY");
                });

                var processedAuthors = [],
                    processedDates = [];

                angular.forEach(tweets.all, function(tweet) {
                    var author = tweet.author,
                        published = tweet.published;

                    if (processedAuthors.indexOf(author.screenName) == -1) {
                        authors.push(author);
                        processedAuthors.push(author.screenName);
                    }

                    if (processedDates.indexOf(published.format()) == -1) {
                        domain.push(published.toDate());
                        processedDates.push(published.format());
                    }
                });

                populateMap(tweets.all, tweets.byId, true, function(item) {
                    return item.id;
                });
                populateMap(tweets.all, tweets.byAuthor, false, function(item) {
                    return item.author.screenName;
                });
                populateMap(tweets.all, tweets.byCommand, false, function(item) {
                    return item.tweet.commands || [];
                });
                populateMap(tweets.all, tweets.byTool, false, function(item) {
                    return item.tweet.tools || [];
                });
                populateMap(tweets.all, tweets.byPanel, false, function(item) {
                    return item.tweet.panels || [];
                });
            });

        function populateMap(all, map, uniqueFlag, propertyRetrievalCallback) {
            angular.forEach(all, function(one) {
                var property = propertyRetrievalCallback(one);

                if (Object.prototype.toString.call(property) === '[object Array]') {
                    angular.forEach(property, function(key) {
                        storeInMap(one, key);
                    });
                } else {
                    storeInMap(one, property);
                }

                function storeInMap(obj, key) {
                    if (map[key]) {
                        if (uniqueFlag) {
                            console.error('entry already exists:', map[key], obj);
                        } else {
                            map[key].push(obj);
                        }
                    } else {
                        if (uniqueFlag) {
                            map[key] = obj;
                        } else {
                            map[key] = [obj];
                        }
                    }
                }
            });
        }

        return {
            loaded: promise,
            tweets: tweets,
            authors: authors,
            domain: domain,
            activate: function(tweet) {
                tweets.active = tweet;
            },
            deactivate: function() {
                tweets.active = null;
            }
        }
    });