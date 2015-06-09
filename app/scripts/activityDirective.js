angular.module('tweetsToSoftware')
    .directive('activity', function($q, TweetService, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'activity.html',
            scope: {},
            replace: true,
            controller: function($scope) {
                $q.all([
                    TweetService.loaded,
                    MenuService.loaded
                ])
                    .then(function() {
                        var tweets = TweetService.tweets.all;

                        MenuService.resetTweets();
                        angular.forEach(tweets, registerTweet);

                        angular.forEach(tweets, function(tweet) {
                            if (tweet.tweet.commands) {
                                var commands = [];

                                angular.forEach(tweet.tweet.commands, function(c) {
                                    commands.push(MenuService.menu.byId[c]);
                                });

                                tweet.commandRefs = commands;
                            }

                            if (tweet.tweet.tools) {
                                var tools = [];

                                angular.forEach(tweet.tweet.tools, function(t) {
                                    tools.push(MenuService.toolbar.byId[t]);
                                });

                                tweet.toolRefs = tools;
                            }

                            if (tweet.tweet.panels) {
                                var panels = [];

                                angular.forEach(tweet.tweet.panels, function(p) {
                                    panels.push(MenuService.panelbar.byId[p]);
                                });

                                tweet.panelRefs = panels;
                            }
                        });
                    });


                function registerTweet(tweet) {
                    if (tweet.tweet.commands) {
                        angular.forEach(tweet.tweet.commands, function(c) {
                            MenuService.registerTweet(tweet, c, MenuService.menu);
                        });
                    }

                    if (tweet.tweet.tools) {
                        angular.forEach(tweet.tweet.tools, function(t) {
                            MenuService.registerTweet(tweet, t, MenuService.toolbar);
                        });
                    }

                    if (tweet.tweet.panels) {
                        angular.forEach(tweet.tweet.panels, function(p) {
                            MenuService.registerTweet(tweet, p, MenuService.panelbar);
                        });
                    }
                }
            }
        };
    });
