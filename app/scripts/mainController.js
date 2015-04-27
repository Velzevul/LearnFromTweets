angular.module('tweetsToSoftware')
    .controller('mainController', function($scope, MenuService, TweetService) {
        'use strict';

        $scope.notify = function() {
            TweetService.broadcast('Code/Completion/SmartType');
        }
    });