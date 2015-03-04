(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twLineChart', twLineChart);

    function twLineChart() {
        return {
            restrict: 'A',
            replace: true,
            template: '<div id="chart" class="line_chart" style="width: 650px;height: 250px;margin: 0 auto;">' +
                      '<img src="ngsrc/ajax-loading.gif" style="width:150px;margin:50px 250px;"></div>',
            link: function (scope, element, attrs) {
                scope.$on('paintLineChart', function (event, data) {
                    data = Highcharts.map(data, function (config) {
                        return {
                            x: config[0] * 1000,
                            y: config[1]        
                        };
                    });         
                    
                    var options = {
                        chart: {
                            renderTo: 'chart',
                            type: 'line'
                        },
                        title: {
                            text: ''
                        },
                        yAxis: {
                            title: {
                                enabled: false
                            }
                        },
                        xAxis: {
                            gapGridLineWidth: 0,
                            type: 'datetime',
                            dateTimeLabelFormats: {
                                day: '%m/%d',
                                month: '%m/%d',
                                year: '%m年',
                                week: '%m/%d'
                            }
                        },
                        credits: {
                            enabled: false
                        },
                        exporting: {
                            enabled: false
                        },
                        legend: {
                            align: 'center',
                            verticalAlign: 'bottom',
                            borderWidth: 1,
                            borderRadius: 4,
                            borderColor: '#ccc'
                        },
                        tooltip: {
                            useHTML: true,
                            formatter: function () {
                                var dateStamp = new Date(this.x);
                                var date = dateStamp.getFullYear() + '/' + (dateStamp.getMonth() + 1) +
                                        '/' + (dateStamp.getDate());
                                return '<p class="line_chart__title">' + date + 
                                        '</p><p class="line_chart__money">' + this.y + '%</p>';
                            }
                        },
                        series: [{
                            name: '资产变化率',
                            type: 'area',
                            data: data,
                            gapSize: 5,
                            tooltip: {
                                valueDecimals: 2
                            },
                            fillColor : {
                                linearGradient : {
                                    x1: 0,
                                    y1: 0,
                                    x2: 0,
                                    y2: 1
                                },
                                stops : [
                                    [0, Highcharts.getOptions().colors[0]],
                                    [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                ]
                            },
                            turboThreshold: 4000,
                            threshold: null
                        }]
                    };
                    var chart = new Highcharts.Chart(options);    
                });        


                
            }
        };
    }

})();