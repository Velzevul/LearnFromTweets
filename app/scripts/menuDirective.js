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

                        $scope.$watchGroup(['filters.authors.length', 'filters.lowerTimeBound', 'filters.upperTimeBound'], function() {
                            // rebuild structure when filters get changed
                            buildStructure();
                        });
                    });

                function buildStructure() {
                    var totalTweets = 0,
                        availableAuthors = {};

                    angular.forEach($scope.menuFlat, function(menuFlatItem) {
                        menuFlatItem.object.tweets = [];
                        menuFlatItem.object.tweetsCount = 0;
                    });

                    angular.forEach($scope.allTweets.tweets, function(tweet) {
                        if (matchFilters(tweet)) {
                            if (availableAuthors[tweet.author.name]) {
                                availableAuthors[tweet.author.name].tweetsCount += 1;
                            } else {
                                availableAuthors[tweet.author.name] = angular.copy(tweet.author);
                                availableAuthors[tweet.author.name].tweetsCount = 1;
                            }

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

                    $scope.availableAuthors = [];
                    for (var key in availableAuthors) {
                        $scope.availableAuthors.push(availableAuthors[key]);
                    }
                }

                function matchFilters(tweet) {
                    // TODO: implement real functionality
                    console.log(tweet.author.name, $scope.filters.authors)
                    if ($scope.filters.authors.length &&
                        ($scope.filters.authors.indexOf(tweet.author.name) == -1)) {
                        return false;
                    }

                    if ($scope.filters.lowerTimeBound &&
                        (tweet.published < $scope.filters.lowerTimeBound)) {
                        return false;
                    }

                    if ($scope.filters.upperTimeBound &&
                        (tweet.published > $scope.filters.upperTimeBound)) {
                        return false;
                    }

                    return true;
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