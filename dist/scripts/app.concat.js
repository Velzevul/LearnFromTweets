(function(window) {
    'use strict';

    var app = angular.module('tweetsToSoftware', ['app-templates', 'angularMoment']);

    window.app = app;
})(window);
angular.module('app-templates', ['templates/activityPanel.html', 'templates/authorsFilter.html', 'templates/menu.html', 'templates/menuNotification.html', 'templates/menuPopup.html', 'templates/timeline.html', 'templates/tweet.html', 'templates/tweetsWidget.html', 'templates/widgetNotification.html']);

angular.module("templates/activityPanel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/activityPanel.html",
    "<div class=\"app-panel\" ng-show=\"filters.active\">\n" +
    "    <div class=\"ap-header\">\n" +
    "        <div class=\"l-split\">\n" +
    "            <div class=\"l-split__right\">\n" +
    "                <button class=\"link\" ng-click=\"toggleFilters()\">(close)</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-split__left\">\n" +
    "                <div class=\"ap-header__title\">Tweet acvitity</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "\n" +
    "    <div class=\"grid grid--full\">\n" +
    "        <div class=\"grid__item two-thirds\">\n" +
    "            <div class=\"l-block-small\">\n" +
    "                <div class=\"ap-section\">\n" +
    "                    <div class=\"l-block-small\">\n" +
    "                        <div class=\"ap-section__header\">\n" +
    "                            <div class=\"ap-section__title\">Personalization (matching commands' indicators are highlighted in red)</div>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"l-list-inline\">\n" +
    "                        <div class=\"l-list-inline__item\">\n" +
    "                            <label>\n" +
    "                                <input type=\"checkbox\"\n" +
    "                                       ng-click=\"setFilters({highlightUnknown: !filters.highlightUnknown})\"\n" +
    "                                       ng-checked=\"filters.highlightUnknown\"/> Highlight commands I do not know\n" +
    "                            </label>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"l-list-inline__item\">\n" +
    "                            <label>\n" +
    "                                <input type=\"checkbox\"\n" +
    "                                       ng-click=\"setFilters({highlightRelevant: !filters.highlightRelevant})\"\n" +
    "                                       ng-checked=\"filters.highlightRelevant\"/> Highlight commands relevant to my work\n" +
    "                            </label>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "\n" +
    "            <timeline></timeline>\n" +
    "        </div><!--\n" +
    "        --><div class=\"grid__item one-third\">\n" +
    "            <authors-filter></authors-filter>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/authorsFilter.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/authorsFilter.html",
    "<div class=\"ap-section\">\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "        <div class=\"-split\">\n" +
    "            <div class=\"l-split__right\">\n" +
    "                <button class=\"link\"\n" +
    "                        ng-show=\"selectedAuthor.name\"\n" +
    "                        ng-click=\"unsetAuthorFilter()\">clear filter</button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div class=\"ap-section__title\">Authors</div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"ap-section__body ap-section__body--limited\">\n" +
    "        <div ng-repeat=\"author in authors | orderBy : '-tweetsCount'\">\n" +
    "            <div class=\"author\"\n" +
    "                 ng-class=\"{'author--selected': author.name == selectedAuthor.name}\"\n" +
    "                 ng-click=\"setAuthorFilter(author)\">\n" +
    "                <div class=\"l-media\">\n" +
    "                    <div class=\"l-media__figure\">\n" +
    "                        <div class=\"author__avatar\"\n" +
    "                             style=\"background-image: url({{author.avatar}});\"></div>\n" +
    "                    </div>\n" +
    "\n" +
    "                    <div class=\"l-media__body\">\n" +
    "                        <div class=\"l-split\">\n" +
    "                            <div class=\"l-split__right\">\n" +
    "                                <div class=\"author__tweets\">{{author.tweetsCount}} tweets</div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <div class=\"l-split__left\">\n" +
    "                                <div class=\"author__name\">@{{author.name}}</div>\n" +
    "                            </div>\n" +
    "                        </div>\n" +
    "\n" +
    "                        <div class=\"author__follow\">\n" +
    "                            <div class=\"l-list-inline l-list-inline--x-small\"\n" +
    "                                 ng-show=\"author.isFollowing\">\n" +
    "                                <div class=\"l-list-inline__item\">\n" +
    "                                    You follow @{{author.name}}\n" +
    "                                </div>\n" +
    "\n" +
    "                                <div class=\"l-list-inline__item\">\n" +
    "                                    <button class=\"link link--danger\"\n" +
    "                                            ng-click=\"toggleFollow($event, author)\">unfollow</button>\n" +
    "                                </div>\n" +
    "                            </div>\n" +
    "\n" +
    "                            <button class=\"link\"\n" +
    "                                    ng-click=\"toggleFollow($event, author)\"\n" +
    "                                    ng-hide=\"author.isFollowing\">follow @{{author.name}}</button>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/menu.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/menu.html",
    "<script type=\"text/ng-template\" id=\"menuDropdown\">\n" +
    "    <menu-notification  context=\"item\"\n" +
    "                        ng-show=\"item.isHighlighted && !item.children.length\"></menu-notification>\n" +
    "\n" +
    "    <menu-popup context=\"item\"\n" +
    "                ng-show=\"!item.children.length\"></menu-popup>\n" +
    "\n" +
    "    <div class=\"amd-item\"\n" +
    "         ng-class=\"{'amd-item--active': item.isOpen,\n" +
    "                    'amd-item--parent': item.children.length,\n" +
    "                    'amd-item--highlighted': item.isHighlighted}\"\n" +
    "         ng-mouseover=\"open(item.id)\">\n" +
    "\n" +
    "        <button class=\"amd-item__name\">{{item.label}}</button>\n" +
    "\n" +
    "        <span class=\"amd-item__counter\"\n" +
    "              ng-class=\"{'am-item__counter--mixed': (filters.highlightUnknown || filters.highlightRelevant) && item.highlightType == 'mixed',\n" +
    "                         'am-item__counter--highlighted': (filters.highlightUnknown || filters.highlightRelevant) && item.highlightType == 'highlighted'}\"\n" +
    "              ng-show=\"filters.active && item.nTweets && item.children.length\">{{item.nTweets}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div ng-show=\"item.children.length\">\n" +
    "        <div class=\"am-dropdown am-dropdown--nested\"\n" +
    "             ng-show=\"item.isOpen\">\n" +
    "            <div class=\"am-dropdown__slot\"\n" +
    "                 ng-repeat=\"item in item.children\"\n" +
    "                 ng-include=\"'menuDropdown'\"></div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</script>\n" +
    "\n" +
    "<div class=\"app-menu\">\n" +
    "    <ul class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "        <li class=\"l-list-inline__item\"\n" +
    "            ng-repeat=\"rootItem in menu\">\n" +
    "            <div class=\"app-menu__slot\">\n" +
    "                <div class=\"am-item\"\n" +
    "                     ng-class=\"{'am-item--active': rootItem.isOpen,\n" +
    "                                'am-item--highlighted': rootItem.isHighlighted}\"\n" +
    "                     ng-mouseover=\"open(rootItem.id)\">\n" +
    "                    <button class=\"am-item__name\">\n" +
    "                        <span class=\"l-list-inline l-list-inline--collapsed\">\n" +
    "                            <span class=\"l-list-inline__item is-middle-aligned\">\n" +
    "                                {{rootItem.label}}\n" +
    "                            </span>\n" +
    "\n" +
    "                            <span class=\"l-list-inline__item is-middle-aligned\"\n" +
    "                                  ng-show=\"filters.active\">\n" +
    "                                <span class=\"am-item__counter\"\n" +
    "                                      ng-class=\"{'am-item__counter--mixed': (filters.highlightUnknown || filters.highlightRelevant) && rootItem.highlightType == 'mixed',\n" +
    "                                                 'am-item__counter--highlighted': (filters.highlightUnknown || filters.highlightRelevant) && rootItem.highlightType == 'highlighted'}\"\n" +
    "                                      ng-show=\"rootItem.nTweets\">{{rootItem.nTweets}}</span>\n" +
    "                            </span>\n" +
    "                        </span>\n" +
    "                    </button>\n" +
    "                </div>\n" +
    "\n" +
    "                <div class=\"am-dropdown am-dropdown--root\"\n" +
    "                     ng-show=\"rootItem.isOpen\">\n" +
    "                    <div class=\"am-dropdown__slot\"\n" +
    "                         ng-repeat=\"item in rootItem.children\"\n" +
    "                         ng-include=\"'menuDropdown'\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </li>\n" +
    "    </ul>\n" +
    "</div>");
}]);

