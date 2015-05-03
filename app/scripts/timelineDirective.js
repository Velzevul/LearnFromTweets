angular.module('tweetsToSoftware')
    .directive('timeline', function($window, $q, $timeout, DataService) {
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
                        .ticks(d3.time.hours, 12)
                        .innerTickSize(12)
                        .outerTickSize(0)
                        .tickFormat(function(d) { return ''; }),
                    hoursAxis = d3.svg.axis()
                        .ticks(d3.time.hours)
                        .innerTickSize(6)
                        .outerTickSize(1)
                        .tickFormat(function(d) { return ''; }),
                    yAxis = d3.svg.axis()
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
                        .domain(d3.extent(domain, function(d) { return parseDate(d); }));

                    y.range([height, 0])
                        .domain([0, d3.max(data, function(item) { return item.nTweets; }) + 1]);

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

                function drawGhostChart(data) {
                    console.log('draw ghost chart');

                    $('.ghost-area').remove();

                    canvas.append('path')
                        .attr('class', 'ghost-area')
                        .attr('d', area(data));
                }

                function drawChart(data) {
                    console.log('draw chart');

                    $('.line, .area').remove();

                    canvas.append('path')
                        .attr('class', 'area')
                        .attr('d', area(data));

                    canvas.append('path')
                        .attr('class', 'line')
                        .attr('d', line(data));
                }

                function setBrush() {
                    console.log('set brush');
                    $('.brush').remove();

                    brush.x(x)
                        .on('brushend', setTimeFilter);

                    canvas.append("g")
                        .attr("class", "brush")
                        .call(brush)
                        .selectAll("rect")
                        .attr("height", height);
                }

                $q.all([
                    DataService.getActivity(),
                    DataService.getDomain()
                ])
                    .then(function(response) {
                        angular.forEach(response[0].activity, function(item) {
                            item.parsedTime = parseDate(item.time);
                        });

                        $scope.nTweets = response[0].nTweets;
                        $scope.domainLowerBound = moment(response[1][response[1].length - 1]).format('MMM DD HH:MM');
                        $scope.domainUpperBound = moment(response[1][0]).format('MMM DD HH:MM');

                        $scope.lowerTimeBound = $scope.domainLowerBound;
                        $scope.upperTimeBound = $scope.domainUpperBound;

                        drawAxes(response[0].activity, response[1]);
                        drawGhostChart(response[0].activity);
                        drawChart(response[0].activity);
                        setBrush();
                    });

                $(window).on('resize', function() {
                    clearTimeout(redrawTimeoutId);
                    redrawTimeoutId = $timeout(function() {
                        $q.all([
                            DataService.getActivity(),
                            DataService.getDomain()
                        ])
                            .then(function(response) {
                                angular.forEach(response[0].activity, function(item) {
                                    item.parsedTime = parseDate(item.time);
                                });

                                drawAxes(response[0].activity, response[1]);
                                drawGhostChart(response[0].activity);
                                drawChart(response[0].activity);
                                setBrush();
                            });
                    }, 300).$$timeoutId;
                });

                $scope.filterSet = false;
                $scope.unsetTimeFilter = function() {
                    var b = brush.extent();

                    d3.selectAll('.brush').call(brush.clear());

                    $scope.lowerTimeBound = $scope.domainLowerBound;
                    $scope.upperTimeBound = $scope.domainUpperBound;

                    DataService.setFilters({
                        time: 'clear'
                    });

                    $scope.filterSet = false;
                };

                function setTimeFilter() {
                    var b = brush.extent();

                    $scope.lowerTimeBound = moment(b[0]).format('MMM DD HH:00');
                    $scope.upperTimeBound = moment(b[1]).format('MMM DD HH:00');

                    DataService.setFilters({
                        time: {
                            lower: moment(b[0]).format('YYYY-MM-DD HH:MM:SS'),
                            higher: moment(b[1]).format('YYYY-MM-DD HH:MM:SS')
                        }
                    });

                    $scope.filterSet = true;
                }

                $scope.$on('filtersChanged', function() {
                    DataService.getActivity()
                        .then(function(response) {
                            angular.forEach(response.activity, function(item) {
                                item.parsedTime = parseDate(item.time);
                            });

                            $scope.nTweets = response.nTweets;
                            drawChart(response.activity);
                            setBrush();
                        });
                });
            }
        }
    });