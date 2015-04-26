angular.module('tweetsToSoftware')
    .directive('tweet', function($timeout) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/tweet.html',
            scope: {
                tweet: '='
            },
            controller: function($scope) {
            }
        }
    });