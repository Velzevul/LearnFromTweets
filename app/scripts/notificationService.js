angular.module('tweetsToSoftware')
    .factory('NotificationService', function($timeout) {
        'use strict';

        var data = {
                notifications: [],
                menu: {}
            },
            mock = [
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
                    command: 'Code/Surround With',
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

        return {
            get: function() {
                return data;
            },
            listen: function() {
                var delay = 3000;

                angular.forEach(mock, function(item) {
                    $timeout(function() {
                        data.notifications.push(item);
                        data.menu[item.command] = item.tweet;
                    }, delay);

                    delay += 3000;
                });
            }
        };
    });