angular.module("templates/menuNotification.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/menuNotification.html",
    "<div class=\"popup\">\n" +
    "    <div class=\"p-body\">\n" +
    "        <div class=\"p-body__item\">\n" +
    "            <tweet tweet=\"data.menuMap[context.id]\"></tweet>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/menuPopup.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/menuPopup.html",
    "<div class=\"menu-popup\"\n" +
    "     ng-show=\"tweets.length\">\n" +
    "    <div class=\"menu-popup__counter\"\n" +
    "         ng-class=\"{'menu-popup__counter--mixed': (filters.highlightUnknown || filters.highlightRelevant) && context.highlightType == 'mixed',\n" +
    "                    'menu-popup__counter--highlighted': (filters.highlightUnknown || filters.highlightRelevant) && context.highlightType == 'highlighted'}\"\n" +
    "         ng-show=\"filters.active && context.nTweets\"\n" +
    "         ng-mouseover=\"show()\"\n" +
    "         ng-mouseleave=\"hide()\">{{context.nTweets}}</div>\n" +
    "\n" +
    "    <div class=\"menu-popup__indicator\"\n" +
    "         ng-show=\"(filters.active && !context.nTweets) ||\n" +
    "                  (!filters.active && context.nTweets)\"\n" +
    "         ng-mouseover=\"show()\"\n" +
    "         ng-mouseleave=\"hide()\">...</div>\n" +
    "\n" +
    "    <div class=\"popup\"\n" +
    "         ng-show=\"popupVisible\"\n" +
    "         ng-mouseover=\"show()\"\n" +
    "         ng-mouseleave=\"hide()\">\n" +
    "        <div class=\"p-header\">\n" +
    "            <div class=\"p-header__title\">Tweets about '{{context.label}}'</div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"p-body p-body--limited\">\n" +
    "            <div class=\"p-body__item\"\n" +
    "                 ng-class=\"{'p-body__item--last': $last}\"\n" +
    "                 ng-repeat=\"t in tweets\">\n" +
    "                <tweet tweet=\"t\"></tweet>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/timeline.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/timeline.html",
    "<div class=\"ap-section\">\n" +
    "    <div class=\"l-block\">\n" +
    "        <div class=\"l-split\">\n" +
    "            <div class=\"l-split__right\">\n" +
    "                <button class=\"link\"\n" +
    "                        ng-show=\"filterSet\"\n" +
    "                        ng-click=\"unsetTimeFilter()\">clear filter</button>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-split__left\">\n" +
    "                <div class=\"ap-section__title\">{{nTweets}} tweets in {{lowerTimeBound | amDateFormat:'MMM Do h:mm'}} - {{upperTimeBound | amDateFormat:'MMM Do h:mm'}}</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"timeline-slot\">\n" +
    "        <div id=\"timeline\"></div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/tweet.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/tweet.html",
    "<div class=\"tweet\">\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "        <div class=\"l-split\">\n" +
    "            <div class=\"l-split__right\">\n" +
    "                <div class=\"tweet__published\" am-time-ago=\"tweet.published\"></div>\n" +
    "            </div>\n" +
    "\n" +
    "            <div class=\"l-split__left\">\n" +
    "                <div class=\"tweet__author-name\">@{{tweet.author.name}}</div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"l-block-x-small\">\n" +
    "        <div class=\"tweet__text\">{{tweet.text}}</div>\n" +
    "    </div>\n" +
    "\n" +
    "    here be actions...\n" +
    "</div>");
}]);

