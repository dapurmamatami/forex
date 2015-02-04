(function(){
    'use strict';
    angular
      .module('tigerwitPersonalApp')
      .controller('AdSideController',AdSideController);

    AdSideController.$inject = ['$scope','$location','$cookieStore'];

    function AdSideController($scope,$location,$cookieStore){
        $scope.equity = 0;
        $scope.skipToInvestSummary = skipToInvestSummary;
        $scope.$on('equity',function(event,data){
            $scope.equity = data;
        });

        function skipToInvestSummary(){
            $location.search('touchCode',$cookieStore.get('userCode'));
            $location.path('/invest/summary');
        }
    }
})();
