angular.module('tweetsToSoftware')
    .directive('tweetsWidget', function(TweetService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/tweetsWidget.html',
            scope: {},
            controller: function($scope) {
                $scope.notifications = [];

                TweetService.broadcast();

                $scope.$on('newTweet', function(event, notification) {
                    $scope.notifications.unshift(notification);
                });
            }
        }
    });