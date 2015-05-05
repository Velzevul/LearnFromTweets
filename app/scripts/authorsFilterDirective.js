angular.module('tweetsToSoftware')
    .directive('authorsFilter', function($q, AuthorService, DataService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/authorsFilter.html',
            scope: {},
            controller: function($scope) {
                $q.all([
                    AuthorService.get(),
                    DataService.getAuthorCounters()
                ])
                    .then(function(response) {
                        $scope.authors = response[0];
                        $scope.authorCounters = response[1];
                    });

                $scope.$on('timeFiltersChanged', function() {
                    DataService.getAuthorCounters()
                        .then(function(response) {
                            $scope.authorCounters = response;
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