angular.module('tweetsToSoftware')
    .directive('activityPanel', function(FilterService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/activityPanel.html',
            scope: {},
            controller: function($scope) {
                $scope.filters = FilterService.get();
                $scope.toggleFilters = function() {
                    $scope.filters.active = !$scope.filters.active;
                };
            }
        };
    });