angular.module("templates/tweetsWidget.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/tweetsWidget.html",
    "<div class=\"tweets-widget\" ng-hide=\"filters.active\">\n" +
    "    <div class=\"l-list-inline l-list-inline--x-small is-rtl\">\n" +
    "        <div class=\"l-list-inline__item is-middle-aligned is-ltr\">\n" +
    "            <button class=\"link\"\n" +
    "                    ng-click=\"toggleFilters()\">all activity</button>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"l-list-inline__item is-middle-aligned is-ltr\"\n" +
    "             ng-repeat=\"n in data.notifications\">\n" +
    "            <widget-notification notification=\"n\"></widget-notification>\n" +
    "        </div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module("templates/widgetNotification.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("templates/widgetNotification.html",
    "<div class=\"widget-notification\">\n" +
    "    <div ng-mouseover=\"showCommand()\"\n" +
    "         ng-mouseleave=\"hideCommand()\">\n" +
    "        <div class=\"widget-notification__author-avatar\"\n" +
    "             style=\"background-image: url({{notification.tweet.author.avatar}});\"></div>\n" +
    "        <div class=\"widget-notification__timestamp\">{{notification.tweet.posted}}</div>\n" +
    "    </div>\n" +
    "</div>");
}]);

angular.module('tweetsToSoftware')
    .factory('ActivityService', function($http, DataService) {
        'use strict';

        var activity,
            loaded,
            promise;

        function load() {
            var res = null;

            if (loaded) {
                var deferred = $q.defer();

                deferred.resolve();
                res = deferred.promise;
            } else {
                if (!promise) {
                    promise = $http.get('/data/activity.json')
                        .then(function(response) {
                            activity = response.data;

                            angular.forEach(activity, function(category) {
                                 angular.forEach(category, function(item) {
                                     item.parsedTime = moment(item.time).toDate();
                                     item.parsedTime.setMinutes(0);
                                 });
                            });
                        });
                }

                res = promise;
            }

            return res;
        }

        return {
            get: function() {
                return load()
                    .then(function() {
                        return activity;
                    });
            },
            getCounters: function() {
                return load()
                    .then(function() {
                        var counters = {},
                            filters = DataService.getFilters(),
                            upperBound,
                            lowerBound;

                        if (filters.time) {
                            lowerBound = filters.time.lower;
                            upperBound = filters.time.upper;
                        }

                        angular.forEach(activity, function(collection, key) {
                            if (key == 'total') { return; }

                            counters[key] = 0;

                            angular.forEach(collection, function(dataPoint) {
                                if (filters.time) {
                                    if ((dataPoint.parsedTime >= lowerBound) &&
                                        (dataPoint.parsedTime <= upperBound)) {
                                        counters[key] += dataPoint.nTweets;
                                    }
                                } else {
                                    counters[key] += dataPoint.nTweets;
                                }
                            });
                        });

                        return counters;
                    });
            }
        };
    });
