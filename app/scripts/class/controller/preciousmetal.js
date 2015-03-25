(function(){
    'use strict';
    angular
      .module('tigerwitPersonalApp')
      .controller('ClassPreciousMetalController',ClassPreciousMetalController);

    ClassPreciousMetalController.$inject = ['$scope','$http','$state'];
    function ClassPreciousMetalController($scope,$http,$state) {

        $scope.getPrecious_metal = getPrecious_metal;
        function getPrecious_metal() {
            $http.get('/symbol_list', {
                params: {
                  tab: 2
                }
            }).then(function (data) {
               $scope.mData = data;
            })
        }
        $scope.linkDetail = linkDetail;
        function linkDetail(className){
            window.symbol_detail_single = $scope.mData;
            $state.go('class.detail',{className:className});

        }
        getPrecious_metal();
    }
})();
