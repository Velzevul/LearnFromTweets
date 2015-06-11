// Closure
(function() {
    /**
     * Decimal adjustment of a number.
     *
     * @param {String}  type  The type of adjustment.
     * @param {Number}  value The number.
     * @param {Integer} exp   The exponent (the 10 logarithm of the adjustment base).
     * @returns {Number} The adjusted value.
     */
    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    // Decimal round
    if (!Math.round10) {
        Math.round10 = function(value, exp) {
            return decimalAdjust('round', value, exp);
        };
    }
    // Decimal floor
    if (!Math.floor10) {
        Math.floor10 = function(value, exp) {
            return decimalAdjust('floor', value, exp);
        };
    }
    // Decimal ceil
    if (!Math.ceil10) {
        Math.ceil10 = function(value, exp) {
            return decimalAdjust('ceil', value, exp);
        };
    }
})();
(function(window) {
    'use strict';

    var app = angular.module('tweetsToSoftware',
        [
            'app-templates',
            'angularMoment',
            'truncate'
        ]);

    window.app = app;
})(window);
angular.module('tweetsToSoftware')
    .factory('ActivityService', function($http, FilterService) {
        'use strict';

        var activity,
            domain,
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
                            filters = FilterService.get(),
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
    .factory('AuthorService', function($q, $http) {
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

                            loaded = true;
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
    .factory('FilterService', function() {
        'use strict';

        var filters = {
                time: null,
                highlightRelevant: false,
                highlightUnfamiliar: false
            };

        return {
            filters: filters,
            matchTweet: function(tweet) {
                if (filters.time) {
                    if ((tweet.published.toDate() <= filters.time.lower) ||
                        (tweet.published.toDate() >= filters.time.upper)) {
                        return false;
                    }
                }

                if (filters.highlightRelevant &&
                    !tweet.hasRelevant) {
                    return false;
                }

                if (filters.highlightUnfamiliar &&
                    !tweet.hasUnfamiliar) {
                    return false;
                }

                return true;
            }
        };
    });
angular.module('tweetsToSoftware')
    .factory('MenuService', function($timeout, $http, $q) {
       'use strict';

        var menu = {
                all: [],
                byId: {}
            },
            toolbar = {
                all: [],
                byId: {}
            },
            panelbar = {
                all: [],
                byId: {}
            },
            promise,
            showTweetsDelay = 400,
            hideTweetsDelay = 20;

        console.time('Menu load');
        promise = $q.all([
            $http.get('/data/commandsExtra.json'),
            $http.get('/data/toolsExtra.json'),
            $http.get('/data/panelsExtra.json')
        ])
            .then(function(response) {
                console.timeEnd('Menu load');
                console.time('Menu processing');

                menu.all = response[0].data;
                toolbar.all = response[1].data;
                panelbar.all = response[2].data;

                populateIdMap(menu.all, menu.byId, []);
                populateIdMap(toolbar.all, toolbar.byId, []);
                populateIdMap(panelbar.all, panelbar.byId, []);
                console.timeEnd('Menu processing');
            });

        function populateIdMap(all, byId, parents) {
            angular.forEach(all, function(one) {
                if (!one.divider) {
                    one.parents = parents;

                    if (byId[one.id]) {
                        console.error('entry already exists:', byId[one.id], one);
                    } else {
                        byId[one.id] = one;
                    }

                    if (one.children) {
                        var childParents = [];
                        angular.forEach(parents, function(parent) {
                            childParents.push(parent);
                        });
                        childParents.push(one);

                        populateIdMap(one.children, byId, childParents);
                    }
                }
            });
        }

        function reset(menu) {
            angular.forEach(menu.byId, function(item) {
                item.isOpen = false;
                item.tweetsShown = false;
            });
        }

        return {
            loaded: promise,
            menu: menu,
            toolbar: toolbar,
            panelbar: panelbar,
            reset: reset,
            resetAll: function() {
                reset(menu);
                reset(toolbar);
                reset(panelbar);
            },
            open: function(item, menu) {
                reset(menu);

                angular.forEach(item.parents, function(parent) {
                    parent.isOpen = true;
                });

                item.isOpen = true;
            },
            showTweets: function(item, showDelay) {
                if (showDelay === undefined) {
                    showDelay = showTweetsDelay;
                }

                clearTimeout(item.showTweetsTimeoutId);
                clearTimeout(item.hideTweetsTimeoutId);

                item.showTweetsTimeoutId = $timeout(function() {
                    item.tweetsShown = true;
                }, showDelay).$$timeoutId;
            },
            hideTweets: function(item) {
                clearTimeout(item.showTweetsTimeoutId);
                clearTimeout(item.hideTweetsTimeoutId);

                item.hideTweetsTimeoutId = $timeout(function () {
                    item.tweetsShown = false;
                }, hideTweetsDelay).$$timeoutId;
            },
            registerTweet: function(tweet, menuItemId, menu) {
                var menuItem = menu.byId[menuItemId];

                menuItem.tweets.push(tweet);

                angular.forEach(menuItem.parents, function(parent) {
                    parent.tweets.push(tweet);
                });
            },
            resetTweets: function() {
                angular.forEach(menu.byId, function(menuItem) {
                     menuItem.tweets = [];
                });

                angular.forEach(toolbar.byId, function(tool) {
                    tool.tweets = [];
                });

                angular.forEach(panelbar.byId, function(panel) {
                    panel.tweets = [];
                });
            }
        };
    });
angular.module('tweetsToSoftware')
    .factory('TweetService', function($q, $http, MenuService) {
        'use strict';

        var tweets = {
                all: [],
                byId: {},
                byAuthor: {},
                byCommand: {},
                byPanel: {},
                byTool: {},
                active: null
            },
            authors = [],
            domain = [],
            promise,
            relevancyThreshold = 95,
            familiarityThreshold = 20;

        window.p = $http.get('/data/tweets.json');

        console.time('Tweets load');
        promise = $q.all([
            $http.get('/data/tweets.json'),
            MenuService.loaded
        ])
            .then(function(response) {
                console.timeEnd('Tweets load');
                console.time('Tweets process');

                tweets.all = response[0].data;

                var processedAuthors = [],
                    processedDates = [];

                angular.forEach(tweets.all, function(tweet) {

                    tweet.published = moment(tweet.published, "h:m a - DD MM YYYY");

                    if (processedAuthors.indexOf(tweet.author.screenName) == -1) {
                        authors.push(tweet.author);
                        processedAuthors.push(tweet.author.screenName);
                    }

                    if (processedDates.indexOf(tweet.published.format()) == -1) {
                        domain.push(tweet.published.toDate());
                        processedDates.push(tweet.published.format());
                    }

                    var tweetContext = [];

                    tweet.commandRefs = getMenus(tweet.tweet.commands, MenuService.menu);
                    Array.prototype.push.apply(tweetContext, tweet.commandRefs);
                    tweet.toolRefs = getMenus(tweet.tweet.tools, MenuService.toolbar);
                    Array.prototype.push.apply(tweetContext, tweet.toolRefs);
                    tweet.panelRefs = getMenus(tweet.tweet.panels, MenuService.panelbar);
                    Array.prototype.push.apply(tweetContext, tweet.panelRefs);

                    tweet.hasUnfamiliar = false;
                    tweet.hasRelevant = false;

                    angular.forEach(tweetContext, function(c) {
                        if (c.familiarity < familiarityThreshold) {
                            tweet.hasUnfamiliar = true;
                        }

                        if (c.relevancy > relevancyThreshold) {
                            tweet.hasRelevant = true;
                        }
                    });
                });

                populateMap(tweets.all, tweets.byId, true, function(item) {
                    return item.id;
                });
                populateMap(tweets.all, tweets.byAuthor, false, function(item) {
                    return item.author.screenName;
                });
                populateMap(tweets.all, tweets.byCommand, false, function(item) {
                    return item.tweet.commands || [];
                });
                populateMap(tweets.all, tweets.byTool, false, function(item) {
                    return item.tweet.tools || [];
                });
                populateMap(tweets.all, tweets.byPanel, false, function(item) {
                    return item.tweet.panels || [];
                });

                console.timeEnd('Tweets process');
            });

        function getMenus(commandIds, menu) {
            var commands = [];

            angular.forEach(commandIds, function(c) {
                commands.push(menu.byId[c]);
            });

            return commands;
        }

        function populateMap(all, map, uniqueFlag, propertyRetrievalCallback) {
            angular.forEach(all, function(one) {
                var property = propertyRetrievalCallback(one);

                if (Object.prototype.toString.call(property) === '[object Array]') {
                    angular.forEach(property, function(key) {
                        storeInMap(one, key);
                    });
                } else {
                    storeInMap(one, property);
                }

                function storeInMap(obj, key) {
                    if (map[key]) {
                        if (uniqueFlag) {
                            console.error('entry already exists:', map[key], obj);
                        } else {
                            map[key].push(obj);
                        }
                    } else {
                        if (uniqueFlag) {
                            map[key] = obj;
                        } else {
                            map[key] = [obj];
                        }
                    }
                }
            });
        }

        return {
            loaded: promise,
            tweets: tweets,
            authors: authors,
            domain: domain,
            activate: function(tweet) {
                tweets.active = tweet;
            },
            deactivate: function() {
                tweets.active = null;
            }
        }
    });
angular.module('tweetsToSoftware')
    .directive('activeTweet', function(TweetService, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'activeTweet.html',
            scope: {},
            controller: function($scope) {
                $scope.tweets = TweetService.tweets;

                $scope.deactivate = TweetService.deactivate;

                $scope.highlightMenuItem = function(command) {
                    MenuService.resetAll();
                    MenuService.open(command, MenuService.menu);
                };

                $scope.highlightTool = function(tool) {
                    MenuService.resetAll();
                    MenuService.open(tool, MenuService.toolbar);
                };

                $scope.highlightPanel = function(panel) {
                    MenuService.resetAll();
                    MenuService.open(panel, MenuService.panelbar);
                };

                $scope.reset = MenuService.resetAll;
            }
        };
    });

angular.module('tweetsToSoftware')
    .directive('activity', function($q, TweetService, MenuService, FilterService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'activity.html',
            scope: {},
            replace: true,
            controller: function($scope) {
                $scope.filters = FilterService.filters;

                $q.all([
                    TweetService.loaded,
                    MenuService.loaded
                ])
                    .then(function() {
                        registerTweets(TweetService.tweets.all);

                        $scope.$watchGroup([
                            'filters.time',
                            'filters.highlightUnfamiliar',
                            'filters.highlightRelevant'
                        ], function() {
                            registerTweets(TweetService.tweets.all);
                        });
                    });

                function registerTweets(tweets) {
                    console.time('Tweet registration');

                    MenuService.resetTweets();
                    angular.forEach(tweets, register);

                    console.timeEnd('Tweet registration');

                    function register(tweet) {
                        if (FilterService.matchTweet(tweet)) {
                            if (tweet.tweet.commands) {
                                angular.forEach(tweet.tweet.commands, function(c) {
                                    MenuService.registerTweet(tweet, c, MenuService.menu);
                                });
                            }

                            if (tweet.tweet.tools) {
                                angular.forEach(tweet.tweet.tools, function(t) {
                                    MenuService.registerTweet(tweet, t, MenuService.toolbar);
                                });
                            }

                            if (tweet.tweet.panels) {
                                angular.forEach(tweet.tweet.panels, function(p) {
                                    MenuService.registerTweet(tweet, p, MenuService.panelbar);
                                });
                            }
                        }
                    }
                }

            }
        };
    });

angular.module('tweetsToSoftware')
    .directive('author', function(FilterService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'author.html',
            scope: {
                author: '='
            },
            controller: function($scope) {
                $scope.filters = FilterService.get();

                $scope.setAuthorFilter = function() {
                    $scope.filters.author = $scope.author;
                };

                $scope.toggleFollow = function(e) {
                    e.stopPropagation();
                    $scope.author.isFollowing = !$scope.author.isFollowing;
                };
            }
        }
    });
angular.module('tweetsToSoftware')
    .directive('authorsFilter', function($q, TweetService, AuthorService, FilterService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'authorsFilter.html',
            scope: {},
            controller: function($scope) {
                $scope.filters = FilterService.get();

                AuthorService.get()
                    .then(function(authors) {
                        $scope.authors = authors;

                        angular.forEach($scope.authors, function(a) {
                            TweetService.getByAuthor(a.name)
                                .then(function(tweets) {
                                    a.tweetsCount = tweets.length;
                                });
                        });
                    });

                $scope.unsetAuthorFilter = function() {
                    $scope.filters.author = null;
                };
            }
        }
    });
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

