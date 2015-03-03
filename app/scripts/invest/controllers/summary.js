(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestSummaryController', InvestSummaryController);

    InvestSummaryController.$inject = ['$scope','$location','$state','stock'];

    function InvestSummaryController($scope,$location,$state,stock) {


    stock.getSummaryReport( $scope.accountType.key, $state.params.userCode,7).then(function(data){
        $scope.total_profit_rate = data.total_profit_rate*100;
        $scope.max_profit = data.max_profit*100;
        $scope.max_deficit = data.max_deficit*100;
        $scope.profit_rate = data.profit_rate*100;
    });
  }

})();
