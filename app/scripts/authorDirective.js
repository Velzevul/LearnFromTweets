angular.module('tweetsToSoftware')
    .directive('author', function(FilterService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'author.html',
            scope: {
                author: '='
            },
            controller: function($scope) {
                $scope.filters = FilterService.get();

                $scope.setAuthorFilter = function() {
                    $scope.filters.author = $scope.author;
                };

                $scope.toggleFollow = function(e) {
                    e.stopPropagation();
                    $scope.author.isFollowing = !$scope.author.isFollowing;
                };
            }
        }
    });