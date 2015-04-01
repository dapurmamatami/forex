(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('MasterRankingListController',MasterRankingListController);

  MasterRankingListController.$inject=['$scope','$http','$state']

      function MasterRankingListController($scope,$http,$state){
          $scope.changeData=changeData;
          $scope.showMenu = showMenu;
          $scope.backMenu = backMenu;
          $scope.loadMore = loadMore ;
          $scope.skipToUser = skipToUser;

          $scope.period = 7;
          $scope.head_title='最近 1 周';
          function showMenu() {
             $scope.showDropdown = true;
          }

          function backMenu() {
              $scope.showDropdown = false;
          }

          function skipToUser(userCode){
              $state.go('invest.subPage',{userCode:userCode,subPage:'summary'})
          }

          function getMasterList(period,after){
              $scope.showDropdown = false;
              if(!$scope.listData){
                  $scope.listData = [];
              }
              $http.get('/master_list',{ params:{
                  period:period,
                  after:after,
                  count:10
              }}).then(function(data){
                  if(data.is_succ){
                      //console.info(data);
                      $scope.listData = $scope.listData.concat(data.data);
                      $scope.timeStampe = data.timestamp;
                      if(data.data.length<10){
                          $scope.anyMore = false;
                      }else{
                          $scope.anyMore = true;
                      }
                      $scope.$broadcast('stopLoadingMore');
                  }
              })
          }
          function changeData(period){
              $scope.period = period;
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
              $scope.listData = [];
              getMasterList(period,0);
          }
          function loadMore(period,after){
              getMasterList(period,after);
          }
          getMasterList(7,0);
      }
})();
