angular.module('tweetsToSoftware')
    .directive('activityOverlay', function($q, MenuService, TweetService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/activityOverlay.html',
            scope: {},
            controller: function($scope) {
                $q.all([
                    MenuService.get(),
                    MenuService.getFlat(),
                    TweetService.get()
                ])
                    .then(function(data) {
                        $scope.menu     = data[0];
                        $scope.menuFlat = data[1];
                        $scope.tweets   = data[2];

                        debugger;
                    });


            }
        };
    });