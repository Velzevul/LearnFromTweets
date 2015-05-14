angular.module('tweetsToSoftware')
    .factory('AuthorService', function($http) {
        'use strict';

        var authors,
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
                    promise = $http.get('/data/authors.json')
                        .then(function(response) {
                            authors = response.data;

                            loaded = true;
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
                        return authors;
                    });
            }
        };
    });