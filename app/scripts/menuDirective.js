angular.module('tweetsToSoftware')
    .directive('menu', function($q, $document, MenuService, FilterService) {
       'use strict';

        return {
            restrict: 'E',
            templateUrl: 'menu.html',
            scope: {},
            controller: function($scope) {
                //$scope.filters = FilterService.get();
                //$scope.notification = Notification;

                MenuService.loaded
                    .then(function() {
                        $scope.menu = MenuService.menu.all;
                    });

                $scope.open = function(menuItem) {
                    MenuService.open(menuItem, MenuService.menu);
                };
            },
            link: function($scope) {
                $document.on('click', function(e) {
                    var isPopup = $(e.target).parents('.popup').length ||
                            $(e.target).hasClass('popup'),
                        isTrigger = $(e.target).parents('.menu-popup__indicator').length ||
                            $(e.target).hasClass('menu-popup__indicator');

                    if (!isPopup && !isTrigger) {
                        MenuService.deactivate(MenuService.menu);
                        $scope.$apply()
                    }
                });
            }
        };
    });
