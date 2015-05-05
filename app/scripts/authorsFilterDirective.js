angular.module('tweetsToSoftware')
    .directive('authorsFilter', function(DataService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/authorsFilter.html',
            scope: {},
            controller: function($scope) {
                DataService.getAuthors()
                    .then(function(response) {
                        $scope.authors = response;
                    });

                $scope.$on('timeFiltersChanged', function() {
                    DataService.getAuthors()
                        .then(function(response) {
                            $scope.authors = response;

                            if ($scope.selectedAuthor) {
                            }
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