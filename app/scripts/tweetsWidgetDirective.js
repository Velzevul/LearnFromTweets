angular.module('tweetsToSoftware')
    .directive('tweetsWidget', function(TweetService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/tweetsWidget.html',
            scope: {
                context: '='
            },
            controller: function($scope) {
                $scope.tweets = [1,2];

                //TweetService.get($scope.context)
                //    .success(function(response) {
                //        $scope.tweets = response;
                //    });
            }
        }
    });