angular.module('tweetsToSoftware')
    .factory('AuthorService', function($http) {
        'use strict';

        var authors,
            loaded,
            promise;

        function load() {
            var res = null;

            if (loaded) {
                var deferred = $q.defer();

                deferred.resolve();
                res = deferred.promise;
            } else {
                if (!promise) {
                    promise = $http.get('/data/authors.json')
                        .then(function(response) {
                            authors = response.data;
                        });
                }

                res = promise;
            }

            return res;
        }

        return {
            get: function() {
                return load()
                    .then(function() {
                        return authors;
                    });
            }
        };
    });
angular.module('tweetsToSoftware')
    .factory('DataService', function($rootScope, $q, $http) {
        'use strict';

        var tweets = [],
            domain = [],
            commandRelevancyData = {},
            commandVocabularyData = {},
            commandRelevancyThreshold = 85,
            commandVocabularyThreshold = 20,
            filters = {
                active: false,
                time: null,
                author: null,
                highlightRelevant: false,
                highlightUnknown: false
            },
            filteredData = {
                tweets: null,
                tweetsByItems: null,
                menuPersonalized: null,
                menuCounters: null
            },
            loaded,
            promise;

        function load() {
            var res = null;

            if (loaded) {
                var deferred = $q.defer();

                deferred.resolve();
                res = deferred.promise;
            } else {
                if (!promise) {
                    promise = $q.all([
                        $http.get('/data/tweets.json'),
                        $http.get('/data/domain.json'),
                        $http.get('/data/commandRelevancy.json'),
                        $http.get('/data/commandVocabulary.json')
                    ])
                        .then(function(response) {
                            tweets = response[0].data;
                            domain = response[1].data;
                            commandRelevancyData = response[2].data;
                            commandVocabularyData = response[3].data;

                            filterData();
                        });
                }

                res = promise;
            }

            return res;
        }

        function filterData() {
            //console.log('refilter');

            filteredData = {
                tweets: [],
                tweetsByItems: {},
                menuPersonalized: {},
                menuCounters: {}
            };

            angular.forEach(tweets, function(tweet) {
               if (matchFilters(tweet)) {
                   filteredData.tweets.push(tweet);

                   if (filteredData.tweetsByItems[tweet.commandId]) {
                       filteredData.tweetsByItems[tweet.commandId].push(tweet);
                   } else {
                       filteredData.tweetsByItems[tweet.commandId] = [tweet];
                   }

                   if (filteredData.menuCounters[tweet.commandId]) {
                       filteredData.menuCounters[tweet.commandId] += 1;
                   } else {
                       filteredData.menuCounters[tweet.commandId] = 1;
                   }

                   if (filters.highlightRelevant &&
                       filters.highlightUnknown &&
                       (commandRelevancyData[tweet.commandId] >= commandRelevancyThreshold) &&
                       (commandVocabularyData[tweet.commandId] <= commandVocabularyThreshold)) {
                       filteredData.menuPersonalized[tweet.commandId] = true;
                   } else if (filters.highlightRelevant &&
                              !filters.highlightUnknown &&
                              (commandRelevancyData[tweet.commandId] >= commandRelevancyThreshold)) {
                       filteredData.menuPersonalized[tweet.commandId] = true;
                   } else if (filters.highlightUnknown &&
                              !filters.highlightRelevant &&
                              (commandVocabularyData[tweet.commandId] <= commandVocabularyThreshold)) {
                       filteredData.menuPersonalized[tweet.commandId] = true;
                   } else {
                       filteredData.menuPersonalized[tweet.commandId] = false;
                   }
               }
            });

            function matchFilters(tweet) {
                if (filters.time) {
                    if ((moment(tweet.published).minutes(0).toDate() <= filters.time.lower) ||
                        (moment(tweet.published).minutes(0).toDate() >= filters.time.upper)) {
                        return false;
                    }
                }

                if (filters.author) {
                    if (tweet.author.name != filters.author.name) {
                        return false;
                    }
                }

                return true;
            }
        }

        return {
            toggleFilters: function() {
                filters.active = !filters.active;
                if (filters.active) {
                    $rootScope.$broadcast('filtersActivated');
                }
            },
            getFilters: function() {
                return filters;
            },
            setFilters: function(f) {
                if (f.time !== undefined) {
                    filters.time = f.time;
                    $rootScope.$broadcast('timeFiltersChanged');
                }

                if (f.author !== undefined) {
                    filters.author = f.author;
                    $rootScope.$broadcast('authorFiltersChanged');
                }

                if (f.highlightUnknown !== undefined) {
                    filters.highlightUnknown = f.highlightUnknown;
                    $rootScope.$broadcast('privacyFiltersChanged');
                }

                if (f.highlightRelevant !== undefined) {
                    filters.highlightRelevant = f.highlightRelevant;
                    $rootScope.$broadcast('privacyFiltersChanged');
                }

                $rootScope.$broadcast('filtersChanged');
                filterData();
            },
            getDomain: function() {
                return load()
                    .then(function() {
                        return domain;
                    });
            },
            getTweets: function(menuItemId) {
                return load()
                    .then(function() {
                        var result;

                        if (menuItemId) {
                            result = filteredData.tweetsByItems[menuItemId];
                        } else {
                            result = filteredData.tweets;
                        }

                        return result;
                    });
            },
            getMenuCounters: function() {
                return load()
                    .then(function() {
                        return filteredData.menuCounters;
                    });
            },
            getMenuItemsPrivacy: function() {
                return load()
                    .then(function() {
                        return filteredData.menuPersonalized;
                    });
            }
        }
    });
