angular.module('tweetsToSoftware')
    .factory('ActivityService', function($http, FilterService) {
        'use strict';

        var activity,
            domain,
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
                                     item.parsedTime.setMinutes(0);
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
            },
            getCounters: function() {
                return load()
                    .then(function() {
                        var counters = {},
                            filters = FilterService.get(),
                            upperBound,
                            lowerBound;

                        if (filters.time) {
                            lowerBound = filters.time.lower;
                            upperBound = filters.time.upper;
                        }

                        angular.forEach(activity, function(collection, key) {
                            if (key == 'total') { return; }

                            counters[key] = 0;

                            angular.forEach(collection, function(dataPoint) {
                                if (filters.time) {
                                    if ((dataPoint.parsedTime >= lowerBound) &&
                                        (dataPoint.parsedTime <= upperBound)) {
                                        counters[key] += dataPoint.nTweets;
                                    }
                                } else {
                                    counters[key] += dataPoint.nTweets;
                                }
                            });
                        });

                        return counters;
                    });
            }
        };
    });