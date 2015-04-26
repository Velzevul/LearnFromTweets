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
                $scope.tweets = [];

                TweetService.get($scope.context)
                    .then(function(response) {
                        $scope.tweets = response;

                        if (response) {
                            $scope.notification = response[0];
                        }
                    });
            }
        }
    });