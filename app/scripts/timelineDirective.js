angular.module('tweetsToSoftware')
  .directive('timeline', function(rootPrefix, $window, $q, $timeout, TweetService, FilterService) {
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
          });

        var margin = {
            top: 20,
            bottom: 20,
            left: 30,
            right: 10
          },
          centering = false,
          alpha = .2,
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
          center,
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
            .on("mousedown.brush", brushcenter)
            .on("touchstart.brush", brushcenter);

          gBrush.call(brush.event);
        }

        function brushmove() {
          var extent = brush.extent();

          $scope.filters.renderFrom  = pointToDate(extent[0]);
          $scope.filters.renderUntil = pointToDate(extent[1]);
        }

        function brushcenter() {
          var self = d3.select(window),
            target = d3.event.target,
            extent = brush.extent(),
            size = extent[1] - extent[0],
            domain = y.domain(),
            y0 = domain[0] + size / 2,
            y1 = domain[1] - size / 2;

          recenter(true);
          brushmove();

          if (d3.event.changedTouches) {
            self.on("touchmove.brush", brushmove).on("touchend.brush", brushend);
          } else {
            self.on("mousemove.brush", brushmove).on("mouseup.brush", brushend);
          }

          function brushmove() {
            d3.event.stopPropagation();
            center = Math.max(y0, Math.min(y1, y.invert(d3.mouse(target)[1])));
            recenter(false);
          }

          function brushend() {
            brushmove();
            self.on(".brush", null);
          }
        }

        function recenter(smooth) {
          if (centering) return; // timer is active and already tweening
          if (!smooth) return void tween(1); // instantaneous jump
          centering = true;

          function tween(alpha) {
            var extent = brush.extent(),
              size = extent[1] - extent[0],
              center1 = center * alpha + (extent[0] + extent[1]) / 2 * (1 - alpha);

            gBrush
              .call(brush.extent([center1 - size / 2, center1 + size / 2]))
              .call(brush.event);

            return !(centering = Math.abs(center1 - center) > 1e-3);
          }

          d3.timer(function () {
            return tween(alpha);
          });
        }

        //var handle = slider.append('circle')
        //  .attr('class', 'handle')
        //  .attr('r', 9);

        //slider
        //  .call(brush.extent([dateToPoint($scope.filters.renderUntil),
        //                      dateToPoint($scope.filters.renderUntil)]))
        //  .call(brush.event);

        //function brushed() {
        //  var value = brush.extent()[1];
        //
        //  if (d3.event.sourceEvent) {
        //    value = y.invert(d3.mouse(this)[1]);
        //    //brush.extent([value, value]);
        //  }
        //
        //  //handle.attr('cy', y(value));
        //
        //  $scope.filters.renderUntil = pointToDate(value);
        //}
      }
    }
  });