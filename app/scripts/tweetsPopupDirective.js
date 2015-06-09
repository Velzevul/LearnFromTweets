angular.module('tweetsToSoftware')
    .directive('tweetsPopup', function() {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'tweetsPopup.html',
            scope: {
                context: '='
            },
            controller: function($scope) {
            }
        };
    });