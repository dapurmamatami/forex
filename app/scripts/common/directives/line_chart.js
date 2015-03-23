(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twLineChart', twLineChart);

    function twLineChart() {
        return {
            restrict: 'A',
            replace: true,
            template: '<div id="chart" class="line_chart" style="position:relative;height: 250px;">' +
                      '<img src="ngsrc/ajax-loading.gif" style="position:absolute;top:50%;left:50%;width:50px;margin-top:-25px;margin-left:-25px;"></div>',
            link: function (scope, element, attrs) {
                // scope.chartType 线形图类型
                var options;

                scope.$on('paintLineChart', function (event, data) {   
                    
                    // 价格变化曲线
                    if (scope.chartType === 'price') {
                        data = Highcharts.map(data, function (config) {
                            return {
                                x: config['timestamp'] * 1000,
                                y: parseFloat(config['price'])
                            };
                        });

                        options = {
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
                                    var date = dateStamp.getFullYear() + '/' + 
                                            (dateStamp.getMonth() + 1) + '/' + 
                                            (dateStamp.getDate());
                                    return '<p class="line_chart__title">' + date + 
                                            '</p><p class="line_chart__money">$' + 
                                            this.y + '</p>';
                                }
                            },
                            series: [{
                                name: '价格变化曲线',
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
                    }


                    // 资产变化率
                    if (scope.chartType === 'money') {
                        data = Highcharts.map(data, function (config) {
                            return {
                                x: config[0] * 1000,
                                y: config[1]        
                            };
                        });     
                        
                        options = {
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
                    }

                    var chart = new Highcharts.Chart(options);    
                });        


                
            }
        };
    }

})();