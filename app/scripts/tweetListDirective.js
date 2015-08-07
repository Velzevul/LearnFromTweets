angular.module('tweetsToSoftware')
  .directive('tweetList', function (TweetService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweetList.html',
      scope: {},
      controller: function ($scope) {
        TweetService.loaded
          .then(function() {
            $scope.tweets = TweetService.tweets;
          });
      }
    };
  });