angular.module('tweetsToSoftware')
    .directive('panel', function($document, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'panel.html',
            scope: {
                panel: '='
            },
            controller: function($scope) {
                $scope.openPanel = function() {
                    MenuService.open($scope.panel, MenuService.panelbar);
                    MenuService.showTweets($scope.panel, 0);
                };
            },
            link: function($scope) {
                $document.on('click', function(e) {
                    var isPanel = $(e.target).parents('.panelbar-item').length ||
                            $(e.target).hasClass('panelbar-item');

                    if (!isPanel) {
                        MenuService.reset(MenuService.panelbar);
                        $scope.$apply()
                    }
                });
            }
        };
    });
angular.module('tweetsToSoftware')
    .directive('panelbar', function(MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'panelbar.html',
            scope: {},
            controller: function($scope) {
                MenuService.loaded
                    .then(function() {
                        $scope.panels = MenuService.panelbar.all;
                    });
            }
        }
    });
angular.module('tweetsToSoftware')
    .directive('timeline', function($window, $q, $timeout, TweetService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'timeline.html',
            scope: {},
            link: function($scope) {
                var margin = {top: 0, right: 12, bottom: 48, left: 12},
                    height = 200 - margin.top - margin.bottom,
                    authorCircleRadius = 12,
                    circlesMargin = 6,
                    redrawTimeoutId;

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
                        .ticks(d3.time.hours, 6)
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
                        .tickFormat(''),
                    gridAxis = d3.svg.axis()
                        .ticks(d3.time.hours)
                        .tickSize(height)
                        .tickFormat('');

                var svg = d3.select('#timeline').append('svg'),
                    canvas = svg.append('g'),
                    brush = d3.svg.brush(),
                    circles;

                canvas.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
                    .attr('id', 'svg-canvas');

                function drawAxes(domain) {
                    var width = $('#timeline').width() - margin.right - margin.left;

                    svg.attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom);

                    x.range([0, width])
                        .domain([d3.min(domain, function(d) {
                            var bound = moment(d).toDate();
                            bound.setMinutes(0);
                            return bound;
                        }), d3.max(domain, function(d) {
                            var bound = moment(d).toDate();
                            bound.setMinutes(0);
                            bound.setHours(bound.getHours() + 1);
                            return bound;
                        })]);

                    y.range([height, 0])
                        .domain([0, 10]);

                    daysAxis.scale(x);
                    halfDaysAxis.scale(x);
                    hoursAxis.scale(x);
                    gridAxis.scale(x);

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
                        .attr('class', 'axis axis--grid')
                        .call(gridAxis)
                }

                function drawPortraitPatterns(authors) {
                    var defs = svg.append('defs');

                    angular.forEach(authors, function(a) {
                        if (!document.getElementById('bg-author-' + a.screenName)) {
                            defs
                                .append("pattern")
                                    .attr("id", "bg-author-" + a.screenName)
                                    .attr('width', authorCircleRadius * 2)
                                    .attr('height', authorCircleRadius * 2)
                                .append("image")
                                    .attr("xlink:href", a.avatar)
                                    .attr('width', authorCircleRadius * 2)
                                    .attr('height', authorCircleRadius * 2);
                        }
                    });
                }

                function drawCircles() {
                    var positions = [],
                        delta = 2 * authorCircleRadius + circlesMargin;

                    if (circles) {
                        circles.remove();
                    }

                    circles = canvas.selectAll('.tweet-circle')
                            .data($scope.tweets.all)
                        .enter().append('circle')
                            .attr('r', authorCircleRadius)
                            .attr('cx', function(d) { return x(d.published); })
                            .attr('cy', function() {
                                var cx = Math.round10(parseFloat(this.attributes['cx'].value), -2),
                                    cy = height - authorCircleRadius - circlesMargin,
                                    positionFound = false;

                                while (!positionFound) {
                                    positionFound = true;

                                    for (var i=0; i<positions.length; i++) {
                                        var pos = positions[i],
                                            d = Math.round10(Math.sqrt((cx-pos.x)*(cx-pos.x) + (cy-pos.y)*(cy-pos.y)), -2);

                                        if (d < delta) {
                                            // calculate displacement that ensures non-intersecting circles:
                                            // distance between circle centres is (2*radius + margin)
                                            cy -= Math.round10((cy - pos.y) + Math.sqrt(delta*delta - (cx - pos.x)*(cx - pos.x)), -2);
                                            positionFound = false;
                                            break;
                                        }
                                    }
                                }

                                positions.push({x: cx, y: cy});

                                return cy;
                            })
                            .style('fill', function(d) { return 'url(#bg-author-' + d.author.screenName + ')'; })
                            .on('click', function(d) {
                                TweetService.activate(d);
                            });
                }

                function filterCircles() {
                    if (circles) {
                        circles
                            .attr('class', function(d) {
                                var classList = 'timeline-tweet';

                                if (($scope.tweets.active == null) ||
                                    (d == $scope.tweets.active)) {
                                    classList += ' timeline-tweet--matching';
                                }

                                //if (d.author.isFollowing) {
                                //    classList += ' timeline-tweet--following'
                                //}

                                return classList;
                            });
                    }
                }

                function setBrush() {
                    // TODO: uncomment if I do the brush filtering
                    //$('.brush').remove();
                    //
                    //brush.x(x)
                    //    .on('brush', function() {
                    //        var b = brush.extent();
                    //
                    //        $scope.lowerTimeBound = b[0];
                    //        $scope.upperTimeBound = b[1];
                    //
                    //        console.log(b[0], b[1]);
                    //
                    //        $scope.filters.time = {
                    //            lower: $scope.lowerTimeBound,
                    //            upper: $scope.upperTimeBound
                    //        };
                    //
                    //        filterCircles();
                    //    });
                    //
                    //canvas.append("g")
                    //    .attr("class", "brush")
                    //    .call(brush)
                    //    .selectAll("rect")
                    //    .attr("height", height);
                }

                $scope.resetTimeFilter = function() {
                    // TODO: uncomment if I do the brush filtering
                    //d3.selectAll('.brush').call(brush.clear());
                    //
                    //$scope.lowerTimeBound = $scope.domainLowerBound;
                    //$scope.upperTimeBound = $scope.domainUpperBound;
                    //
                    //$scope.filters.time = null;
                    //filterCircles();
                };

                TweetService.loaded
                    .then(function() {
                        $scope.tweets = TweetService.tweets;

                        // TODO: uncomment if I do the brush filtering
                        //domainLowerBound = moment(domain[0]).toDate();
                        //domainUpperBound = moment(domain[domain.length - 1]).toDate();
                        //
                        //
                        //if (!$scope.lowerTimeBound) {
                        //    $scope.lowerTimeBound = domainLowerBound;
                        //}
                        //
                        //if (!$scope.upperTimeBound) {
                        //    $scope.upperTimeBound = domainUpperBound;
                        //}

                        drawPortraitPatterns(TweetService.authors);

                        drawAxes(TweetService.domain);
                        setBrush();
                        drawCircles();
                        filterCircles();

                        $(window).on('resize', function() {
                            clearTimeout(redrawTimeoutId);

                            redrawTimeoutId = $timeout(function() {
                                drawAxes(TweetService.domain);
                                setBrush();
                                drawCircles();
                                filterCircles();
                            }, 300).$$timeoutId;
                        });

                        $scope.$watch('tweets.active', filterCircles);
                    });
            }
        }
    });
