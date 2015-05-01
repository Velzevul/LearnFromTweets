angular.module('tweetsToSoftware')
    .directive('timeline', function() {
        'use strict';

        return {
            restrict: 'E',
            templateUrl: 'templates/timeline.html',
            scope: {},
            controller: function($scope) {
                $scope.data = [
                        { date: "1-May-12", tweets: 1},
                        { date: "30-Apr-12", tweets: 3},
                        { date: "27-Apr-12", tweets: 5},
                        { date: "26-Apr-12", tweets: 4},
                        { date: "25-Apr-12", tweets: 6},
                        { date: "24-Apr-12", tweets: 4},
                        { date: "23-Apr-12", tweets: 3},
                        { date: "20-Apr-12", tweets: 1},
                        { date: "19-Apr-12", tweets: 6},
                        { date: "18-Apr-12", tweets: 5},
                        { date: "17-Apr-12", tweets: 1},
                        { date: "16-Apr-12", tweets: 2},
                        { date: "13-Apr-12", tweets: 1},
                        { date: "12-Apr-12", tweets: 4},
                        { date: "11-Apr-12", tweets: 1},
                        { date: "10-Apr-12", tweets: 5},
                        { date: "9-Apr-12", tweets: 6},
                        { date: "5-Apr-12", tweets: 3},
                        { date: "4-Apr-12", tweets: 5},
                        { date: "3-Apr-12", tweets: 2},
                        { date: "2-Apr-12", tweets: 1},
                        { date: "30-Mar-12", tweets: 3},
                        { date: "29-Mar-12", tweets: 4},
                        { date: "28-Mar-12", tweets: 6},
                        { date: "27-Mar-12", tweets: 1},
                        { date: "26-Mar-12", tweets: 8},
                        { date: "23-Mar-12", tweets: 6},
                        { date: "22-Mar-12", tweets: 4},
                        { date: "21-Mar-12", tweets: 3},
                        { date: "20-Mar-12", tweets: 4},
                        { date: "19-Mar-12", tweets: 5},
                        { date: "16-Mar-12", tweets: 6},
                        { date: "15-Mar-12", tweets: 7},
                        { date: "14-Mar-12", tweets: 1},
                        { date: "13-Mar-12", tweets: 4},
                        { date: "12-Mar-12", tweets: 6}
                    ];
            },
            link: function($scope, elem) {
                var margin = {top: 24, right: 24, bottom: 50, left: 50},
                    width = $(elem).parent().width() - margin.right - margin.left,
                    height = 200 - margin.top - margin.bottom;

                var parseDate = d3.time.format('%d-%b-%y').parse;

                angular.forEach($scope.data, function(item) {
                   item.date = parseDate(item.date);
                });

                var x = d3.time.scale().range([0, width]),
                    y = d3.scale.linear().range([height, 0]),
                    xAxis = d3.svg.axis().scale(x).tickSize(-height).tickSubdivide(true),
                    yAxis = d3.svg.axis().scale(y).orient('left');

                xAxis.ticks(d3.time.hours, 12);

                x.domain(d3.extent($scope.data, function(d) { return d.date; }));
                y.domain(d3.extent($scope.data, function(d) { return d.tweets; }));

                var area = d3.svg.area()
                    .x(function(d) { return x(d.date); })
                    .y0(height)
                    .y1(function(d) { return y(d.tweets); });

                var line = d3.svg.line()
                    .x(function(d) { return x(d.date); })
                    .y(function(d) { return y(d.tweets); });

                var svg = d3.select('#timeline').append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                    .append('g')
                        .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

                svg.append('clipPath')
                        .attr('id', 'clip')
                    .append('rect')
                        .attr('width', width)
                        .attr('height', height);

                svg.append('path')
                    .attr('class', 'area')
                    .attr('clip-path', 'url(#clip)')
                    .attr('d', area($scope.data));

                svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(xAxis);

                svg.append('g')
                    .attr('class', 'y axis')
                    .call(yAxis);

                svg.append('path')
                    .attr('class', 'line')
                    .attr('clip-path', 'url(#clip)')
                    .attr('d', line($scope.data));
            }
        }
    });