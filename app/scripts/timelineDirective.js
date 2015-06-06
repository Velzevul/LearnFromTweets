angular.module('tweetsToSoftware')
    .directive('timeline', function($window, $q, $timeout, TweetService, AuthorService, MenuService, FilterService, Notification) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'timeline.html',
            scope: {},
            link: function($scope, elem) {
                $scope.filters = FilterService.get();

                var margin = {top: 24, right: 24, bottom: 50, left: 24},
                    height = 250 - margin.top - margin.bottom,
                    authorCircleRadius = 12,
                    circlesMargin = 6,
                    showTimeoutId = null,
                    showDelay = 150,
                    authors = [],
                    tweets = [],
                    domain = [],
                    domainLowerBound,
                    domainUpperBound,
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

                function drawAxes() {
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

                function drawPortraitPatterns() {
                    var defs = svg.append('defs');

                    angular.forEach(authors, function(a) {
                        if (!document.getElementById('bg-author-' + a.name)) {
                            defs
                                .append("pattern")
                                    .attr("id", "bg-author-" + a.name)
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
                            .data(tweets)
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
                            .style('fill', function(d) { return 'url(#bg-author-' + d.author.name + ')'; })
                            .on('mouseover', function(d) {
                                clearTimeout(showTimeoutId);

                                Notification.tweet = d;

                                showTimeoutId = $timeout(function() {
                                    MenuService.hideAll();
                                    MenuService.open(d.command.id);
                                    MenuService.highlight(d.command.id);
                                }, showDelay).$$timeoutId;
                            })
                            .on('click', function(d) {
                                $scope.filters.author = d.author;
                            });
                }

                function filterCircles() {
                    if (circles) {
                        circles
                            .attr('class', function(d) {
                                var classList = 'timeline-tweet';

                                if (FilterService.matchTweet(d)) {
                                    classList += ' timeline-tweet--matching';
                                }

                                if (d.author.isFollowing) {
                                    classList += ' timeline-tweet--following'
                                }

                                return classList;
                            });
                    }
                }

                function setBrush() {
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
                    d3.selectAll('.brush').call(brush.clear());

                    $scope.lowerTimeBound = $scope.domainLowerBound;
                    $scope.upperTimeBound = $scope.domainUpperBound;

                    $scope.filters.time = null;
                    filterCircles();
                };

                $q.all([
                    TweetService.get(),
                    TweetService.getDomain(),
                    AuthorService.get()
                ])
                    .then(function(response) {
                        tweets = response[0];
                        domain = response[1];
                        authors = response[2];

                        domainLowerBound = moment(domain[0]).toDate();
                        domainUpperBound = moment(domain[domain.length - 1]).toDate();

                        drawPortraitPatterns();
                    });

                $scope.$watch('filters.active', function() {
                    // timeout to ensure that the html has been rendered
                    $timeout(function() {
                        if (!$scope.lowerTimeBound) {
                            $scope.lowerTimeBound = domainLowerBound;
                        }

                        if (!$scope.upperTimeBound) {
                            $scope.upperTimeBound = domainUpperBound;
                        }

                        drawAxes();
                        setBrush();
                        drawCircles();
                        filterCircles();
                    });
                })

                $scope.$watchGroup([
                        'filters.time',
                        'filters.author',
                        'filters.highlightRelevant',
                        'filters.highlightUnfamiliar'
                    ], filterCircles);

                $(window).on('resize', function() {
                    clearTimeout(redrawTimeoutId);

                    redrawTimeoutId = $timeout(function() {
                        drawAxes();
                        setBrush();
                        drawCircles();
                        filterCircles();
                    }, 300).$$timeoutId;
                });

                //$scope.$on('authorFiltersChanged', changeListener);
                //
                //function changeListener() {
                //    var filter = DataService.getFilters();
                //
                //    if (filter.author) {
                //        $scope.ghost = $scope.activity[filter.author.name];
                //        $scope.chart = $scope.activity[filter.author.name];
                //    } else {
                //        $scope.ghost = $scope.activity.total;
                //        $scope.chart = $scope.activity.total;
                //    }
                //
                //    drawGhostChart($scope.ghost, 'ghost-area');
                //    drawChart($scope.chart);
                //    setBrush();
                //}
            }
        }
    });