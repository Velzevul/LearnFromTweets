angular.module('tweetsToSoftware')
    .directive('panelbar', function(ToolbarService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/panelbar.html',
            scope: {},
            controller: function($scope) {
                ToolbarService.loaded
                    .then(function() {
                        $scope.panels = ToolbarService.toolbars['panels'];
                    });
            }
        }
    });