angular.module('tweetsToSoftware')
    .factory('MenuService', function($http, $q) {
       'use strict';

        var menu = [],
            menuFlat = {},
            loaded = false,
            promise = null;

        function load() {
            var res = null;

            if (loaded) {
                var deferred = $q.defer();

                deferred.resolve();
                res = deferred.promise;
            } else {
                if (!promise) {
                    promise = $http.get('/data/menu.json')
                        .then(function(response) {
                            menu = response.data;

                            function updateMap(item, index, parents) {
                                var label = parents.length ? [parents[parents.length - 1], item['label']].join('/') : item['label'];

                                item.id = label;

                                menuFlat[label] = {
                                    index: index,
                                    parents: parents,
                                    object: item
                                };

                                if (item['children'] && item['children'].length > 0) {
                                    angular.forEach(item['children'], function(child, childIndex) {
                                        var childPath = angular.copy(parents);

                                        childPath.push(label);
                                        updateMap(child, childIndex, childPath);
                                    });
                                }
                            }

                            angular.forEach(menu, function(item, index) {
                                updateMap(item, index, []);
                            });
                        });
                }

                res = promise;
            }

            return res;
        }

        function getItemTree(itemPath) {
            var result = [];

            if (menuFlat[itemPath]) {
                angular.forEach(menuFlat[itemPath].parents, function(parent) {
                    result.push(menuFlat[parent].object);
                });

                result.push(menuFlat[itemPath].object);
            }

            return result;
        }

        function deactivateAll() {
            angular.forEach(menuFlat, function(item) {
                item.object.isOpen = false;
                item.object.isHighlighted = false;
            });
        }

        return {
            get: function() {
                return load()
                    .then(function() {
                        return menu;
                    });
            },
            getFlat: function() {
                return load()
                    .then(function() {
                       return menuFlat;
                    });
            },
            open: function(itemPath) {
                var itemTree = getItemTree(itemPath),
                    result = false;

                if (itemTree.length) {
                    deactivateAll();

                    angular.forEach(itemTree, function(item) {
                        item.isOpen = true;
                    });

                    result = true;
                }

                return result;
            },
            highlight: function(itemPath) {
                var itemTree = getItemTree(itemPath),
                    result = false;

                if (itemTree.length) {
                    angular.forEach(itemTree, function(item) {
                        item.isHighlighted = true;
                    });

                    result = true;
                }

                return result;
            },
            hideAll: function() {
                deactivateAll();
            }
        };
    });
