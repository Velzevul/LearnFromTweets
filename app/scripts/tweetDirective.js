angular.module('tweetsToSoftware')
  .directive('tweet', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweet.html',
      scope: {
        data: '='
      },
      controller: function($scope) {
        $scope.tweet = $scope.data.retweetedStatus || $scope.data;
      }
    }
  });