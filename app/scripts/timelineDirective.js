angular.module('tweetsToSoftware')
  .directive('timeline', function(rootPrefix, TweetService, FilterService,
                                  LoggerService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'timeline.html',
      replace: true,
      scope: {
        tweets: '='
      },
      link: function($scope) {
        $scope.filters = FilterService;

        function plotPoints() {
          console.log('plotting points');

          var matchingTweets = $scope.tweets.haveCommand($scope.filters.selectedMenu, $scope.filters.selectedCommand),
              points = matchingTweets.map(function(t) {
                return dateToPoint(t.createdAt);
              });

          svg.selectAll('.data-point')
            .remove();

          svg.selectAll('.data-point')
            .data(points)
            .enter().append('circle')
            .attr('class', 'data-point')
            .attr('r', 3)
            .attr('opacity', 0.5)
            .attr('transform', function(d) { return 'translate(10,' + y(d) + ')'; });
        }

        TweetService.loaded
          .then(function() {
            plotPoints();
            makeBrush();

            $scope.$watch('filters.selectedCommand', function() {
              plotPoints();
              makeBrush();
            });

            $scope.$watchGroup([
              'filters.renderFrom',
              'filters.renderUntil'
            ], function() {
              LoggerService.log('Filtered timeline from ' + $scope.filters.renderFrom.format() + ' to ' + $scope.filters.renderUntil.format());
            });
          });

        var margin = {
            top: 20,
            bottom: 20,
            left: 30,
            right: 10
          },
          width = 150 - margin.left - margin.right,
          height = $('#js-timeline').height() - margin.top - margin.bottom,
          ticks = [
            'Now',
            '1 hour',
            '2 hours',
            '3 hours',
            '6 hours',
            '12 hours',
            '1 day',
            '2 days',
            '3 days',
            '1 week'
          ],
          gBrush;

        var y = d3.scale.linear()
          .range([0, height])
          .domain([0, 9])
          .clamp(true);

        var brush = d3.svg.brush()
          .y(y)
          .extent([dateToPoint($scope.filters.renderFrom), dateToPoint($scope.filters.renderUntil)])
          .on('brush', brushmove);

        var svg = d3.select('#js-timeline').append('svg')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

        var axis = d3.svg.axis()
          .scale(y)
          .orient('right')
          .ticks(9)
          .tickFormat(function(v) {
            return ticks[v];
          })
          .tickSize(0)
          .tickPadding(12);

        svg.append('g')
          .attr('class', 'axis')
          .attr('transform', 'translate(10,0)')
          .call(axis);

        function makeBrush() {
          svg.selectAll('.brush')
            .remove();

          gBrush = svg.append('g')
            .attr('class', 'brush')
            .call(brush);

          gBrush.selectAll('.resize').append('svg:image')
            .attr('xlink:href', rootPrefix + '/images/handle.svg')
            .attr('height', 16)
            .attr('width', 24)
            .attr('y', -8)
            .attr('x', -24)
            .attr('class', 'handle');

          gBrush.selectAll('rect')
            .attr('width', 20);

          gBrush.select(".background")
            .on("mousedown.brush", function() {
              d3.event.stopPropagation();
            });

          gBrush.call(brush.event);
        }

        function brushmove() {
          var extent = brush.extent();

          $scope.filters.renderFrom  = pointToDate(extent[0]);
          $scope.filters.renderUntil = pointToDate(extent[1]);
        }
      }
    }
  });