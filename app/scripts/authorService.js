angular.module('tweetsToSoftware')
    .factory('AuthorService', function($http) {
        'use strict';

        return {
            get: function() {
                return $http.get('/data/authors.json')
                    .then(function(response) {
                        return response.data;
                    });
            }
        };
    });