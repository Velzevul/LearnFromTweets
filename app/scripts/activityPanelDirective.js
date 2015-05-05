angular.module('tweetsToSoftware')
    .directive('activityPanel', function(DataService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/activityPanel.html',
            scope: {},
            controller: function($scope) {
                $scope.filters = DataService.getFilters();
                $scope.toggleFilters = DataService.toggleFilters;
                $scope.setFilters = DataService.setFilters;
            }
        };
    });
