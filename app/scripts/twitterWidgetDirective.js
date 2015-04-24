angular.module('tweetsToSoftware')
    .directive('twitterWidget', function($interval, TweetService, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/twitterWidget.html',
            scope: {},
            controller: function($scope) {
                $scope.data = TweetService.get();

                $scope.highlight = function(command) {
                    var path = command.split('/');

                    MenuService.activate(path[path.length - 1]);
                    MenuService.highlight(path[path.length - 1]);
                };
            }
        }
    });