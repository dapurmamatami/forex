(function () {
  'use strict';

  angular
    .module('tigerwitPersonalApp')
    .controller('PersonalCommunicateInfoController',PersonalCommunicateInfoController);

  PersonalCommunicateInfoController.$inject = ['$rootScope','$timeout','$scope','communicate'];

  function PersonalCommunicateInfoController($rootScope,$timeout,$scope,communicate) {

      /**
       *
       * 控制交流页面的
       *
       * @type {boolean}
       */
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
          if(!$scope.data){
              $scope.data = [];
          }
          var startIndex = $scope.data.length;
          var promise = communicate.hotInvester({"startindex":startIndex,"offset":10});

          promise.then(function(data){
                if(data.statecode){
                   $scope.data = $scope.data.concat(data.data);
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
          if($scope.inputContent.trim()==""){
             return;
          }
          communicate.publishTopic({
              "publisher_id":$rootScope.usercode,
              "content":$scope.inputContent,
              "bystramsmitid":0
          }).then(function(data){
              if(data.statecode){
                  $scope.showOrNo = 'cm-enter';
                  $timeout(function(){
                     $scope.showOrNo = 'cm-leave';
                  },1000);
              }
          },function(){

          });
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

    PersonalCommunicateDoController.$inject=['$rootScope','$timeout',"$scope",'communicate'];

    function PersonalCommunicateDoController($rootScope,$timeout,$scope,communicate){
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
        $scope.getTopicDetial = getTopicDetail;
        $scope.matchCommentContent = matchCommentContent;


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
          if($scope.inputContent.trim()==""){
              return;
          }

          communicate.doComment({
            "type":0,
            "usercode":$rootScope.usercode,
            "content":$scope.inputContent,
            "topicid":$scope.mData.topicid
          }).then(function(data){
            if(data.statecode){
              $scope.toastMsg = "评论成功！";
              $scope.mData.comment_sum=$scope.mData.comment_sum+1;
            }else{
              $scope.toastMsg = "评论失败";
            }
              $scope.showOrNo = 'cm-enter';
              $timeout(function(){
                $scope.showOrNo = 'cm-leave';
              },1000);
            },
          function(){});
          $scope.tempContent =$scope.inputContent;
          $scope.inputContent = "";
          $scope.tRemainSum = 0;
        }

        function doSupport(){
          communicate.doSupportPoint({
            "type":0,
            "usercode":$rootScope.usercode,
            "topicid":$scope.mData.topicid
          }).then(function(data){
            if(data.statecode){
              $scope.mData.support_sum =  $scope.mData.support_sum+1;
            }

          },function(){});
        }

        function doTransmit(){
          communicate.publishTopic({
            "publisher_id":$rootScope.usercode,
            "content":$scope.mData.content,
            "bytramsmitid":$scope.mData.topicid
          }).then(function(data){
            if(data.statecode){
              $scope.mData.tramsmit_sum =  $scope.mData.tramsmit_sum+1;
            }
          },function(){

          });
        }

        function getTopicDetail(){
          communicate.topicDetail({
            topicid:$scope.mData.topicid
          }).then(function(data){


          },function(data){});
        }
    }
})();


