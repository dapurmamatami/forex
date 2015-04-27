(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twLineChart', twLineChart);

    function twLineChart() {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                chartType: '='
            },
            template: 
                '<div id="chart" class="line_chart">' +
                    '<img class="line_chart__loading_img" src="ngsrc/ajax-loading.gif">' + 
                '</div>',
            link: function (scope, element, attrs) {
                // scope.chartType 线形图类型
                //值为：0（资产变化曲线）、1（外汇价格变化曲线）
                var options;

                scope.$on('paintLineChart', function (event, data) {   
                    
                    // 资产变化曲线
                    if (scope.chartType === 0) {
                        
                        data = Highcharts.map(data, function (config) {
                            return {
                                x: config[0] * 1000,
                                y: config[1]        
                            };
                        });     
                        
                        options = {
                            chart: {
                                renderTo: 'chart',
                                type: 'line',
                                height: 300,
                                spacing: 10 
                            },

                            title: {
                                text: ''
                            },

                            legend: {
                                align: 'center',
                                verticalAlign: 'bottom',
                                borderWidth: 1,
                                borderRadius: 4,
                                borderColor: '#ccc',
                                //enabled: false
                            },

                            yAxis: {
                                title: {
                                   enabled: false 
                                },
                                labels: {
                                    formatter: function () {
                                        return this.value + '%';
                                    }
                                }
                            },

                            xAxis: {
                                type: 'datetime',
                                dateTimeLabelFormats: {
                                    day: '%m/%d',
                                    month: '%y/%m/%d',
                                    year: '%y/%m',
                                    week: '%m/%d'
                                }
                            },

                            credits: {
                                enabled: false
                            },

                            exporting: {
                                enabled: false
                            },

                            tooltip: {
                                useHTML: true,
                                formatter: function () {
                                    var date = new Date(this.x);
                                    var dateStr = date.getFullYear() + '/' + 
                                            (date.getMonth() + 1) +'/' + 
                                            (date.getDate());
                                    var className = 'line_chart__value_y';

                                    if (this.y > 0) {
                                        className = 'line_chart__value_y-pos';                                          
                                    }                                
                                    
                                    if (this.y == 0) {
                                        className = 'line_chart__value_y';
                                    }

                                    if (this.y < 0) {
                                        className = 'line_chart__value_y-neg';
                                    }

                                    return '<p>' + dateStr + 
                                            '</p><p class="' + className + '">' +
                                            this.y + '%</p>';        

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

                        new Highcharts.Chart(options);
                    }

                    // 价格变化曲线
                    if (scope.chartType === 1) {
                        data = Highcharts.map(data, function (config) {
                            return {
                                x: config['timestamp'] * 1000,
                                y: parseFloat(config['price'])
                            };
                        });

                        options = {
                            chart: {
                                renderTo: 'chart',
                                type: 'spline',
                                height: 280,
                                spacing: 10
                            },

                            title: {
                                text: ''
                            },

                            yAxis: {
                                title: {
                                    enabled: false
                                },
                                labels: {
                                    formatter: function () {
                                        return '$' + this.value;
                                    }
                                }
                                
                            },

                            xAxis: {
                                type: 'datetime',
                                dateTimeLabelFormats: {
                                    day: '%m/%d',
                                    month: '%y/%m/%d',
                                    year: '%y/%m',
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
                                    var date = new Date(this.x);
                                    var dateStr = date.getFullYear() + '/' + 
                                            (date.getMonth() + 1) + '/' + 
                                            (date.getDate());
                                    var className = 'line_chart__value_y';

                                    return '<p>' + dateStr + '</p><p class="' + 
                                            className + '">$' + this.y + '</p>';
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
                                fillColor: {
                                    linearGradient : {
                                        x1: 0,
                                        y1: 0,
                                        x2: 0,
                                        y2: 1
                                    },
                                    stops: [
                                        [0, Highcharts.getOptions().colors[0]],
                                        [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                    ]
                                },
                                turboThreshold: 4000,
                                threshold: null
                            }]
                        };

                        //$(element).highcharts('StockChart', options);
                        $(element).highcharts(options);
                    }

                });
            }
        };
    }

})();