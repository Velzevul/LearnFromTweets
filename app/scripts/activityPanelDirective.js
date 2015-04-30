angular.module('tweetsToSoftware')
    .directive('activityPanel', function(TweetsFilter) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/activityPanel.html',
            scope: {},
            controller: function($scope) {
                $scope.filter = function() {
                    TweetsFilter.lowerTimeBound = parseInt(moment('29 April 2015').format('x'));
                }
            }
        };
    });