(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('MasterRankingListController',MasterRankingListController);

  MasterRankingListController.$inject=['$scope','$http']

      function MasterRankingListController($scope,$http){
          $scope.getMasterList=getMasterList;
          $scope.showMenu = showMenu;
          $scope.backMenu = backMenu;
          function showMenu() {
             $scope.showDropdown = true;
          }

          function backMenu() {
              $scope.showDropdown = false;
          }
          function getMasterList(period){
              $scope.showDropdown = false;
              $http.get('/master_list',{ params:{
                  period:period
              }}).then(function(data){
                  if(data.is_succ){
                      console.info(data);
                      $scope.data = data;
                      changeData(period);
                  }
              })

          }
          function changeData(period){
              if(period==7){
                  $scope.head_title='最近 1 周';
              }else if(period ==30){
                $scope.head_title='最近 1 月';
              }else if(period == 90){
                $scope.head_title='最近 3 月';
              }
              else if(period ==180){
                $scope.head_title='最近 6 月';
              }
              else if(period == 360){
                $scope.head_title='最近 1 年';
              }
          }
          getMasterList(7);
      }
})();