angular.module('tweetsToSoftware')
    .directive('toolbar', function(MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'toolbar.html',
            scope: {},
            controller: function($scope) {
                MenuService.loaded
                    .then(function() {
                        $scope.tools = MenuService.toolbar.all;
                    });
            }
        };
    });
angular.module('tweetsToSoftware')
    .directive('toolbarItem', function($document, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'toolbarItem.html',
            scope: {
                tool: '='
            },
            controller: function($scope) {
                $scope.showTweets = MenuService.showTweets;
                $scope.hideTweets = MenuService.hideTweets;

                $scope.openSubtools = function() {
                    MenuService.open($scope.tool, MenuService.toolbar);
                };
            },
            link: function($scope) {
                $document.on('click', function(e) {
                    var isTool = $(e.target).parents('.toolbar-item').length ||
                        $(e.target).hasClass('toolbar-item');

                    if (!isTool) {
                        MenuService.reset(MenuService.toolbar);
                        $scope.$apply();
                    }
                });
            }
        };
    });
angular.module('tweetsToSoftware')
    .directive('tweet', function(TweetService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'tweet.html',
            scope: {
                tweet: '='
            },
            controller: function($scope) {
                $scope.activateTweet = TweetService.activate;
            }
        }
    });
angular.module('tweetsToSoftware')
    .directive('tweetsPopup', function() {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'tweetsPopup.html',
            scope: {
                context: '='
            },
            controller: function($scope) {
            }
        };
    });