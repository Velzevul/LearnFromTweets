angular.module('tweetsToSoftware')
    .controller('mainController', function($scope, $q, TweetService,
                                                                MenuService) {
        'use strict';

        $q.all([
            TweetService.loaded,
            MenuService.loaded
        ])
            .then(function() {
                var tweets = TweetService.tweets.all;

                MenuService.resetTweets();
                angular.forEach(tweets, registerTweet);
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
    });