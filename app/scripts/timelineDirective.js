angular.module('tweetsToSoftware')
    .directive('timeline', function(ActivityService) {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/timeline.html',
            scope: {},
            link: function($scope, elem) {
                var margin = {top: 24, right: 24, bottom: 50, left: 50},
                    width = $(elem).parent().width() - margin.right - margin.left,
                    height = 250 - margin.top - margin.bottom;

                var parseDate = d3.time.format('%Y-%m-%d %H:%M:%S').parse;

                function plot(data) {
                    angular.forEach(data, function(item) {
                        item.time = parseDate(item.time);
                        item.time.setMinutes(30);
                    });

                    var x = d3.time.scale()
                        .range([0, width])
                        .domain(d3.extent(data, function(d) { return d.time; }));

                    var y = d3.scale.linear()
                        .range([height, 0])
                        .domain([0, d3.max(data, function(item) { return item.nTweets; }) + 1]);

                    var daysAxis = d3.svg.axis()
                        .scale(x)
                        .ticks(d3.time.days)
                        .tickSize(18)
                        .tickFormat(function(d) {
                            return moment(d).format('MMM Do');
                        });

                    var halfDaysAxis = d3.svg.axis()
                        .scale(x)
                        .ticks(d3.time.hours, 12)
                        .tickSize(12)
                        .tickFormat(function(d) { return ''; });

                    var hoursAxis = d3.svg.axis()
                        .scale(x)
                        .ticks(d3.time.hours)
                        .tickSize(6)
                        .tickFormat(function(d) { return ''; });

                    var yAxis = d3.svg.axis()
                        .scale(y)
                        .orient('left');

                    var svg = d3.select('#timeline').append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append('g')
                        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

                    var area = d3.svg.area()
                        .interpolate("monotone")
                        .x(function(d) { return x(d.time); })
                        .y0(height)
                        .y1(function(d) { return y(d.nTweets); });

                    var line = d3.svg.line()
                        .interpolate("monotone")
                        .x(function(d) { return x(d.time); })
                        .y(function(d) { return y(d.nTweets); });

                    svg.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(daysAxis);

                    svg.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(halfDaysAxis);

                    svg.append('g')
                        .attr('class', 'axis')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(hoursAxis);

                    svg.append('g')
                        .attr('class', 'axis')
                        .call(yAxis);

                    svg.append('path')
                        .attr('class', 'area')
                        .attr('d', area(data));

                    svg.append('path')
                        .attr('class', 'line')
                        .attr('d', line(data));

                    var brush = d3.svg.brush()
                        .x(x)
                        .on("brush", brushed);

                    var gBrush = svg.append("g")
                        .attr("class", "brush")
                        .call(brush);

                    gBrush.selectAll("rect")
                        .attr("height", height);

                    function brushed() {
                        var extent0 = brush.extent(),
                            extent1 = extent0.map(d3.time.hour.round);

                        // if empty when rounded, use floor & ceil instead
                        if (extent1[0] >= extent1[1]) {
                            extent1[0] = d3.time.hour.floor(extent0[0]);
                            extent1[1] = d3.time.hour.ceil(extent0[1]);
                        }

                        d3.select(this)
                            .call(brush.extent(extent1));

                        console.log(extent1);
                    }
                }

                ActivityService.get()
                    .then(function(activity) {
                        plot(activity)
                    });
            }
        }
    });