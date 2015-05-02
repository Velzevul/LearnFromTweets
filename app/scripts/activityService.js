angular.module('tweetsToSoftware')
    .factory('ActivityService', function($q, $http) {
        'use strict';

        var activity = [],
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
                    promise = $http.get('/data/activity.json')
                        .then(function(response) {
                            activity = response.data;

                            angular.forEach(activity, function(item) {
                               item.timestamp = moment(item.time).format('x');
                            });
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
                        return activity;
                    });
            }
        }
    });