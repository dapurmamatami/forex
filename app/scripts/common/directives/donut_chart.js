;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twDonutChart', twDonutChart);

    function twDonutChart() {
        return {
            restrict: 'A',
            replace: true,
            template: 
                '<div class="donut_chart">' +
                    '<img class="donut_chart__loading_img" src="ngsrc/ajax-loading.gif">' + 
                '</div>',
            link: function (scope, element, attrs) {
                scope.$on('paintDonutChart', function (event, data) {
                    var id = element.attr('id');

                    if (id.indexOf('profit') > 0) {
                        data = parseFloat(data.profit_rate);
                    } 

                    if (id.indexOf('deficit') > 0) {
                        data = parseFloat(data.deficit_rate);
                    }
                    var dataRest = 100 - data;
                    
                    var options = {
                        chart: {
                            type: 'pie',
                            width: 150,
                            height: 150
                        },

                        title: {
                            text: ''
                        },

                        exporting: {
                            enabled: false
                        },

                        credits: {
                            enabled: false
                        },

                        plotOptions: {
                            pie: {
                                shadow: false,
                                center: ['50%', '50%']
                            }
                        },

                        tooltip: {
                            formatter: function () {
                                return '<span style="font-weight:700;">' + 
                                        this.y + '%</span>'
                            }
                        },

                        series: [{
                            data: [{
                                y: data,
                                color: '#008acd'
                            },{
                                y: dataRest,
                                color: '#f5f5f5'
                            }],
                            size: '80%',
                            innerSize: '70%',
                            dataLabels: {
                                formatter: function () {
                                }
                            }
                        }]
                    };

                    element.highcharts(options);
                });
            }
        };
    }
})();