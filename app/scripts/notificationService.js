angular.module('tweetsToSoftware')
    .factory('NotificationService', function($q, $http, $timeout) {
        'use strict';

        var data = {
                notifications: [],
                menuMap: {}
            },
            mock = [],
            loaded = false,
            promise = null;

        function load() {
            var res = null;

            if (loaded) {
                var deferred = $q.defer();

                deferred.resolve();
                res = deferred.promise;
            } else {
                if (!promise) {
                    promise = $http.get('/data/notifications.json')
                        .then(function(response) {
                            loaded = true;
                            mock = response.data;
                        });
                }

                res = promise;
            }

            return res;
        }

        return {
            get: function() {
                return load()
                    .then(function() {
                        return data;
                    });
            },

            listen: function() {
                var delay = 3000;

                load()
                    .then(function() {
                        angular.forEach(mock, function(item) {
                            $timeout(function() {
                                data.notifications.push(item);
                                data.menuMap[item.command] = item.tweet;
                            }, delay);

                            delay += 3000;
                        });
                    });
            }
        };
    });