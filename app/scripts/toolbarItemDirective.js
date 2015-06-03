angular.module('tweetsToSoftware')
    .directive('toolbarItem', function($timeout, ToolbarService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/toolbarItem.html',
            scope: {
                tool: '='
            },
            controller: function($scope) {
                $scope.dropdownShown = false;

                $scope.showDropdown = function() {
                    if (!$scope.dropdownShown) {
                        $scope.dropdownShown = true;

                        $timeout(function() {
                            $(document).one('click', function() {
                                $scope.dropdownShown = false;
                                $scope.$apply();
                            });
                        });
                    }
                };
            }
        };
    });