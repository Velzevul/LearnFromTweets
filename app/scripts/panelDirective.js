angular.module('tweetsToSoftware')
    .directive('panel', function($timeout, ToolbarService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/panel.html',
            scope: {
                panel: '='
            },
            controller: function($scope) {
                $scope.dropdownShown = false;

                $scope.toggleDropdown = function() {
                    $scope.dropdownShown = !$scope.dropdownShown;
                };
            }
        };
    });