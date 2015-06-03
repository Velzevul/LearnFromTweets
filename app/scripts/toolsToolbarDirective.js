angular.module('tweetsToSoftware')
    .directive('toolsToolbar', function(ToolbarService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/toolsToolbar.html',
            scope: {},
            controller: function($scope) {
                ToolbarService.loaded
                    .then(function() {
                        $scope.tools = ToolbarService.toolbars['tools'];
                    });
            }
        }
    });