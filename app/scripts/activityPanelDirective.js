angular.module('tweetsToSoftware')
    .directive('activityPanel', function(TweetsFilter) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/activityPanel.html',
            scope: {},
            controller: function($scope) {
                $scope.filters = TweetsFilter;
            }
        };
    });