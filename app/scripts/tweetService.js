angular.module('tweetsToSoftware')
    .factory('TweetService', function($http, $rootScope, $timeout, MenuService) {
        'use strict';

        var tweets = {};

        return {
            get: function(menuItem) {
                return $http.get('/data/tweets.json')
                    .then(function(response) {
                        tweets = response.data;
                        return response.data[menuItem];
                    });
            },
            broadcast: function(commandLabel) {
                var notifications = [
                    {
                        command: 'Code/Completion/Basic',
                        tweet: {
                            "id": 5,
                            "text": "Just discovered this useful feature",
                            "published": "just now",
                            "author": {
                                "name": "volod",
                                "avatar": "https://pbs.twimg.com/profile_images/481030178227752960/DtpVP2_4_bigger.png"
                            }
                        }
                    },
                    {
                        command: 'Code/SurroundWith',
                        tweet: {
                            "id": 6,
                            "text": "Good explanation how this works: youtube.com/Q4WR3G1",
                            "published": "just now",
                            "author": {
                                "name": "chriscoyer",
                                "avatar": "https://pbs.twimg.com/profile_images/550841435831173120/fSk-hlgT_bigger.jpeg"
                            }
                        }
                    },
                    {
                        command: 'Edit/Restructure/Current File',
                        tweet: {
                            "id": 7,
                            "text": "Here's good tutorial about this command",
                            "published": "just now",
                            "author": {
                                "name": "yassinebentaieb",
                                "avatar": "https://pbs.twimg.com/profile_images/1617898274/yassinebentaieb_bigger.png"
                            }
                        }
                    }
                ];

                var delay = 3000;

                angular.forEach(notifications, function(item) {
                   $timeout(function() {
                       if (tweets[item.command]) {
                           tweets[item.command].unshift(item.tweet);
                       } else {
                           tweets[item.command] = [item.tweet];
                       }

                       $rootScope.$broadcast('newTweet', item);
                   }, delay);

                    delay += 3000;
                });
            }
        };
    });