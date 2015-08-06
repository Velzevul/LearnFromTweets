angular.module('tweetsToSoftware')
  .directive('tool', function($document, MenuService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'tool.html',
      scope: {
        tool: '='
      },
      controller: function($scope) {
        $scope.showTweets = MenuService.showTweets;
        $scope.hideTweets = MenuService.hideTweets;

        $scope.openSubtools = function() {
          MenuService.open($scope.tool, MenuService.toolbar);
        };
      },
      link: function($scope) {
        $document.on('click', function(e) {
          var isTool = $(e.target).parents('.tool').length ||
            $(e.target).hasClass('tool');

          if (!isTool) {
            MenuService.reset(MenuService.toolbar);
            $scope.$apply();
          }
        });
      }
    };
  });