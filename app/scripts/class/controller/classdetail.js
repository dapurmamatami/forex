(function(){
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('ClassDetailController',ClassDetailController);

    ClassDetailController.$inject = ['$scope', '$state', 'stock'];

    function ClassDetailController($scope, $state, stock) {
        $scope.chartType = 'price';
        $scope.forex = {
            name: $state.params.className,
            period: {
                value: '',
                valShow: ''
            },
            priceBuy: '',
            priceSale: '',
            timestamp: '',
        };
        $scope.paintChart = paintChart;

        paintChart(7, '近 1 周内');

        function paintChart(value, valShow) {
            $scope.forex.period.value = value;
            $scope.forex.period.valShow = valShow;
            
            stock.getSymbolDetail($scope.forex.name, $scope.forex.period.value).then(function (data) {
                $scope.$broadcast('paintLineChart', data.data);
            });
        }      

    }


})();