angular.module('tweetsToSoftware')
    .factory('NotificationService', function($q, $http, $timeout) {
        'use strict';

        var data = {
                notifications: [],
                menuMap: {}
            },
            mock = [],
            loaded = false,
            promise = null;

        function load() {
            var res = null;

            if (loaded) {
                var deferred = $q.defer();

                deferred.resolve();
                res = deferred.promise;
            } else {
                if (!promise) {
                    promise = $http.get('/data/notifications.json')
                        .then(function(response) {
                            loaded = true;
                            mock = response.data;
                        });
                }

                res = promise;
            }

            return res;
        }

        return {
            get: function() {
                return load()
                    .then(function() {
                        return data;
                    });
            },

            listen: function() {
                var delay = 3000;

                load()
                    .then(function() {
                        angular.forEach(mock, function(item) {
                            $timeout(function() {
                                data.notifications.push(item);
                                data.menuMap[item.command] = item.tweet;
                            }, delay);

                            delay += 3000;
                        });
                    });
            }
        };
    });
angular.module('tweetsToSoftware')
    .controller('mainController', function($scope) {
        'use strict';
    });
angular.module('tweetsToSoftware')
    .directive('activityPanel', function(DataService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/activityPanel.html',
            scope: {},
            controller: function($scope) {
                $scope.filters = DataService.getFilters();
                $scope.toggleFilters = DataService.toggleFilters;
                $scope.setFilters = DataService.setFilters;
            }
        };
    });

angular.module('tweetsToSoftware')
    .directive('authorsFilter', function($q, AuthorService, ActivityService, DataService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/authorsFilter.html',
            scope: {},
            controller: function($scope) {
                $q.all([
                    AuthorService.get(),
                    ActivityService.getCounters()
                ])
                    .then(function(response) {
                        $scope.authors = response[0];
                        var authorCounters = response[1];

                        angular.forEach($scope.authors, function(author) {
                            author.tweetsCount = authorCounters[author.name];
                        });
                    });

                $scope.$on('filtersChanged', function() {
                    ActivityService.getCounters()
                        .then(function(response) {
                            var authorCounters = response;

                            angular.forEach($scope.authors, function(author) {
                                author.tweetsCount = authorCounters[author.name];
                            });
                        });
                });

                $scope.setAuthorFilter = function(author) {
                    $scope.selectedAuthor = author;

                    DataService.setFilters({
                        author: author
                    });
                };

                $scope.unsetAuthorFilter = function() {
                    $scope.selectedAuthor = null;

                    DataService.setFilters({
                        author: null
                    });
                };

                $scope.toggleFollow = function(e, author) {
                    e.stopPropagation();
                    author.isFollowing = !author.isFollowing;
                };
            }
        }
    });
angular.module('tweetsToSoftware')
    .directive('menu', function($q, $document, MenuService, DataService) {
       'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/menu.html',
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

angular.module('tweetsToSoftware')
    .directive('menuNotification', function(NotificationService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/menuNotification.html',
            scope: {
                context: '='
            },
            controller: function($scope) {
                NotificationService.get()
                    .then(function(data) {
                        $scope.data = data;
                    });
            }
        }
    });
angular.module('tweetsToSoftware')
    .directive('menuPopup', function($timeout, DataService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/menuPopup.html',
            scope: {
                context: '='
            },
            controller: function($scope) {
                $scope.filters = DataService.getFilters();
                $scope.popupVisible = false;

                DataService.getTweets($scope.context.id)
                    .then(function(response) {
                         $scope.tweets = response;
                    });

                $scope.$on('filtersChanged', function() {
                    DataService.getTweets($scope.context.id)
                        .then(function(response) {
                            $scope.tweets = response;
                        });
                });

                var showTimeoutId = null,
                    hideTimeoutId = null,
                    showDelay = 300,
                    hideDelay = 20;

                $scope.show = function() {
                    clearTimeout(showTimeoutId);
                    clearTimeout(hideTimeoutId);

                    showTimeoutId = $timeout(function() {
                        $scope.popupVisible = true;
                    }, showDelay).$$timeoutId;
                };

                $scope.hide = function() {
                    clearTimeout(showTimeoutId);
                    clearTimeout(hideTimeoutId);

                    hideTimeoutId = $timeout(function() {
                        $scope.popupVisible = false;
                    }, hideDelay).$$timeoutId;
                };
            }
        };
    });
