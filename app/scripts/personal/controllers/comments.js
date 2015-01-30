(function(){
    'user strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('CommentsController',CommentsController);

    CommentsController.$inject = ['$cookieStore','$scope','communicate'];
    function CommentsController($cookieStore,$scope,communicate){

        $scope.hasDiscuss = false;   //标识是否有讨论信息
        $scope.showDiscuss = false;  //显示讨论信息的开关
        $scope.showReply = false;    //显示回复的开关

        $scope.toggleDoComment = toggleDoComment;
        $scope.showDropComment = showDropComment;

        $scope.doSupport = doSupport;

        function toggleDoComment(){
            $scope.showReply = ! $scope.showReply;
        }

        function showDropComment(publisher_name){
            if(publisher_name){
                $scope.inputContent= "@"+publisher_name+" ";
            }

            $scope.showReply =true;
            if($scope.hasDiscuss){
                $scope.showDiscuss = true;
            }else{
                $scope.showDiscuss = $scope.showReply;
            }
        }
        function doSupport(){
            communicate.doSupportPoint(
                1,$cookieStore.get('userCode'),$scope.mData.comment_id)
                .then(function(data){
                    if(data.statecode){
                        $scope.mData.support_sum =  $scope.mData.support_sum+1;
                    }

                  },function(){});
        }
    }
})();

(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('DiscussController',DiscussController);

    DiscussController.$inject = ['$scope','$cookieStore','communicate','$timeout'];

    function DiscussController($scope,$cookieStore,communicate,$timeout){

        $scope.matchCommentContent = matchCommentContent;

        $scope.doComment = doComment;
        $scope.doSupport = doSupport;
        $scope.$watch('mData',function(newValue,oldValue,scope){
            if(!scope.mData) return;

            if(scope.mData['discuss_list'].length>0){
                $scope.hasDiscuss = true;
                scope.showDiscuss = true;
            }
        });



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
                1,$cookieStore.get('userCode'),$scope.mData.comment_id)
                    .then(function(data){
                          if(data.statecode){
                              $scope.mData.support_sum =  $scope.mData.support_sum+1;
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
                  1,$cookieStore.get('userCode'),$scope.inputContent,$scope.mData.comment_id)
                  .then(function(data){
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

    }

})();
