angular.module('tweetsToSoftware')
    .controller('adminController', function(MenuService, $scope, $q) {
        'use strict';

        $scope.menuItems = MenuService.menu;
        $scope.panelbarItems = MenuService.panelbar;
        $scope.toolbarItems = MenuService.toolbar;

        $scope.selectedMenuItems = [];
        $scope.selectedPanelbarItems = [];
        $scope.selectedToolbarItems = [];

        $scope.addMenuItem = function(){$scope.selectedMenuItems.push({});};
        $scope.addPanelbarItem = function(){$scope.selectedPanelbarItems.push({});};
        $scope.addToolbarItem = function(){$scope.selectedToolbarItems.push({});};

        $scope.removeMenuItem = function(item){$scope.selectedMenuItems.splice($scope.selectedMenuItems.indexOf(item), 1);};
        $scope.removePanelbarItem = function(item){$scope.selectedPanelbarItems.splice($scope.selectedPanelbarItems.indexOf(item), 1);};
        $scope.removeToolbarItem = function(item){$scope.selectedToolbarItems.splice($scope.selectedToolbarItems.indexOf(item), 1);};

        $scope.submit = function() {
              
        };
    });