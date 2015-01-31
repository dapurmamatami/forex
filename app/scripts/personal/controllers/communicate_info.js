(function () {
  'use strict';

  angular
    .module('tigerwitPersonalApp')
    .controller('PersonalCommunicateInfoController',PersonalCommunicateInfoController);

  PersonalCommunicateInfoController.$inject = ['$cookieStore','$rootScope','$timeout','$scope','communicate'];

  function PersonalCommunicateInfoController($cookieStore,$rootScope,$timeout,$scope,communicate) {

      /**
       *
       * 控制交流页面的
       *
       * @type {boolean}
       */
      //$cookieStore.put('usercode',1120);
      $rootScope.usercode = 1120;
      $scope.showDropdown = false;
      $scope.showMenu = showMenu;
      $scope.backMenu = backMenu;
      $scope.loadMore = loadMore;

      function showMenu() {
          $scope.showDropdown = true;
      }

      function backMenu() {
         $scope.showDropdown = false;
      }

      function loadMore(){
         getCommunicateInfo();
      }

      function getCommunicateInfo(){
          if(!$scope.hotData){
              $scope.hotData = [];
          }
          var startIndex = $scope.hotData.length;
          var promise = communicate.hotInvester(startIndex);

          promise.then(function(data){
                if(data.statecode){
                   $scope.hotData = $scope.hotData.concat(data.data);
                }else{
                    console.log("statemessage:"+data.statemessage);
                }
            },
            function(data){
                console.log(data);
            });
      }
      getCommunicateInfo();

  }

  angular
    .module('tigerwitPersonalApp')
    .controller('PersonalTopicPublishController',PersonalTopicPublishController);

  PersonalTopicPublishController.$inject = ['$scope','$rootScope','$timeout','communicate'];

  function PersonalTopicPublishController($scope,$rootScope,$timeout,communicate){

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
              $rootScope.usercode,$scope.inputContent,0)
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

        PersonalCommunicateDoController.$inject=['$rootScope',
          '$timeout',"$scope",'communicate','$state','$location','$cookieStore'];

        function PersonalCommunicateDoController($rootScope,$timeout, $scope,communicate,
                                                 $state,$location,$cookieStore){
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
            $scope.skipDetail = skipDetail;

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

            function doSupport(){
                communicate.doSupportPoint(
                    0,$cookieStore.get('userCode'),$scope.mData.topicid)
                    .then(function(data){
                        if(data.statecode){
                            $scope.mData.support_sum =  $scope.mData.support_sum+1;
                                }

                },function(){});
            }

            function doTransmit(){
                communicate.publishTopic(
                    $cookieStore.get('userCode'),$scope.mData.content,$scope.mData.topicid)
                        .then(function(data){
                            if(data.statecode){
                                $scope.mData.tramsmit_sum =  $scope.mData.tramsmit_sum+1;
                            }
                          },function(){

                          });
            }
            function skipDetail(){
                $cookieStore.put("mDetailTopicId",$scope.mData['topicid']);
                //$state.go('topic_detail');
                $location.path('/personal/topic_detail');
            }

        }
})();


