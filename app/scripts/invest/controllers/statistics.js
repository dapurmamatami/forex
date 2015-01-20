(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestStatisticsController', InvestStatisticsController);

    InvestStatisticsController.$inject = ['$scope', 'stock'];
    
    function InvestStatisticsController($scope, stock) {
        $scope.currentPeriod = '近 1 周内';
        $scope.repaintChart = repaintChart;

        stock.getEquityReport({
            period: 7
        }).then(function (data) {
            $scope.$broadcast('paintChart', data.data);        
        });        

        stock.getSummaryReport().then(function (data) {
            $scope.summary = data;
            $scope.$broadcast('paintDonutChart', data);
        });

        function repaintChart(count, currentPeriod) {
            $scope.currentPeriod = currentPeriod;

            stock.getEquityReport({
                period: count
            }).then(function (data) {     
                $scope.$broadcast('paintChart', data.data);
            });
        }      
    }
})();