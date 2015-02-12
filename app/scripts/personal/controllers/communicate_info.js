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
          communicate.hotInvester(startIndex)
              .then(function(data){
                  console.log(data);
                  if(data.statecode){
                     $scope.mCdata = $scope.mCdata.concat(data.data);
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
                      $scope.mCdata = $scope.mCdata.concat(data.data);
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
      $scope.publishTopic = publishTopic;
      $scope.matchTopicContent = matchTopicContent;
      function publishTopic(){
          if(!$scope.inputContent){
              return;
          }
          if($.trim($scope.inputContent)==""){
             return;
          }
          communicate.publishTopic(
              $scope.userCode,$scope.inputContent,0)
              .then(function(data){
                  if(data.statecode){
                      $scope.showOrNo = 'cm-enter';
                      $timeout(function(){
                         $scope.showOrNo = 'cm-leave';
                      },1000);
                  }
          },function(){});
          $scope.tempTopicContent =$scope.inputContent;
          $scope.inputContent = "";
          $scope.tRemainSum = 0;
      }


      function matchTopicContent(){
          var contentLength = $scope.inputContent.length;
          if(contentLength>1024){
              $scope.inputContent = $scope.inputContent.substring(0,1024);
              return;
          }
          $scope.tRemainSum =contentLength;
      }

  }

  angular
      .module('tigerwitPersonalApp')
      .controller('PersonalCommunicateDoController',PersonalCommunicateDoController);

          PersonalCommunicateDoController.$inject=['$timeout',"$scope",'$location','$cookieStore','$modal','communicate'];

          function PersonalCommunicateDoController($timeout, $scope,$location,$cookieStore,$modal,communicate){
            /**
             * 控制每一条话题的
             * @type {boolean}
             */

              $scope.commentShowToggle = false;
              $scope.tRemainSum=0;
              $scope.showDropComment = showDropComment;

              $scope.doComment = doComment;
              $scope.doSupport = doSupport;
              $scope.doTransmit = doTransmit;
              $scope.matchCommentContent = matchCommentContent;

              $scope.skipToSummary = skipToSummary;

              function showDropComment(){
                  $scope.commentShowToggle = !$scope.commentShowToggle;
              }

              function matchCommentContent(){
                  var contentLength = $scope.inputContent.length;
                  if(contentLength>1024){
                      $scope.inputContent = $scope.inputContent.substring(0,1024);
                      return;
                  }
                  $scope.tRemainSum =contentLength;
              }


              function doComment(){
                  if(!$scope.inputContent){
                      return;
                  }
                  if($.trim($scope.inputContent)==""){
                      return;
                  }

                  communicate.doComment(
                      0,$cookieStore.get('userCode'),$scope.inputContent,$scope.mData.topicid)
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
                  communicate.doSupportPoint(
                      0,$cookieStore.get('userCode'),dataObj.topicid)
                      .then(function(data){
                          if(data.statecode){
                              dataObj.support_sum =  dataObj.support_sum+1;
                          }

                  },function(){});
              }

              function doTransmit(mData){
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
                  $location.path('/invest/summary/'+touchId);
              }

          }
})();


