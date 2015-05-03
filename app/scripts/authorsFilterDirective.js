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

                $scope.$on('filtersChanged', function() {
                    DataService.getAuthors()
                        .then(function(response) {
                            $scope.authors = response;
                        });
                });

                $scope.setAuthorFilter = function(author) {
                    $scope.filterSet = true;

                    DataService.setFilters({
                        author: author.name
                    });
                };

                $scope.unsetAuthorFilter = function() {
                    $scope.filterSet = false;

                    DataService.setFilters({
                        author: 'clear'
                    });
                };

                $scope.toggleFollow = function(e, author) {
                    e.stopPropagation();
                    author.isFollowing = !author.isFollowing;
                };
            }
        }
    });