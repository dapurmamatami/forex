(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('PersonalTopicDetailController',PersonalTopicDetailController);

    PersonalTopicDetailController.$inject = ["$timeout","$rootScope","$scope",'communicate','$cookieStore'];
    function PersonalTopicDetailController($timeout,$rootScope,$scope,communicate,$cookieStore){


        $scope.matchCommentContent = matchCommentContent;
        $scope.tRemainSum = 0;

        $scope.doComment = doComment;
        $scope.doSupport = doSupport;
        $scope.loadMore = loadMore;
        function getTopicInfo(commentLength){


            communicate.topicDetail($cookieStore.get("mDetailTopicId"),commentLength)
                .then(function(data){
                    console.info(data)
                    if(data.statecode){
                       if(!commentLength){
                          $scope.topicDetailData = data.data;
                          $scope.commentList = $scope.topicDetailData.comment_list;
                          $scope.pContent = data.data.content;
                       }else{
                          $scope.commentList = $scope.commentList.concat(data.data);
                       }

                    }
            },function(data){

            });
        }


        function matchCommentContent(){
            var contentLength = $scope.inputContent.length;
            if(contentLength>1024){
                $scope.inputContent = $scope.inputContent.substring(0,1024);
                return;
            }
            $scope.tRemainSum =contentLength;
        }


        function doSupport(){
            communicate.doSupportPoint(
              0,$cookieStore.get('userCode'),$scope.topicDetailData.topicid)
                .then(function(data){
                    if(data.statecode){
                        $scope.topicDetailData.support_sum =  $scope.topicDetailData.support_sum+1;
                    }

              },function(){});
        }

        function doComment(){
              if(!$scope.inputContent){
                  return;
              }
              if($.trim($scope.inputContent)==""){
                  return;
              }

              communicate.doComment(
                  0,$cookieStore.get('userCode'),$scope.inputContent,$scope.topicDetailData.topicid)
                  .then(function(data){
                      if(data.statecode){
                          $scope.toastMsg = "评论成功！";
                          $scope.topicDetailData.comment_sum=$scope.topicDetailData.comment_sum+1;
                          $scope.topicDetailData.comment_list.unshift(data.data)
                          //getTopicInfo();
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

          function loadMore(){
              var commentLength = $scope.commentList.length;
              getTopicInfo(commentLength);
          }

        getTopicInfo(0);
    }
})();
