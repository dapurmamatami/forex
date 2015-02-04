(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestStatisticsController', InvestStatisticsController);

    InvestStatisticsController.$inject = ['$scope', '$state', 'stock'];
    
    function InvestStatisticsController($scope, $state, stock) {
        $scope.currentPeriod = '';
        $scope.repaintChart = repaintChart;
        
        if (!$scope.userType.isPersonal) {
            $scope.currentPeriod = '近 1 周 内';

            stock.getEquityReport(7, 'real', $scope.userType.code).then(function (data) {
                $scope.$broadcast('paintLineChart', data.data);
                $scope.$broadcast('hideLoadingImg');
            });

            stock.getSummaryReport('real', $scope.userType.code).then(function (data) {
                $scope.summary = data;
                $scope.$broadcast('paintDonutChart', data);
            });

        } else {
            // 监听 $scope.$parent.accountType 值的变化，重新请求数据
            $scope.$watch(function () {
                return $scope.$parent.accountType;
            }, function () {
                $scope.currentPeriod = '近 1 周 内';
                
                stock.getEquityReport(7, $scope.$parent.accountType.key).then(function (data) {
                    $scope.$broadcast('hideLoadingImg');
                    $scope.$broadcast('paintLineChart', data.data);    
                });

                stock.getSummaryReport($scope.accountType.key).then(function (data) {
                    $scope.summary = data;
                    $scope.$broadcast('paintDonutChart', data);
                });   
            }, true);
        }

        function repaintChart(number, currentPeriod) {
            $scope.currentPeriod = currentPeriod;

            if (!$scope.userType.isPersonal) {
                stock.getEquityReport(number, 'real', $scope.userType.code).then(function (data) {
                    $scope.$broadcast('paintLineChart', data.data);
                });
            } else {
                stock.getEquityReport(number, $scope.$parent.accountType.key).then(function (data) {     
                    $scope.$broadcast('paintLineChart', data.data);
                });
            }
        }      
    }
})();