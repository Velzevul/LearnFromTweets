angular.module('tweetsToSoftware')
    .directive('menuNotification', function(NotificationService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/menuNotification.html',
            scope: {
                context: '='
            },
            controller: function($scope) {
                $scope.data = NotificationService.get();
            }
        }
    });