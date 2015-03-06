(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestSummaryController', InvestSummaryController);

    InvestSummaryController.$inject = ['$scope','$location','$state','stock'];

    function InvestSummaryController($scope,$location,$state,stock) {


    stock.getSummaryReport( $scope.accountType.key, $state.params.userCode,7).then(function(data){
        $scope.total_profit_rate = data.total_profit_rate;
        $scope.max_profit = data.max_profit;
        $scope.max_deficit = data.max_deficit;
        $scope.profit_rate = data.profit_rate;
    });
  }

})();
