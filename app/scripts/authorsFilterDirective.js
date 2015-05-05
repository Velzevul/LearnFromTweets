angular.module('tweetsToSoftware')
    .directive('authorsFilter', function($q, AuthorService, ActivityService, DataService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/authorsFilter.html',
            scope: {},
            controller: function($scope) {
                $q.all([
                    AuthorService.get(),
                    ActivityService.getCounters()
                ])
                    .then(function(response) {
                        $scope.authors = response[0];
                        var authorCounters = response[1];

                        angular.forEach($scope.authors, function(author) {
                            author.tweetsCount = authorCounters[author.name];
                        });
                    });

                $scope.$on('filtersChanged', function() {
                    ActivityService.getCounters()
                        .then(function(response) {
                            var authorCounters = response;

                            angular.forEach($scope.authors, function(author) {
                                author.tweetsCount = authorCounters[author.name];
                            });
                        });
                });

                $scope.setAuthorFilter = function(author) {
                    $scope.selectedAuthor = author;

                    DataService.setFilters({
                        author: author
                    });
                };

                $scope.unsetAuthorFilter = function() {
                    $scope.selectedAuthor = null;

                    DataService.setFilters({
                        author: null
                    });
                };

                $scope.toggleFollow = function(e, author) {
                    e.stopPropagation();
                    author.isFollowing = !author.isFollowing;
                };
            }
        }
    });