angular.module('tweetsToSoftware')
  .directive('tweet', function(FilterService, LoggerService, $sce, $timeout) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tweet.html',
      replace: true,
      scope: {
        data: '=',
        commandHoverCallback: '=',
        commandLeaveCallback: '=',
        commandClickCallback: '='
      },
      controller: function($scope) {
        $scope.tweet = $scope.data.retweetedStatus || $scope.data;
        $scope.filters = FilterService;

        $scope.commandHover = function(menuName, commandId) {
          if ($scope.filters.activeTweetId === $scope.data.id) {
            $scope.commandHoverCallback(menuName, commandId);
            LoggerService.log("Hovered over command (tweet " + $scope.data.id + " - " + menuName + "): " + commandId);
          }
        };

        $scope.commandHoverEnd = function(menuName, commandId) {
          if ($scope.filters.activeTweetId === $scope.data.id) {
            $scope.commandLeaveCallback(menuName, commandId);
          }
        };

        $scope.commandClick = function(menuName, commandId, event) {
          if ($scope.filters.activeTweetId === $scope.data.id) {
            $scope.commandClickCallback(menuName, commandId, event);
            LoggerService.log("Clicked on command (tweet " + $scope.data.id + " - " + menuName + "): " + commandId);
          }
        };
      },
      link: function($scope, elem, attr) {
        $timeout(function() {
          elem.find('a').on('click', function(event) {
            event.stopPropagation();
            LoggerService.log("Clicked on link (tweet " + $scope.data.id + "): " + event.target.href);
          });
        });
      }
    }
  });