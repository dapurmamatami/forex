(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('ClassCurrencyController',ClassCurrencyController);

    ClassCurrencyController.$inject = ['$scope','$http']

    function ClassCurrencyController($scope,$http){

          $scope.getCurrency= getCurrency;
          function getCurrency(){

              $http.get('/symbol_list',{
                  params:{
                      tab:1
                  }
                }).then(function(data){
                  console.info(data)
                  $scope.mData = data;
              })
          }
          getCurrency();
        }
})();