angular.module('tweetsToSoftware')
    .directive('timeline', function($window, $q, $timeout, DataService, ActivityService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/timeline.html',
            scope: {},
            link: function($scope, elem) {
                var margin = {top: 24, right: 24, bottom: 50, left: 50},
                    parseDate = d3.time.format('%Y-%m-%d %H:%M:%S').parse,
                    height = 250 - margin.top - margin.bottom,
                    redrawTimeoutId = null;

                var x = d3.time.scale(),
                    y = d3.scale.linear();

                var daysAxis = d3.svg.axis()
                        .ticks(d3.time.days)
                        .innerTickSize(18)
                        .outerTickSize(0)
                        .tickFormat(function(d) {
                            return moment(d).format('MMM Do');
                        }),
                    halfDaysAxis = d3.svg.axis()
                        .ticks(d3.time.hours, 3)
                        .innerTickSize(12)
                        .outerTickSize(0)
                        .tickFormat(function(d) {
                            if (d.getHours()) {
                                return moment(d).format('HH:00');
                            } else {
                                return '';
                            }
                        }),
                    hoursAxis = d3.svg.axis()
                        .ticks(d3.time.hours)
                        .innerTickSize(6)
                        .outerTickSize(1)
                        .tickFormat(function(d) {
                            return '';
                        }),
                    yAxis = d3.svg.axis()
                        .ticks(5)
                        .tickFormat(d3.format('f'))
                        .orient('left');

                var area = d3.svg.area(),
                    line = d3.svg.line(),
                    svg = d3.select('#timeline').append('svg'),
                    canvas = svg.append('g'),
                    brush = d3.svg.brush();

                area.interpolate("monotone")
                    .x(function(d) { return x(d.parsedTime); })
                    .y0(height)
                    .y1(function(d) { return y(d.nTweets); });

                line.interpolate("monotone")
                    .x(function(d) { return x(d.parsedTime); })
                    .y(function(d) { return y(d.nTweets); });

                canvas.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

                function drawAxes(data, domain) {
                    //console.log('draw axes');

                    var width = $('#timeline').width() - margin.right - margin.left;

                    svg.attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom);

                    x.range([0, width])
                        .domain([d3.min(domain, function(d) {
                            var bound = parseDate(d);
                            bound.setMinutes(0);
                            return bound;
                        }), d3.max(domain, function(d) {
                            return parseDate(d);
                        })]);

                    y.range([height, 0])
                        .domain([0, d3.max(data, function(item) { return item.nTweets; }) + 2]);

                    daysAxis.scale(x);
                    halfDaysAxis.scale(x);
                    hoursAxis.scale(x);
                    yAxis.scale(y);

                    $('.axis').remove();

                    canvas.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(daysAxis);

                    canvas.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(halfDaysAxis);

                    canvas.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(hoursAxis);

                    canvas.append('g')
                        .attr('class', 'axis')
                        .call(yAxis);
                }

                function drawGhostChart(data, className) {
                    //console.log('draw ghost chart');

                    $('.' + className).remove();

                    canvas.append('path')
                        .attr('class', className)
                        .attr('d', area(data));
                }

                function drawChart(data) {
                    //console.log('draw chart');

                    $('.line, .area, .dot').remove();

                    $scope.nTweets = 0;

                    var matchingData = [];
                    angular.forEach(data, function(dataPoint) {
                        if ((dataPoint.parsedTime >= $scope.lowerTimeBound) &&
                            (dataPoint.parsedTime <= $scope.upperTimeBound)) {
                            matchingData.push(dataPoint);
                            $scope.nTweets += dataPoint.nTweets;
                        }
                    });

                    canvas.append('path')
                        .attr('class', 'area')
                        .attr('d', area(matchingData));

                    canvas.append('path')
                        .attr('class', 'line')
                        .attr('d', line(matchingData));

                    canvas.selectAll('.dot')
                            .data(matchingData)
                        .enter().append('circle')
                            .attr('class', 'dot')
                            .attr('r', 2.5)
                            .attr('cx', function(d) { return x(d.parsedTime); })
                            .attr('cy', function(d) { return y(d.nTweets); });
                }

                function setBrush() {
                    //console.log('set brush');
                    $('.brush').remove();

                    brush.x(x)
                        .on('brush', function() {
                            var b = brush.extent();

                            $scope.lowerTimeBound = b[0];
                            $scope.upperTimeBound = b[1];

                            drawChart($scope.chart);
                            setBrush();
                        })
                        .on('brushend', setTimeFilter);

                    canvas.append("g")
                        .attr("class", "brush")
                        .call(brush)
                        .selectAll("rect")
                        .attr("height", height);
                }

                $scope.filterSet = false;

                function setTimeFilter() {
                    var b = brush.extent();

                    DataService.setFilters({
                        time: {
                            lower: b[0],
                            upper: b[1]
                        }
                    });

                    $scope.filterSet = true;
                }

                $scope.unsetTimeFilter = function() {
                    var b = brush.extent();

                    d3.selectAll('.brush').call(brush.clear());

                    $scope.lowerTimeBound = $scope.domainLowerBound;
                    $scope.upperTimeBound = $scope.domainUpperBound;

                    DataService.setFilters({
                        time: null
                    });

                    $scope.filterSet = false;
                    drawChart($scope.chart);
                };

                $scope.$on('filtersActivated', function() {
                    $timeout(function() {
                        $q.all([
                            ActivityService.get(),
                            DataService.getDomain()
                        ])
                            .then(function(response) {
                                var filter = DataService.getFilters();

                                $scope.activity = response[0];
                                $scope.domain = response[1];

                                if (filter.author) {
                                    $scope.ghost = $scope.activity[filter.author.name];
                                    $scope.chart = $scope.activity[filter.author.name];
                                } else {
                                    $scope.ghost = $scope.activity.total;
                                    $scope.chart = $scope.activity.total;
                                }

                                $scope.domainLowerBound = moment($scope.domain[0]).minutes(0).toDate();
                                $scope.domainUpperBound = moment($scope.domain[$scope.domain.length - 1]).minutes(0).toDate();

                                if (!$scope.lowerTimeBound) {
                                    $scope.lowerTimeBound = $scope.domainLowerBound;
                                }

                                if (!$scope.upperTimeBound) {
                                    $scope.upperTimeBound = $scope.domainUpperBound;
                                }

                                drawAxes($scope.activity.total, $scope.domain);
                                drawGhostChart($scope.activity.total, 'ghost-total');

                                drawGhostChart($scope.ghost, 'ghost-area');
                                drawChart($scope.chart);
                                setBrush();
                            });
                    });
                });

                $(window).on('resize', function() {
                    clearTimeout(redrawTimeoutId);
                    redrawTimeoutId = $timeout(function() {
                        drawAxes($scope.activity.total, $scope.domain);

                        drawGhostChart($scope.ghost, 'ghost-area');
                        drawChart($scope.chart);
                        setBrush();
                    }, 300).$$timeoutId;
                });

                $scope.$on('authorFiltersChanged', changeListener);

                function changeListener() {
                    var filter = DataService.getFilters();

                    if (filter.author) {
                        $scope.ghost = $scope.activity[filter.author.name];
                        $scope.chart = $scope.activity[filter.author.name];
                    } else {
                        $scope.ghost = $scope.activity.total;
                        $scope.chart = $scope.activity.total;
                    }

                    drawGhostChart($scope.ghost, 'ghost-area');
                    drawChart($scope.chart);
                    setBrush();
                }
            }
        }
    });
