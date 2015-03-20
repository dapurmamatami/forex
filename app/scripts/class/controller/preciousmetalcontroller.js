(function(){
    'use strict';
    angular
      .module('tigerwitPersonalApp')
      .controller('ClassPreciousMetalController',ClassPreciousMetalController);

    ClassPreciousMetalController.$inject = ['$scope','$http'];
    function ClassPreciousMetalController($scope,$http) {

        $scope.getPrecious_metal = getPrecious_metal;
        function getPrecious_metal() {
            $http.get('/symbol_list', {
                params: {
                  tab: 2
                }
            }).then(function (data) {
               console.info(data);
               $scope.mData = data;
            })
        }
        getPrecious_metal();
    }
})()
