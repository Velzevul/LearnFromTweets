angular.module('tweetsToSoftware')
    .directive('menu', function($q, $document, MenuService, DataService) {
       'use strict';

        return {
            restrict: 'E',
            templateUrl: 'scripts/templates/menu.html',
            scope: {},
            controller: function($scope) {
                var highlightColor = '69,131,255';

                $scope.filters = DataService.getFilters();

                $q.all([
                    MenuService.get(),
                    MenuService.getFlat(),
                    DataService.getMenuCounters()
                ])
                    .then(function(data) {
                        $scope.menu = data[0];
                        $scope.menuFlat = data[1];

                        calculateIntensity(data[2]);
                    });

                $scope.$on('filtersChanged', function() {
                    DataService.getMenuTweets()
                        .then(calculateIntensity);
                });

                function calculateIntensity(response) {
                    var menuTweets = response.menuTweets,
                        nTweets = response.nTweets;

                    angular.forEach(Object.keys($scope.menuFlat), function(menuItemId) {
                        var menuItem = $scope.menuFlat[menuItemId].object;

                        menuItem.nTweets = 0;
                        menuItem.intensity = 0;
                    });

                    angular.forEach(Object.keys($scope.menuFlat), function(menuItemId) {
                        var menuItem = $scope.menuFlat[menuItemId].object,
                            menuItemParentIds = $scope.menuFlat[menuItemId].parents,
                            parent;

                        if (menuTweets[menuItem.id]) {
                            menuItem.nTweets += menuTweets[menuItem.id];

                            angular.forEach(menuItemParentIds, function(parentId) {
                                parent = $scope.menuFlat[parentId].object;
                                parent.nTweets += menuTweets[menuItem.id];
                            });
                        }
                    });

                    angular.forEach(Object.keys($scope.menuFlat), function(menuItemId) {
                        var menuItem = $scope.menuFlat[menuItemId].object;

                        menuItem.intensity = menuItem.nTweets/nTweets;
                    });
                }

                $scope.open = MenuService.open;

                $scope.getHighlightColor = function(item) {
                    var res = '';

                    if ($scope.filters.active) {
                        res = 'rgba(' + highlightColor + ', ' + item.intensity + ')';
                    }

                    return res;
                }
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