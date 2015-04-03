(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('ClassCfdController',ClassCfdController);

    ClassCfdController.$inject = ['$scope','$http','$state'];
    function ClassCfdController($scope,$http,$state){
        $scope.linkDetail = linkDetail;
        function linkDetail(className){
            $state.go('class.detail',{className:className});
        }
        function getCfd(){
            $http.get('/symbol_list',{
              params:{
                tab:3
              }
            }).then(function(data){
                $scope.mData = data;
            })
        }


      getCfd();


  }
})();
