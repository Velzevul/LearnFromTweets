angular.module('tweetsToSoftware')
    .factory('ActivityService', function($http) {
        'use strict';

        var activity,
            loaded,
            promise;

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

                            angular.forEach(activity, function(category) {
                                 angular.forEach(category, function(item) {
                                     item.parsedTime = moment(item.time).toDate();
                                 });
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
        };
    });