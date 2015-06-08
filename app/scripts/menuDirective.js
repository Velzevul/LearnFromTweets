angular.module('tweetsToSoftware')
    .directive('menu', function($q, $document, MenuService) {
       'use strict';

        return {
            restrict: 'E',
            templateUrl: 'menu.html',
            scope: {},
            controller: function($scope) {
                MenuService.loaded
                    .then(function() {
                        $scope.menu = MenuService.menu.all;
                    });

                $scope.open = function(menuItem) {
                    MenuService.open(menuItem, MenuService.menu);

                    if (!menuItem.children) {
                        MenuService.showTweets(menuItem)
                    }
                };

                $scope.hide = MenuService.hideTweets;
            },
            link: function($scope) {
                $document.on('click', function(e) {
                    var isPopup = $(e.target).parents('.popup').length ||
                            $(e.target).hasClass('popup'),
                        isTrigger = $(e.target).parents('.menu-popup__indicator').length ||
                            $(e.target).hasClass('menu-popup__indicator');

                    if (!isPopup && !isTrigger) {
                        MenuService.reset(MenuService.menu);
                        $scope.$apply();
                    }
                });
            }
        };
    });
