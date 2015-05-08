(function () {
  'use strict';

  angular
    .module('tigerwitPersonalApp')
    .controller('PersonalCommunicateInfoController',PersonalCommunicateInfoController);

  PersonalCommunicateInfoController.$inject = [
  '$cookieStore',
  '$scope',
  'communicate',
  '$location',
  '$state'];

  function PersonalCommunicateInfoController($cookieStore,$scope,communicate,$location,$state) {

      /**
       *
       * 控制交流页面的
       *
       * @type {boolean}
       */
      //$cookieStore.put('usercode',1120);
      //$rootScope.usercode = 1120;
      var rel_state = "rel";
      var hot_state = 'hot';
      var summary_state = 'summary';

      $scope.showDropdown = false;
      $scope.communicate_identify = "hot"; //标识现在状态
      $scope.isSummary = false;

      $scope.showMenu = showMenu;
      $scope.backMenu = backMenu;
      $scope.loadMore = loadMore;
      $scope.switchIdentify = switchIdentify;

      function showMenu() {
          $scope.showDropdown = true;
      }

      function backMenu() {
         $scope.showDropdown = false;
      }

      function loadMore(){
          getCommunicateInfo();
      }
      function switchIdentify(identify){
          $scope.showDropdown = false;
          $scope.communicate_identify = identify;
          if(identify==hot_state){
              $scope.title_name = "热门投资动态";
          }else if(identify==rel_state){
              $scope.title_name = "与我相关的";
          }

          $scope.mCdata = [];
          getCommunicateInfo ();
      }

      function getCommunicateInfo(){
          if($scope.communicate_identify==hot_state){
              gethotInvestInfo();
          }else if($scope.communicate_identify ==rel_state||summary_state){
              getRelationCommunicateInfo();
          }

      }

      function gethotInvestInfo(){
          if(!$scope.mCdata){
              $scope.mCdata = [];
          }
          var startIndex = $scope.mCdata.length;
          communicate.hotInvester(startIndex,$scope.personal.user_code)
              .then(function(data){
                  if(data.statecode){
                      $scope.mCdata = $scope.mCdata.concat(data.data.list);
                      $scope.mapKeyVal = data.data.mapKeyVal;
                      
                      // var fans_info = Array();
                      // for(var aitem in data.data.attentions_info){
                      //   fans_info.push(data.data.attentions_info[aitem].userName);
                      // }
                      // $scope.fans_info = fans_info;
                      if($scope.mCdata.length<10){
                         $scope.anyMore = false;
                      }else{
                         $scope.anyMore = true;
                      }
                      $scope.$broadcast('hideLoadingImg');
                  }else{
                      console.log("statemessage:"+data.statemessage);
                  }
                  $scope.$broadcast('stopLoadingMore');
              },
              function(data){
                  console.log(data);
              });
      }
      function getRelationCommunicateInfo(){
          if(!$scope.mCdata){
             $scope.mCdata = [];
          }
          var startIndex = $scope.mCdata.length;
          communicate.relationTopic($scope.userCode,startIndex)
              .then(function(data){
                  if(data.statecode){
                      $scope.mCdata = $scope.mCdata.concat(data.data.list);
                      $scope.mapKeyVal = data.data.mapKeyVal;
                      if($scope.mCdata.length<10){
                          $scope.anyMore = false;
                      }else{
                          $scope.anyMore = true;
                      }
                      $scope.$broadcast('hideLoadingImg');
                  }else{

                  }
                  $scope.$broadcast('stopLoadingMore');
          });
      }


      (function init(){
          if(/summary/.test($location.path())){
              $scope.userCode = $state.params.userCode;
              $scope.communicate_identify = summary_state;
              $scope.title_name = '近期投资动态';
              $scope.isSummary = true;
          }else{
              $scope.userCode = $cookieStore.get('userCode');
              $scope.communicate_identify = hot_state;
              $scope.title_name = "热门投资动态";
          }
          communicate.getFanInfos($scope.personal.user_code).then(function(data){
            if(data.statecode){
              var fans_info = Array();
              for(var aitem in data.data){
                  fans_info.push(data.data[aitem].userName);
              }
              $scope.fans_info = fans_info;
            }

          })
          getCommunicateInfo();

      })();

  }

  angular
    .module('tigerwitPersonalApp')
    .controller('PersonalTopicPublishController',PersonalTopicPublishController);

  PersonalTopicPublishController.$inject = ['$scope','$timeout','communicate'];

  function PersonalTopicPublishController($scope,$timeout,communicate){

    /**
     * 控制话题发表
     * @type {number}
     */

      $scope.tRemainSum = 0;
      $scope.testD = 1;
      $scope.publishTopic = publishTopic;
      function publishTopic(){
          if(!$scope.inputContent){
              return;
          }
          if($.trim($scope.inputContent)==""){
             return;
          }
          communicate.publishTopic(
              $scope.personal.user_code,$scope.inputContent,0)
              .then(function(data){
                  if(data.statecode){
                      $scope.toastShow = 'cm-enter';

                      $scope.$parent.mCdata.unshift(data.data);
                      $scope.$parent.mapKeyVal = angular.extend($scope.$parent.mapKeyVal,data.data.mapKeyVal);
                      $timeout(function(){
                          $scope.toastShow = 'cm-leave';
                          $timeout(function(){
                              $scope.toastShow = '';
                          },1000);
                      },1000);
                  }
          },function(){});
          $scope.tempTopicContent =$scope.inputontent;
          $scope.inputContent = "";
          $scope.tRemainSum = 0;
      }

  }

  angular
      .module('tigerwitPersonalApp')
      .controller('PersonalCommunicateDoController',PersonalCommunicateDoController);

          PersonalCommunicateDoController.$inject=['$state','$timeout',"$scope",'$cookieStore','$modal','communicate'];

          function PersonalCommunicateDoController($state,$timeout, $scope,$cookieStore,$modal,communicate){
            /**
             * 控制每一条话题的
             * @type {boolean}
             */

              $scope.commentShowToggle = false;
              $scope.tRemainSum=0;
              $scope.showDropComment = showDropComment;
              $scope.isSelf = $cookieStore.get('userCode') == $scope.item.publisher_id ? 0 : 1;

              $scope.doComment = doComment;
              $scope.doSupport = doSupport;
              $scope.doTransmit = doTransmit;

              $scope.skipToSummary = skipToSummary;
              $scope.skipToSymbol = skipToSymbol;
              function showDropComment(){
                  $scope.commentShowToggle = !$scope.commentShowToggle;
              }

              function doComment(){
                  if(!$scope.inputContent){
                      return;
                  }
                  if($.trim($scope.inputContent)==""){
                      return;
                  }

                  communicate.doComment(
                      0,$scope.personal.user_code,$scope.inputContent,$scope.mData.topicid)
                      .then(function(data){
                          if(data.statecode){
                              $scope.toastMsg = "评论成功！";
                              $scope.mData.comment_sum=$scope.mData.comment_sum+1;
                          }else{
                              $scope.toastMsg = "评论失败";
                              $scope.inputContent = $scope.tempContent;
                          }
                          $scope.showOrNo = 'cm-enter';
                          $timeout(function(){
                              $scope.showOrNo = 'cm-leave';
                              $timeout(function(){
                                $scope.showOrNo = '';
                              },1000);
                          },1000);
                          },
                        function(data){
                            $scope.toastMsg = "评论失败";
                            $scope.inputContent = $scope.tempContent;
                        });
                  $scope.tempContent =$scope.inputContent;
                  $scope.inputContent = "";
                  $scope.tRemainSum = 0;
              }

              function doSupport(dataObj){
                  if(dataObj.publisher_id == parseInt($scope.personal.user_code)){
                      return;
                  }

                  communicate.doSupportPoint(
                      0,$cookieStore.get('userCode'),dataObj.topicid)
                      .then(function(data){
                          if(data.statecode){
                              dataObj.support_sum =  dataObj.support_sum+1;
                          }

                  },function(){});
              }

              function doTransmit(mData){
                  if(angular.inArray($scope.personal.user_code,mData.tramsmit_list)){


                  }
                  var modalInstance = $modal.open({
                      templateUrl:'/views/personal/tramsmit_model.html',
                      controller:'TramsmitController',
                      resolve:{
                          mData:function(){
                            return mData;
                          }
                      }
                  });
                  modalInstance.result.then(function(result) {

                      communicate.publishTopic(
                          $cookieStore.get('userCode'),result,mData.topicid)
                              .then(function(data){
                                  if(data.statecode){
                                      mData.tramsmit_sum =  mData.tramsmit_sum+1;
                                  }
                          },function(){});

                  });
              }

              function skipToSummary(touchId){
                  $state.go('invest.subPage',{userCode:touchId,subPage:'summary'});
              }
              function skipToSymbol(symbolType){
                 $state.go('class.detail',{className:symbolType})
              }
          }
})();


