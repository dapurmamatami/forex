(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('ClassCfdController',ClassCfdController);

    ClassCfdController.$inject = ['$scope','$http'];
    function ClassCfdController($scope,$http){
        function getCfd(){
            $http.get('/symbol_list',{
              params:{
                tab:3
              }
            }).then(function(data){
                console.info(data)
                $scope.mData = data;
            })
        }
        getCfd()
  }
})();
