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
                    console.log('draw axes');

                    var width = $('#timeline').width() - margin.right - margin.left;

                    svg.attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom);

                    x.range([0, width])
                        .domain([d3.min(domain, function(d) {
                            return parseDate(d);
                        }), d3.max(domain, function(d) {
                            return parseDate(d);
                        })]);

                    y.range([height, 0])
                        .domain([0, d3.max(data, function(item) { return item.nTweets; }) + 5]);

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
                    console.log('draw ghost chart');

                    $('.' + className).remove();

                    canvas.append('path')
                        .attr('class', className)
                        .attr('d', area(data));
                }

                function drawChart(data) {
                    console.log('draw chart');

                    $('.line, .area, .dot').remove();

                    var matchingData = [];
                    angular.forEach(data, function(dataPoint) {
                        if ((dataPoint.parsedTime >= $scope.lowerTimeBound) &&
                            (dataPoint.parsedTime <= $scope.upperTimeBound)) {
                            matchingData.push(dataPoint);
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
                    console.log('set brush');
                    $('.brush').remove();

                    brush.x(x)
                        .on('brush', function() {
                            var b = brush.extent();

                            $scope.lowerTimeBound = b[0];
                            $scope.upperTimeBound = b[1];

                            drawChart($scope.chart);
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
                            lower: moment(b[0]).format('YYYY-MM-DD HH:MM:SS'),
                            higher: moment(b[1]).format('YYYY-MM-DD HH:MM:SS')
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
                        time: 'clear'
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

                                $scope.domainLowerBound = moment($scope.domain[0]).toDate();
                                $scope.domainUpperBound = moment($scope.domain[$scope.domain.length - 1]).toDate();

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

                $scope.$on('authorFiltersChanged', function() {
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
                });
            }
        }
    });