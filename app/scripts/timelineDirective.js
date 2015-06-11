angular.module('tweetsToSoftware')
    .directive('timeline', function($window, $q, $timeout, TweetService, FilterService) {
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
                    console.time('Redraw circles');
                    var positions = [],
                        filteredTweets = [],
                        delta = 2 * authorCircleRadius + circlesMargin;

                    //angular.forEach($scope.tweets.all, function(t) {
                    //    if (FilterService.matchTweet(t)) {
                    //        filteredTweets.push(t);
                    //    }
                    //});

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

                    console.timeEnd('Redraw circles');
                }

                function filterCircles() {
                    if (circles) {
                        circles
                            .attr('class', function(d) {
                                var classList = 'timeline-tweet ';

                                if (FilterService.matchTweet(d)) {
                                    classList += 'timeline-tweet--matching ';
                                }

                                if ($scope.tweets.active == d) {
                                    classList += 'timeline-tweet--matching ';
                                    classList += 'timeline-tweet--active ';
                                }

                                //if (d.author.isFollowing) {
                                //    classList += ' timeline-tweet--following'
                                //}

                                return classList;
                            });
                    }
                }

                function setBrush() {
                    $('.brush').remove();

                    brush.x(x)
                        //.extent([$scope.lowerTimeBound, $scope.upperTimeBound])
                        .on('brush', function() {
                            var b = brush.extent(),
                                minimalBrushLength = 30000;

                            $scope.lowerTimeBound = b[0];
                            $scope.upperTimeBound = b[1];

                            if (b[1] - b[0] < minimalBrushLength) {
                                $scope.filters.time = null;
                            } else {
                                $scope.filters.time = {
                                    lower: $scope.lowerTimeBound,
                                    upper: $scope.upperTimeBound
                                };
                            }

                            filterCircles();
                        });

                    canvas.append("g")
                        .attr("class", "brush")
                        .call(brush)
                        .selectAll("rect")
                        .attr("height", height);

                    canvas.selectAll(".resize")
                        .append("rect")
                        .attr('class', 'brush__handle')
                        .attr("height", height)
                        .attr("width", 2);
                }

                TweetService.loaded
                    .then(function() {
                        $scope.tweets = TweetService.tweets;
                        $scope.filters = FilterService.filters;

                        $scope.upperTimeBound = TweetService.domain[0].toDate();
                        $scope.lowerTimeBound = TweetService.domain[TweetService.domain.length - 1].toDate();

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

                        $scope.$watchGroup([
                            'filters.time',
                            'filters.highlightRelevant',
                            'filters.highlightUnfamiliar'
                        ], function() {
                            drawCircles();
                            filterCircles();
                        });
                    });
            }
        }
    });