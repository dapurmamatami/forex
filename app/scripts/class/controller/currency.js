(function(){
    'use strict';
    angular
      .module('tigerwitPersonalApp')
      .controller('ClassCurrencyController',ClassCurrencyController);
    ClassCurrencyController.$inject = ['$scope','$http','$state'];
    function ClassCurrencyController($scope,$http,$state){

        $scope.getCurrency= getCurrency;
        $scope.linkDetail = linkDetail;

        function linkDetail(className){
            window.symbol_detail_single = $scope.mData;
            $state.go('class.detail',{className:className});
        }
        function getCurrency(){

            $http.get('/symbol_list',{
                params:{
                    tab:1
                }
              }).then(function(data){
                $scope.mData = data;
            })
        }
        getCurrency();
    }
})();
