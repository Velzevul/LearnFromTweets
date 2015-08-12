angular.module('tweetsToSoftware')
  .directive('tweetList', function(TweetService, $document) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweetList.html',
      scope: {},
      controller: function($scope) {
        $scope.activeId = null;

        TweetService.loaded
          .then(function() {
            $scope.tweets = TweetService.tweets;
          });

        $scope.activate = function(t) {
          $scope.activeId = t.id;
        };
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var isTweet = $(e.target).parents('.tweet').length ||
            $(e.target).hasClass('tweet');

          if (!isTweet) {
            $scope.activeId = null;
            $scope.$apply();
          }
        });
      }
    };
  });