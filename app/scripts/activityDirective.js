angular.module('tweetsToSoftware')
    .directive('activity', function($q, TweetService, MenuService, FilterService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'activity.html',
            scope: {},
            replace: true,
            controller: function($scope) {
                $scope.filters = FilterService.filters;

                $q.all([
                    TweetService.loaded,
                    MenuService.loaded
                ])
                    .then(function() {
                        registerTweets(TweetService.tweets.all);

                        $scope.$watchGroup([
                            'filters.time',
                            'filters.highlightUnfamiliar',
                            'filters.highlightRelevant'
                        ], function() {
                            registerTweets(TweetService.tweets.all);
                        });
                    });

                function registerTweets(tweets) {
                    console.time('Tweet registration');

                    MenuService.resetTweets();
                    angular.forEach(tweets, register);

                    console.timeEnd('Tweet registration');

                    function register(tweet) {
                        if (FilterService.matchTweet(tweet)) {
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
                }

            }
        };
    });
