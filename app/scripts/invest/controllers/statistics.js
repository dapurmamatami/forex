(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestStatisticsController', InvestStatisticsController);

    InvestStatisticsController.$inject = ['$scope', '$state', 'stock'];
    
    function InvestStatisticsController($scope, $state, stock) {
        $scope.chartType = 'money';
        $scope.period = {
            value: '',
            valShow: ''
        };
        $scope.currentPeriod = '';
        $scope.paintChart = paintChart;
        
        if ($scope.userType.isPersonal) {
            
            // 监听 $scope.$parent.accountType 值的变化，重新请求数据
            $scope.$watch(function () {
                return $scope.$parent.accountType;
            }, function () {
                paintChart(7, '近 1 周内'); 
                getSummaryReport(); 
            }, true);
        } else {
            $scope.accountType.key = 'real';
            paintChart(7, '近 1 周内');    
            getSummaryReport();
        }

        function paintChart(value, valShow) {
            $scope.period.value = value;
            $scope.period.valShow = valShow;
            stock.getEquityReport($scope.period.value, $scope.accountType.key, 
                    $scope.userType.code).then(function (data) {
                $scope.$broadcast('paintLineChart', data.data);
                $scope.$broadcast('hideLoadingImg');
            });
        }

        function getSummaryReport() {
            stock.getSummaryReport($scope.accountType.key, $scope.userType.code).
                    then(function (data) {
                $scope.summary = data;
                $scope.$broadcast('paintDonutChart', data);        
            });
        }      
    }
})();