angular.module('tweetsToSoftware')
    .directive('tweetsWidget', function($timeout, NotificationService, DataService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/tweetsWidget.html',
            scope: {},
            controller: function($scope) {
                NotificationService.get()
                    .then(function(data) {
                        $scope.data = data;
                    });

                NotificationService.listen();

                $scope.toggleFilters = DataService.toggleFilters;
                $scope.filters = DataService.getFilters();
            }
        }
    });