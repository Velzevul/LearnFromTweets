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
                    DataService.getMenuTweets()
                ])
                    .then(function(data) {
                        $scope.menu = data[0];

                        var menuTweets = data[2].menuTweets,
                            menuFlat = data[1],
                            nTweets = data[2].nTweets;

                        angular.forEach(menuFlat, function(itemFlat) {
                            itemFlat.object.nTweets = 0;
                            itemFlat.object.intensity = 0;

                            if (menuTweets[itemFlat.object.id]) {
                                itemFlat.object.nTweets = menuTweets[itemFlat.object.id];
                                itemFlat.object.intensity = menuTweets[itemFlat.object.id]/nTweets;
                            }
                        });

                        debugger;
                    });

                $scope.$on('filtersChanged', function() {
                    DataService.getMenuTweets()
                        .then(function(response) {
                            var menuTweets = response.menuTweets,
                                nTweets = response.nTweets;

                            angular.forEach($scope.menu, function(item) {
                                item.nTweets = 0;
                                item.intensity = 0;

                                if (menuTweets[item.id]) {
                                    item.nTweets = menuTweets[item.id];
                                    item.intensity = menuTweets[item.id]/nTweets;
                                }
                            });
                        });
                });

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