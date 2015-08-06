angular.module('tweetsToSoftware')
  .directive('tweetList', function (TweetService, MenuService, FilterService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweetList.html',
      scope: {},
      controller: function ($scope) {
        $scope.tweets = TweetService.tweets.all;
      }
    };
  });