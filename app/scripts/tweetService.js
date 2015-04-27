angular.module('tweetsToSoftware')
    .factory('TweetService', function($http, $rootScope, MenuService) {
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
                var notification = {
                        "id": 5,
                        "text": "Just discovered this useful feature",
                        "published": "just now",
                        "author": {
                            "name": "volod",
                            "avatar": "https://pbs.twimg.com/profile_images/481030178227752960/DtpVP2_4_bigger.png"
                        }
                    };

                var path = commandLabel.split('/'),
                    command = path[path.length - 1];

                tweets[command].push(notification);

                MenuService.highlight(commandLabel);
                $rootScope.$broadcast(command, notification);
            }
        };
    });