(function(){
	'use strict';

	angular.module('tigerwitPersonalApp')
	.controller("MasterRecommendController",MasterRecommendController);

	MasterRecommendController.$inject = ['$scope','$http','$state'];

	function MasterRecommendController($scope,$http,$state){

		$scope.skipToSummary = skipToSummary;

		$http.get('/recommend_list',{params:{}}).then(function(data){

			if(data.is_succ){
				$scope.mData = data.data;
			}
		});
		function skipToSummary(touchId){
          $state.go('invest.subPage',{userCode:touchId,subPage:'summary'});
        }
    }
})();