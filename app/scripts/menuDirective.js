angular.module('tweetsToSoftware')
    .directive('menu', function($q, $document, MenuService, DataService) {
       'use strict';

        return {
            restrict: 'E',
            templateUrl: 'scripts/templates/menu.html',
            scope: {},
            controller: function($scope) {
                $scope.filters = DataService.getFilters();

                $q.all([
                    MenuService.get(),
                    MenuService.getFlat(),
                    DataService.getMenuCounters(),
                    DataService.getMenuItemsPrivacy()
                ])
                    .then(function(data) {
                        $scope.menu = data[0];
                        $scope.menuFlat = data[1];

                        calculateTweetDistribution(data[2], data[3]);
                    });

                $scope.$on('filtersChanged', function() {
                    $q.all([
                        DataService.getMenuCounters(),
                        DataService.getMenuItemsPrivacy()
                    ])
                        .then(function(response) {
                            calculateTweetDistribution(response[0], response[1]);
                        });
                });

                function calculateTweetDistribution(menuItemCounters, menuItemPrivacy) {
                    angular.forEach(Object.keys($scope.menuFlat), function(menuItemId) {
                        var menuItem = $scope.menuFlat[menuItemId].object;

                        menuItem.nTweets = 0;
                        menuItem.highlightType = null;
                    });

                    angular.forEach(Object.keys($scope.menuFlat), function(menuItemId) {
                        var menuItem = $scope.menuFlat[menuItemId].object,
                            menuItemParentIds = $scope.menuFlat[menuItemId].parents,
                            parent;


                        if (menuItemCounters[menuItem.id]) {
                            menuItem.nTweets += menuItemCounters[menuItem.id];
                            menuItem.highlightType = menuItemPrivacy[menuItem.id] ? 'highlighted' : 'normal';

                            angular.forEach(menuItemParentIds, function(parentId) {
                                parent = $scope.menuFlat[parentId].object;
                                parent.nTweets += menuItemCounters[menuItem.id];

                                if (parent.highlightType) {
                                    if ((parent.highlightType == 'highlighted' && !menuItemPrivacy[menuItem.id]) ||
                                        (parent.highlightType == 'normal'      &&  menuItemPrivacy[menuItem.id])) {
                                        parent.highlightType = 'mixed';
                                    }
                                } else {
                                    parent.highlightType = menuItemPrivacy[menuItem.id] ? 'highlighted' : 'normal';
                                }
                            });

                        }
                    });
                }

                $scope.open = MenuService.open;
            },
            link: function($scope) {
                $document.on('click', function(e) {
                    var isPopup = $(e.target).parents('.popup').length ||
                            $(e.target).hasClass('popup'),
                        isTrigger = $(e.target).parents('.menu-popup__indicator').length ||
                            $(e.target).hasClass('menu-popup__indicator');

                    if (!isPopup && !isTrigger) {
                        MenuService.hideAll();
                        $scope.$apply()
                    }
                });
            }
        };
    });