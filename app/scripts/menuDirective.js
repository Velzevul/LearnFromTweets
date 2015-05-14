angular.module('tweetsToSoftware')
    .directive('menu', function($q, $document, MenuService, FilterService, Notification) {
       'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/menu.html',
            scope: {},
            controller: function($scope) {
                $scope.filters = FilterService.get();
                $scope.notification = Notification;

                $q.all([
                    MenuService.get(),
                    MenuService.getFlat()
                ])
                    .then(function(data) {
                        $scope.menu = data[0];
                        $scope.menuFlat = data[1];
                    });

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
