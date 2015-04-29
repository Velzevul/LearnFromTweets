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
                NotificationService.get()
                    .then(function(data) {
                        $scope.data = data;
                    });
            }
        }
    });