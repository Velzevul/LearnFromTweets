angular.module('tweetsToSoftware')
    .directive('authorsFilter', function($q, TweetService, AuthorService, FilterService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'authorsFilter.html',
            scope: {},
            controller: function($scope) {
                $scope.filters = FilterService.get();

                AuthorService.get()
                    .then(function(authors) {
                        $scope.authors = authors;

                        angular.forEach($scope.authors, function(a) {
                            TweetService.getByAuthor(a.name)
                                .then(function(tweets) {
                                    a.tweetsCount = tweets.length;
                                });
                        });
                    });

                $scope.unsetAuthorFilter = function() {
                    $scope.filters.author = null;
                };
            }
        }
    });