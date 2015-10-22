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
                useHTML: true,
                headerFormat: '<table>',
                pointFormat: '<tr><th><h5>Topic: {point.name}</h5></th></tr>' +
                    '<tr><td>Score: {point.z}</td></tr>',
                footerFormat: '</table>',
                followPointer: true
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




