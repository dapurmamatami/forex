(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('MasterRecommendController',MasterRecommendController);

    MasterRecommendController.$inject=['$scope','$http']

    function MasterRecommendController($scope,$http){

        getMasterList();
        function getMasterList(){

            $http.get('/master_list',{ }).then(function(data){
                if(data.is_succ){
                    console.info(data);
                    $scope.data = data;
                }
            })
        }
    }
})();
