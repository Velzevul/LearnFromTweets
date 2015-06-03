angular.module('tweetsToSoftware')
    .directive('toolsToolbar', function(ToolbarService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/toolbar.html',
            scope: {},
            controller: function($scope) {
                ToolbarService.loaded
                    .then(function() {
                        $scope.tools = ToolbarService.toolbars['tools'];
                    });
            }
        }
    });