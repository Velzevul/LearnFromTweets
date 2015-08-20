angular.module('tweetsToSoftware')
  .controller('adminController', function(MenuService, switterServer, $scope, $http) {
    'use strict';

    $scope.menuItems = MenuService.menu;
    $scope.panelbarItems = MenuService.panelbar;
    $scope.toolbarItems = MenuService.toolbar;

    $scope.selectedMenuItems = [];
    $scope.selectedPanelbarItems = [];
    $scope.selectedToolbarItems = [];

    $scope.addMenuItem = function() {
      $scope.selectedMenuItems.push({});
    };
    $scope.addPanelbarItem = function() {
      $scope.selectedPanelbarItems.push({});
    };
    $scope.addToolbarItem = function() {
      $scope.selectedToolbarItems.push({});
    };

    $scope.removeMenuItem = function(item) {
      $scope.selectedMenuItems.splice($scope.selectedMenuItems.indexOf(item), 1);
    };
    $scope.removePanelbarItem = function(item) {
      $scope.selectedPanelbarItems.splice($scope.selectedPanelbarItems.indexOf(item), 1);
    };
    $scope.removeToolbarItem = function(item) {
      $scope.selectedToolbarItems.splice($scope.selectedToolbarItems.indexOf(item), 1);
    };

    $scope.submit = function() {
      $http.get(switterServer + '/twitter-api/tweets' + $scope.tweetId)
        .then(function(r) {
          var tweetData = r.data;

          tweetData.preview_image_url = $scope.previewImageUrl;
          tweetData.menu_items = $scope.selectedMenuItems.map(function(item) {
            return item.id;
          }).join(',') || null;
          tweetData.panelbar_items = $scope.selectedPanelbarItems.map(function(item) {
            return item.id;
          }).join(',') || null;
          tweetData.toolbar_items = $scope.selectedToolbarItems.map(function(item) {
            return item.id;
          }).join(',') || null;

          $http.post(switterServer + '/api/tweets', {tweet: JSON.stringify(tweetData)})
            .then(function(r) {
              alert('Tweet was successfully added!');
              $scope.tweetId = null;
              $scope.previewImageUrl = null;

              $scope.selectedMenuItems = [];
              $scope.selectedToolbarItems = [];
              $scope.selectedPanelbarItems = [];
            });
        });
    };
  });