angular.module('tweetsToSoftware')
  .directive('tweet', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweet.html',
      scope: {
        tweet: '='
      },
      controller: function($scope) {
      }
    }
  });