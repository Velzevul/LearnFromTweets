angular.module('tweetsToSoftware')
    .controller('mainController', function($scope, $timeout, MenuService, TweetService) {
        'use strict';

        $timeout(function() {
            MenuService.open('Code/Completion/SmartType');

            $timeout(function() {
                MenuService.highlight('Code/Completion/SmartType');
            }, 1000);
        }, 1000);
    });