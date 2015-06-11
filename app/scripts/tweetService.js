angular.module('tweetsToSoftware')
    .factory('TweetService', function($q, $http, MenuService) {
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
            promise,
            relevancyThreshold = 95,
            familiarityThreshold = 20;

        window.p = $http.get('/data/tweets.json');

        console.time('Tweets load');
        promise = $q.all([
            $http.get('/data/tweets.json'),
            MenuService.loaded
        ])
            .then(function(response) {
                console.timeEnd('Tweets load');
                console.time('Tweets process');

                tweets.all = response[0].data;

                var processedAuthors = [],
                    processedDates = [];

                angular.forEach(tweets.all, function(tweet) {

                    tweet.published = moment(tweet.published, "h:m a - DD MM YYYY");

                    if (processedAuthors.indexOf(tweet.author.screenName) == -1) {
                        authors.push(tweet.author);
                        processedAuthors.push(tweet.author.screenName);
                    }

                    if (processedDates.indexOf(tweet.published.format()) == -1) {
                        domain.push(tweet.published);
                        processedDates.push(tweet.published.format());
                    }

                    domain.sort();

                    var tweetContext = [];

                    tweet.commandRefs = getMenus(tweet.tweet.commands, MenuService.menu);
                    Array.prototype.push.apply(tweetContext, tweet.commandRefs);
                    tweet.toolRefs = getMenus(tweet.tweet.tools, MenuService.toolbar);
                    Array.prototype.push.apply(tweetContext, tweet.toolRefs);
                    tweet.panelRefs = getMenus(tweet.tweet.panels, MenuService.panelbar);
                    Array.prototype.push.apply(tweetContext, tweet.panelRefs);

                    tweet.hasUnfamiliar = false;
                    tweet.hasRelevant = false;

                    angular.forEach(tweetContext, function(c) {
                        if (c.familiarity < familiarityThreshold) {
                            tweet.hasUnfamiliar = true;
                        }

                        if (c.relevancy > relevancyThreshold) {
                            tweet.hasRelevant = true;
                        }
                    });
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

                console.timeEnd('Tweets process');
            });

        function getMenus(commandIds, menu) {
            var commands = [];

            angular.forEach(commandIds, function(c) {
                commands.push(menu.byId[c]);
            });

            return commands;
        }

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