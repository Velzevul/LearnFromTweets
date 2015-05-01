angular.module('tweetsToSoftware')
    .controller('mainController', function($scope, TweetsFilter) {
        'use strict';

        $scope.filters = TweetsFilter;
    });