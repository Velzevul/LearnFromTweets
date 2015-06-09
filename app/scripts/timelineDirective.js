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