(function() {
    'use strict';

    angular.module('ChartConfig', [])
        .service('bubbleChartConfig', function() {
            this.getConfig = getBubbleChartConfig;
        });


    function getBubbleChartConfig(title, dataSeries) {
        return {
            options: getDefaultBubbleChartOptions(title),
            series: dataSeries
        }
    }

    function getDefaultBubbleChartOptions(title) {
        
       return {
                chart: {
                    type: 'bubble',
                    plotBorderWidth: 1,
                    zoomType: 'xy'
                },

            legend: {
                    enabled: false
            },

            title: { text: "" },

            xAxis: {
                labels: {
                    enabled: false
                }
            },

            yAxis: {
                labels:{
                    enabled: false
                }
            },
            tooltip: {
              enabled:false  
            },
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            }

        };
    }


})();




