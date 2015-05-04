(function(){
	'use strict';

	angular.module('tigerwitPersonalApp')
	.controller("MasterRecommendController",MasterRecommendController);

	MasterRecommendController.$inject = ['$scope','$http'];

	function MasterRecommendController($scope,$http){

		$http.get('/recommend_list',{params:{}}).then(function(data){

			if(data.is_succ){
				console.info(data);
				$scope.mData = data.data;


			}
		});

	}

})();