angular.module('tweetsToSoftware')
    .directive('tweet', function($timeout) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/tweet.html',
            scope: {
                tweet: '='
            },
            controller: function($scope) {
            }
        }
    });
angular.module('tweetsToSoftware')
    .directive('tweetsWidget', function($timeout, NotificationService, DataService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/tweetsWidget.html',
            scope: {},
            controller: function($scope) {
                NotificationService.get()
                    .then(function(data) {
                        $scope.data = data;
                    });

                NotificationService.listen();

                $scope.toggleFilters = DataService.toggleFilters;
                $scope.filters = DataService.getFilters();
            }
        }
    });
angular.module('tweetsToSoftware')
    .directive('widgetNotification', function($timeout, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/widgetNotification.html',
            scope: {
                notification: '='
            },
            controller: function($scope) {
                var showTimeoutId = null,
                    showDelay = 50;

                $scope.showCommand = function() {
                    clearTimeout(showTimeoutId);

                    showTimeoutId = $timeout(function() {
                        MenuService.hideAll();
                        MenuService.open($scope.notification.command);
                        MenuService.highlight($scope.notification.command);
                    }, showDelay).$$timeoutId;
                };

                $scope.hideCommand = function() {
                    clearTimeout(showTimeoutId);
                }
            }
        }
    });