angular.module('tweetsToSoftware')
    .directive('menu', function($q, $document, MenuService, TweetService, TweetsFilter) {
       'use strict';

        return {
            restrict: 'E',
            templateUrl: 'scripts/templates/menu.html',
            scope: {},
            controller: function($scope) {
                var highlightColor = '69,131,255';

                $scope.filters = TweetsFilter;

                $q.all([
                    MenuService.get(),
                    MenuService.getFlat(),
                    TweetService.get()
                ])
                    .then(function(data) {
                        $scope.menu = data[0];
                        $scope.menuFlat = data[1];
                        $scope.allTweets = data[2];

                        buildStructure();

                        $scope.$watch('allTweets.tweets.length', function() {
                           // rebuild structure when new tweet is added
                            buildStructure();
                        });

                        $scope.$watchGroup(['filters.authors', 'filters.lowerTimeBound', 'filters.upperTimeBound'], function() {
                            // rebuild structure when filters get changed
                            buildStructure();
                        });
                    });

                function buildStructure() {
                    var totalTweets = 0;

                    angular.forEach($scope.menuFlat, function(menuFlatItem) {
                        menuFlatItem.object.tweets = [];
                        menuFlatItem.object.tweetsCount = 0;
                    });

                    angular.forEach($scope.allTweets.tweets, function(tweet) {
                        if (matchFilters(tweet)) {
                            totalTweets += 1;
                            $scope.menuFlat[tweet.commandId].object.tweets.push(tweet);
                            increaseTweetCounters(tweet.commandId);
                        }
                    });

                    angular.forEach($scope.menuFlat, function(menuFlatItem) {
                        menuFlatItem.object.intensity = menuFlatItem.object.tweetsCount/totalTweets;
                    });

                    function increaseTweetCounters(commandId) {
                        var menuItem = $scope.menuFlat[commandId];

                        menuItem.object.tweetsCount += 1;

                        if (menuItem.parents.length) {
                            increaseTweetCounters(menuItem.parents[menuItem.parents.length - 1]);
                        }
                    }

                }

                function matchFilters(tweet) {
                    // TODO: implement real functionality
                    return tweet.published > $scope.filters.lowerTimeBound;
                }

                $scope.open = MenuService.open;

                $scope.getHighlightColor = function(intensity) {
                    var res = '';

                    if ($scope.filters.active) {
                        res = 'rgba(' + highlightColor + ', ' + intensity + ')';
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