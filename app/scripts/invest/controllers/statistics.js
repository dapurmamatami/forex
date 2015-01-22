(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestStatisticsController', InvestStatisticsController);

    InvestStatisticsController.$inject = ['$scope', '$state', 'stock'];
    
    function InvestStatisticsController($scope, $state, stock) {
        $scope.currentPeriod = '';
        $scope.repaintChart = repaintChart;
        
        // 监听 $scope.$parent.accountType 值的变化，重新请求数据
        $scope.$watch(function () {
            return $scope.$parent.accountType;
        }, function () {
            $scope.currentPeriod = '近 1 周 内';
            
            stock.getEquityReport({
                period: 7,
                tiger_source: $scope.$parent.accountType.key
            }).then(function (data) {
                $scope.$broadcast('paintLineChart', data.data);    
            });

            stock.getSummaryReport({
                tiger_source: $scope.accountType.key
            }).then(function (data) {
                $scope.summary = data;
                $scope.$broadcast('paintDonutChart', data);
            });   
        }, true);

        function repaintChart(number, currentPeriod) {
            $scope.currentPeriod = currentPeriod;

            stock.getEquityReport({
                period: number,
                tiger_source: $scope.$parent.accountType.key
            }).then(function (data) {     
                $scope.$broadcast('paintLineChart', data.data);
            });
        }      
    }
})();