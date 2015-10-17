angular.module("cision.directives", [])
  .directive("pie", function () {
    return {
      restrict: 'A',
      scope: {
        donutPercent: '='
      },
      link: function (scope, element, attrs) {

        scope.$watch('donutPercent', function () {
          console.log(attrs.donutPercent);
          console.log(scope.donutPercent);
          if (scope.donutPercent) {
            drawDonutChart(element, scope.donutPercent);
          }
        });

        var drawDonutChart = function (element, percent) {
          var el = $(element);

          el.html('');
          var donutColor = el.attr('data-donut-color');

          var tt = 2 * Math.PI,
            width = 100,
            height = 100,
            outerRadius = Math.min(width, height) / 2,
            innerRadius = outerRadius - 5,
            fontSize = (Math.min(width, height) / 4);

          var startTT = -tt * .43;
          var endTT = .43 * tt;

          var arc = d3.svg.arc()
            .innerRadius(innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(outerRadius - innerRadius)
            .startAngle(startTT);

          var svg = d3.select(element[0]).append("svg")
            .attr("width", '70%')
            .attr("height", '70%')
            .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
            .attr('preserveAspectRatio', 'xMinYMin')
            .append("g")
            .attr("transform", "translate(" + Math.min(width, height) / 2 + "," + Math.min(width, height) / 2 + ")");

          var text = svg.append("text")
            .text('0%')
            .attr("text-anchor", "middle")
            .style("font-size", fontSize + 'px')
            .style("fill", '#2c3e50')
            .attr("dy", fontSize / 3)
            .attr("dx", 2);

          var background = svg.append("path")
            .datum({endAngle: tt})
            // .style("fill", "#7cc35f")
            .style("fill", "#fff")
            .attr("d", arc);

          var midground = svg.append("path")
            .datum({endAngle: startTT + 0.000001})
            .style("fill", "#efefff")
            .attr("d", arc);

          var foreground = svg.append("path")
            .datum({endAngle: startTT + 0.000001})
            .style("fill", donutColor)//"#57893e")
            .attr("d", arc);

          midground.transition()
            .duration(50)
            .call(arcTween, endTT);

          var tt100p = startTT - endTT;

          var ttPer = startTT - (tt100p * percent) / 100;

          foreground.transition()
            .duration(1500)
            .call(arcTween, ttPer);

          function arcTween(transition, newAngle) {


            transition.attrTween("d", function (d) {

              var interpolate = d3.interpolate(d.endAngle, newAngle);

              return function (t) {

                d.endAngle = interpolate(t);

                var ss = startTT - d.endAngle;

                text.text(Math.round((ss / tt100p) * 100)).append('tspan')
                  .attr('baseline-shift', 'super').style("font-size", '12px').text('%');

                return arc(d);
              };
            });
          }
        };
      }
    };

  })
  .directive("chart", ['$timeout', 'lodash', function ($timeout, _) {
      return {
        restrict: 'A',
        scope: {
          chartdata: '=',
          firstLoadDelay: '='
        },
        link: function (scope, element, attrs) {

          scope.$watch('chartdata', function () {
            console.log(attrs.chartdata);
            console.log(scope.chartdata);
            if (scope.chartdata) {
              $timeout(function () {
                drawRankChart(element, scope.chartdata, _);
              }, 500 + scope.firstLoadDelay);
            }


            var drawRankChart = function (element, data, _) {
              var el = $(element);
              el.html('');
              var margin = {top: 8, right: 0, bottom: 45, left: 30},
              width = el.parent().width() - margin.left - margin.right, //746
                height = el.parent().width() / 746 * 272 - margin.top - margin.bottom;

              var parse = d3.time.format("%d ").parse;//%b %Y").parse;

              var x = d3.time.scale().range([0, width]),
                y = d3.scale.linear().range([height, 0]),
                xAxis = d3.svg.axis().scale(x).tickSize(-height)
                .tickFormat(d3.time.format("%a"));
              xAxis2 = d3.svg.axis().scale(x).tickSize(-height)
                .tickSubdivide(false).tickFormat(d3.time.format("%b %d"));

              yAxis = d3.svg.axis().scale(y).ticks(5).orient("left")
                .tickPadding(10).tickSize(width)
                .outerTickSize(0).tickValues([1, 25, 50, 75, 100]);

              var line = d3.svg.line()
                .defined(function (d) {
                  return d.value != null;
                })
                .x(function (d) {
                  return x(d.date);
                })
                .y(function (d) {
                  return y(d.value);
                });

              var values = data;

              _.map(values, function (d) {
                if (!_.isDate(d.date)) {
                  d.date = toDate(d.date);
                }
              });

              x.domain([values[0].date, values[values.length - 1].date]);
              y.domain([100, 0]).nice();

              var startEndDates = function (d) {
                return (d.toString() == values[0].date.toString()) || (d.toString() == values[values.length - 1].date.toString())
              }

              xAxis.ticks(values.length).tickFormat(function (d) {
                if (startEndDates(d)) {
                  return '';
                } else {
                  var format = d3.time.format("%a");
                  return format(d);
                }

              });
              xAxis2.ticks(values.length).tickFormat(function (d) {
                if (startEndDates(d)) {
                  return '';
                } else {
                  var format = d3.time.format("%b %d");
                  return format(d);
                }

              });
              ;

              var svg = d3.select(element[0]).append('svg')
                .attr("width", "100%")//width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom))
                .attr('preserveAspectRatio', 'xMinYMin')
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

              // Add the clip path.
              svg.append("clipPath")
                .attr("id", "clip")
                .append("rect")
                .attr("width", width)
                .attr("height", height);

              // Add the x-axis.
              svg.append("g")
                .attr("class", "x axis")
                .style("text-transform", "uppercase")
                .attr("transform", "translate(0," + (height + 15) + ")")
                .call(xAxis);

              svg.append("g")
                .attr("class", "x axis axis2")
                .attr("transform", "translate(0," + (height + 30) + ")")
                .call(xAxis2);

              // Add the y-axis.
              var gy = svg.append("g")
                .attr("class", "y axis")
                .attr("transform", "translate(" + width + ",0)")
                .call(yAxis)
                .classed("minor", true);


              var path = svg.selectAll('.line')
                .data([values])
                .enter()
                .append('path')
                .attr('class', 'line')
                .style('opacity', 0)
                .style('stroke', function (d) {
                  return '#2589c6'
                })
                .attr('clip-path', 'url(#clip)')
                .attr('d', function (d) {
                  return line(d);
                });

              var totalLength = path.node().getTotalLength();


              var dots = svg.selectAll(".dot")
                .data(data.filter(function (d) {
                  return d.value;
                }))
                .enter().append("circle")
                .style('opacity', 0)
                .attr("class", "dot")
                .attr("cx", line.x())
                .attr("cy", line.y())
                .attr("r", 2)
                .on("mouseover", function (d) {
                  div.transition()
                    .duration(200)
                    .style("opacity", .9);
                  div.html(d.value + '<small>th</small>')
                    .style("left", (d3.event.pageX - 23) + "px")
                    .style("top", (d3.event.pageY - 50) + "px");
                })
                .on("mouseout", function (d) {
                  div.transition()
                    .duration(500)
                    .style("opacity", 0);
                })

                .transition()
                .delay(function (d, i) {
                  return i * 200;
                })
                .style('opacity', .5)
                .each("end", function () {
                  d3.select(this).
                    transition()
                    .duration(10)
                    .delay(1)
                    .attr("r", 7)
                    .style('opacity', 1);

                });

              path
                .attr("stroke-dasharray", totalLength + " " + totalLength)
                .attr("stroke-dashoffset", totalLength)
                .transition()
                .delay(900)
                .duration(900)
                .ease("linear")
                .style('opacity', 1)
                .attr("stroke-dashoffset", 0);

              var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

              function toDate(d) {
                if (d) {
                  var t = d.split(/[- :]/);
                  var d = new Date(t[0], t[1] - 1, t[2]);
                }
                return d;
              }

            }


          });
        }
      }
    }]);
