angular.module('tweetsToSoftware')
    .directive('timeline', function($window, $q, $timeout, DataService, AuthorService, MenuService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/timeline.html',
            scope: {},
            link: function($scope, elem) {
                var margin = {top: 24, right: 24, bottom: 50, left: 24},
                    height = 250 - margin.top - margin.bottom,
                    authorCircleRadius = 12,
                    circlesMargin = 6,
                    showTimeoutId = null,
                    showDelay = 50;

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
                    circles;

                canvas.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
                    .attr('id', 'svg-canvas');

                function drawAxes() {
                    //console.log('draw axes');

                    var width = $('#timeline').width() - margin.right - margin.left;

                    svg.attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom);

                    x.range([0, width])
                        .domain([d3.min($scope.domain, function(d) {
                            var bound = moment(d).toDate();
                            bound.setMinutes(0);
                            return bound;
                        }), d3.max($scope.domain, function(d) {
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
                        .call(gridAxis);
                }

                //function drawGhostChart(data, className) {
                //    console.log('draw ghost chart');
                //
                //    $('.' + className).remove();
                //
                //    canvas.append('path')
                //        .attr('class', className)
                //        .attr('d', area(data));
                //}

                //function drawChart(data) {
                //    console.log('draw chart');
                //
                //    $('.line, .area, .dot').remove();
                //
                //    $scope.nTweets = 0;
                //
                //    var matchingData = [];
                //    angular.forEach(data, function(dataPoint) {
                //        if ((dataPoint.parsedTime >= $scope.lowerTimeBound) &&
                //            (dataPoint.parsedTime <= $scope.upperTimeBound)) {
                //            matchingData.push(dataPoint);
                //            $scope.nTweets += dataPoint.nTweets;
                //        }
                //    });
                //
                //    canvas.append('path')
                //        .attr('class', 'area')
                //        .attr('d', area(matchingData));
                //
                //    canvas.append('path')
                //        .attr('class', 'line')
                //        .attr('d', line(matchingData));
                //
                //    canvas.selectAll('.dot')
                //            .data(matchingData)
                //        .enter().append('circle')
                //            .attr('class', 'dot')
                //            .attr('r', 2.5)
                //            .attr('cx', function(d) { return x(d.parsedTime); })
                //            .attr('cy', function(d) { return y(d.nTweets); });
                //}

                function drawPortraitPatterns() {
                    var defs = svg.append('defs');

                    angular.forEach($scope.authors, function(a) {
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

                    circles = canvas.selectAll('.tweet-circle')
                            .data($scope.tweets)
                        .enter().append('circle')
                            .attr('class', 'timeline-tweet')
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
                                            cy -= Math.round10((cy - pos.y) + Math.sqrt(delta*delta - (cx - pos.x)*(cx - pos.x)), -2);
                                            positionFound = false;
                                            break;
                                        }
                                    }
                                }

                                positions.push({x: cx, y: cy});

                                return cy;
                            })
                            .style('fill', function(d) { return 'url(#bg-author-' + d.author.name + ')' })
                            .on('mouseover', function(d) {
                                clearTimeout(showTimeoutId);

                                showTimeoutId = $timeout(function() {
                                    MenuService.hideAll();
                                    MenuService.open(d.commandId);
                                    MenuService.highlight(d.commandId);
                                }, showDelay).$$timeoutId;
                            });
                }

                //function setBrush() {
                //    console.log('set brush');
                //    $('.brush').remove();
                //
                //    brush.x(x)
                //        .on('brush', function() {
                //            var b = brush.extent();
                //
                //            $scope.lowerTimeBound = b[0];
                //            $scope.upperTimeBound = b[1];
                //
                //            drawChart($scope.chart);
                //            setBrush();
                //        })
                //        .on('brushend', setTimeFilter);
                //
                //    canvas.append("g")
                //        .attr("class", "brush")
                //        .call(brush)
                //        .selectAll("rect")
                //        .attr("height", height);
                //}

                //$scope.filterSet = false;

                //function setTimeFilter() {
                //    var b = brush.extent();
                //
                //    DataService.setFilters({
                //        time: {
                //            lower: b[0],
                //            upper: b[1]
                //        }
                //    });
                //
                //    $scope.filterSet = true;
                //}

                //$scope.unsetTimeFilter = function() {
                //    d3.selectAll('.brush').call(brush.clear());
                //
                //    $scope.lowerTimeBound = $scope.domainLowerBound;
                //    $scope.upperTimeBound = $scope.domainUpperBound;
                //
                //    DataService.setFilters({
                //        time: null
                //    });
                //
                //    $scope.filterSet = false;
                //    drawChart($scope.chart);
                //};

                $scope.$on('filtersActivated', function() {
                    $timeout(function() {
                        $q.all([
                            DataService.getTweets(),
                            DataService.getDomain(),
                            AuthorService.get()
                        ])
                            .then(function(response) {
                                $scope.tweets = response[0];
                                $scope.domain = response[1];
                                $scope.authors = response[2];

                                $scope.domainLowerBound = moment($scope.domain[0]).minutes(0).toDate();
                                $scope.domainUpperBound = moment($scope.domain[$scope.domain.length - 1]).minutes(0).toDate();

                                if (!$scope.lowerTimeBound) {
                                    $scope.lowerTimeBound = $scope.domainLowerBound;
                                }

                                if (!$scope.upperTimeBound) {
                                    $scope.upperTimeBound = $scope.domainUpperBound;
                                }

                                drawAxes();
                                drawPortraitPatterns();

                                drawCircles($scope.tweets);
                                //setBrush();
                            });
                    });
                });

                //$(window).on('resize', function() {
                //    clearTimeout(redrawTimeoutId);
                //    redrawTimeoutId = $timeout(function() {
                //        drawAxes($scope.domain);
                //
                //        drawChart($scope.tweets);
                //        setBrush();
                //    }, 300).$$timeoutId;
                //});

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