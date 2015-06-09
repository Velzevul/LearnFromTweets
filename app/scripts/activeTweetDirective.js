angular.module('tweetsToSoftware')
    .directive('activeTweet', function(TweetService, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'activeTweet.html',
            scope: {},
            controller: function($scope) {
                $scope.tweets = TweetService.tweets;

                $scope.deactivate = TweetService.deactivate;

                $scope.highlightMenuItem = function(command) {
                    MenuService.resetAll();
                    MenuService.open(command, MenuService.menu);
                };

                $scope.highlightTool = function(tool) {
                    MenuService.resetAll();
                    MenuService.open(tool, MenuService.toolbar);
                };

                $scope.highlightPanel = function(panel) {
                    MenuService.resetAll();
                    MenuService.open(panel, MenuService.panelbar);
                };

                $scope.reset = MenuService.resetAll;
            }
        };
    });
