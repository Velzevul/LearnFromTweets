var NOW = moment();

function dateToPoint(date) {
  // 0    to 3*60        minutes
  // 3*60  to 6*60       minutes
  // 6*60  to 12*60      minutes
  // 12*60  to 24*60     minutes
  // 24*60 to 3*24*60    minutes
  // 3*24*60 to 7*24*60  minutes
  var diff = NOW.diff(date, 'minutes');

  if (diff <= 3*60) {
    return diff/60;
  } else if (diff <= 6*60) {
    return 3 + (diff - 3*60)/(3*60);
  } else if (diff <= 12*60) {
    return 4 + (diff - 6*60)/(6*60);
  } else if (diff <= 24*60) {
    return 5 + (diff - 12*60)/(12*60);
  } else if (diff <= 3*24*60) {
    return 6 + (diff - 24*60)/(24*60);
  } else if (diff <= 7*24*60) {
    return 8 + (diff - 3*24*60)/(4*24*60);
  } else {
    return 9;
  }
}

angular.module('tweetsToSoftware')
  .directive('timeline', function($window, $q, $timeout, TweetService, FilterService) {
    'use strict';

    return {
      restrict: 'E',
      templateUrl: 'timeline.html',
      replace: true,
      scope: {
        tweets: '='
      },
      link: function($scope) {
        var points = [];

        TweetService.loaded
          .then(function() {
            points = $scope.tweets.dates.map(dateToPoint);

            svg.selectAll('.data-point')
              .data(points)
              .enter().append('circle')
              .attr('class', 'data-point')
              .attr('r', 3)
              .attr('opacity', 0.5)
              .attr('transform', function(d) { return 'translate(10,' + y(d) + ')'; });
          });

        var margin = {
            top: 20,
            bottom: 20,
            left: 10,
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
          ];

        var y = d3.scale.linear()
          .range([0, height])
          .domain([0, 9])
          .clamp(true);

        var brush = d3.svg.brush()
          .y(y)
          .extent([0, 0])
          .on('brush', brushed);

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
          .call(axis)
        .select('.domain')
          .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
          .attr('transform', 'translate(10,0)')
          .attr('class', 'halo');

        var slider = svg.append('g')
          .attr('class', 'slider')
          .call(brush);

        slider.selectAll('.resize, .extent')
          .remove();


        var handle = slider.append('circle')
          .attr('class', 'handle')
          .attr('r', 9);

        slider
          .call(brush.extent([1, 1]))
          .call(brush.event);

        function brushed() {
          var value = brush.extent()[1];

          if (d3.event.sourceEvent) {
            value = y.invert(d3.mouse(this)[1]);
            brush.extent([value, value]);
          }

          handle.attr('cy', y(value));

          var nPoints = points.filter(function(point) {
            return point <= value;
          }).length;
          console.log(nPoints);
        }

        //function drawPortraitPatterns(authors) {
        //    var defs = svg.append('defs');
        //
        //    angular.forEach(authors, function(a) {
        //        if (!document.getElementById('bg-author-' + a.screenName)) {
        //            defs
        //                .append("pattern")
        //                    .attr("id", "bg-author-" + a.screenName)
        //                    .attr('width', authorCircleRadius * 2)
        //                    .attr('height', authorCircleRadius * 2)
        //                .append("image")
        //                    .attr("xlink:href", a.avatar)
        //                    .attr('width', authorCircleRadius * 2)
        //                    .attr('height', authorCircleRadius * 2);
        //        }
        //    });
        //}

        //function drawCircles() {
        //    console.time('Redraw circles');
        //    var positions = [],
        //        filteredTweets = [],
        //        delta = 2 * authorCircleRadius + circlesMargin;
        //
        //    //angular.forEach($scope.tweets.all, function(t) {
        //    //    if (FilterService.matchTweet(t)) {
        //    //        filteredTweets.push(t);
        //    //    }
        //    //});
        //
        //    if (circles) {
        //        circles.remove();
        //    }
        //
        //    circles = canvas.selectAll('.tweet-circle')
        //            .data($scope.tweets.all)
        //        .enter().append('circle')
        //            .attr('r', authorCircleRadius)
        //            .attr('cx', function(d) { return x(d.published); })
        //            .attr('cy', function() {
        //                var cx = Math.round10(parseFloat(this.attributes['cx'].value), -2),
        //                    cy = height - authorCircleRadius - circlesMargin,
        //                    positionFound = false;
        //
        //                while (!positionFound) {
        //                    positionFound = true;
        //
        //                    for (var i=0; i<positions.length; i++) {
        //                        var pos = positions[i],
        //                            d = Math.round10(Math.sqrt((cx-pos.x)*(cx-pos.x) + (cy-pos.y)*(cy-pos.y)), -2);
        //
        //                        if (d < delta) {
        //                            // calculate displacement that ensures non-intersecting circles:
        //                            // distance between circle centres is (2*radius + margin)
        //                            cy -= Math.round10((cy - pos.y) + Math.sqrt(delta*delta - (cx - pos.x)*(cx - pos.x)), -2);
        //                            positionFound = false;
        //                            break;
        //                        }
        //                    }
        //                }
        //
        //                positions.push({x: cx, y: cy});
        //
        //                return cy;
        //            })
        //            .style('fill', function(d) { return 'url(#bg-author-' + d.author.screenName + ')'; })
        //            .on('click', function(d) {
        //                TweetService.activate(d);
        //            });
        //
        //    console.timeEnd('Redraw circles');
        //}

        //function filterCircles() {
        //    if (circles) {
        //        circles
        //            .attr('class', function(d) {
        //                var classList = 'timeline-tweet ';
        //
        //                if (FilterService.matchTweet(d)) {
        //                    classList += 'timeline-tweet--matching ';
        //                }
        //
        //                if ($scope.tweets.active == d) {
        //                    classList += 'timeline-tweet--matching ';
        //                    classList += 'timeline-tweet--active ';
        //                }
        //
        //                //if (d.author.isFollowing) {
        //                //    classList += ' timeline-tweet--following'
        //                //}
        //
        //                return classList;
        //            });
        //    }
        //}

        //function setBrush() {
        //    $('.brush').remove();
        //
        //    brush.x(x)
        //        //.extent([$scope.lowerTimeBound, $scope.upperTimeBound])
        //        .on('brush', function() {
        //            var b = brush.extent(),
        //                minimalBrushLength = 30000;
        //
        //            $scope.lowerTimeBound = b[0];
        //            $scope.upperTimeBound = b[1];
        //
        //            if (b[1] - b[0] < minimalBrushLength) {
        //                $scope.filters.time = null;
        //            } else {
        //                $scope.filters.time = {
        //                    lower: $scope.lowerTimeBound,
        //                    upper: $scope.upperTimeBound
        //                };
        //            }
        //
        //            filterCircles();
        //        });
        //
        //    canvas.append("g")
        //        .attr("class", "brush")
        //        .call(brush)
        //        .selectAll("rect")
        //        .attr("height", height);
        //
        //    canvas.selectAll(".resize")
        //        .append("rect")
        //        .attr('class', 'brush__handle')
        //        .attr("height", height)
        //        .attr("width", 2);
        //}

        //TweetService.loaded
        //  .then(function() {
        //    $scope.tweets = TweetService.tweets;
        //    $scope.filters = FilterService.filters;
        //
        //    $scope.upperTimeBound = TweetService.domain[0].toDate();
        //    $scope.lowerTimeBound = TweetService.domain[TweetService.domain.length - 1].toDate();
        //
        //    drawPortraitPatterns(TweetService.authors);
        //
        //    drawAxes(TweetService.domain);
        //    setBrush();
        //    drawCircles();
        //    filterCircles();
        //
        //    $(window).on('resize', function() {
        //      clearTimeout(redrawTimeoutId);
        //
        //      redrawTimeoutId = $timeout(function() {
        //        drawAxes(TweetService.domain);
        //        setBrush();
        //        drawCircles();
        //        filterCircles();
        //      }, 300).$$timeoutId;
        //    });
        //
        //    $scope.$watch('tweets.active', filterCircles);
        //
        //    $scope.$watchGroup([
        //      'filters.time',
        //      'filters.highlightRelevant',
        //      'filters.highlightUnfamiliar'
        //    ], function() {
        //      drawCircles();
        //      filterCircles();
        //    });
        //  });
      }
    }
  });