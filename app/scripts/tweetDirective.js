angular.module('tweetsToSoftware')
  .directive('tweet', function() {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweet.html',
      replace: true,
      scope: {
        data: '=',
        activeTweetId: '=',
        onCommandHover: '=',
        onCommandHoverEnd: '=',
        onCommandClick: '='
      },
      controller: function($scope) {
        $scope.tweet = $scope.data.retweetedStatus || $scope.data;

        $scope.commandHover = function(menuName, commandId) {
          if ($scope.activeTweetId === $scope.data.id) {
            $scope.onCommandHover(menuName, commandId);
          }
        };

        $scope.commandHoverEnd = function(menuName) {
          if ($scope.activeTweetId === $scope.data.id) {
            $scope.onCommandHoverEnd(menuName);
          }
        };

        $scope.commandClick = function(menuName, commandId, event) {
          if ($scope.activeTweetId === $scope.data.id) {
            $scope.onCommandClick(menuName, commandId, event)
          }
        };
      }
    }
  });