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
        $scope.discussList = $scope.aitem.discuss_list;
        $scope.pContent = $scope.aitem.content;
        $scope.matchCommentContent= matchCommentContent;
        $scope.doSupport = doSupport;
        $scope.showDoComment = showDoComment;
        if($scope.discussList.length>0){
            $scope.hasDiscuss = true;
            $scope.showDiscuss = true;
        }

        function matchCommentContent(){
            var contentLength = $scope.inputContent.length;
            if(contentLength>1024){
                $scope.inputContent = $scope.inputContent.substring(0,1024);
                return;
            }
            $scope.tRemainSum =contentLength;
        }
        function showDoComment(){
            $scope.showDiscuss = true;
            $scope.showReply = true;
        }

        function doSupport(){
            communicate.doSupportPoint(
                1,$cookieStore.get('userCode'),$scope.aitem.comment_id)
                .then(function(data){
                    if(data.statecode){
                        $scope.aitem.support_sum =  $scope.aitem.support_sum+1;
                    }

                  },function(){});
        }
    }
})();

(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('DiscussListController',DiscussListController);

  DiscussListController.$inject = ['$scope','$cookieStore','communicate','$timeout'];

      function DiscussListController($scope,$cookieStore,communicate,$timeout){


          $scope.doComment = doComment;
          $scope.loadAll = loadAll;
          $scope.discussList = $scope.aitem.discuss_list;


          $scope.matchCommentContent = matchCommentContent;
          $scope.showDoCommentAndAt = showDoCommentAndAt;

          function matchCommentContent(){
              var contentLength = $scope.inputContent.length;
              if(contentLength>1024){
                  $scope.inputContent = $scope.inputContent.substring(0,1024);
                  return;
              }
              $scope.tRemainSum =contentLength;
          }

          function showDoCommentAndAt(publisher_name){
              if(publisher_name){
                  $scope.inputContent= $scope.inputContent+" @"+publisher_name;
                  $.trim($scope.inputContent);
                $scope.inputContent=$scope.inputContent+" ";
              }

                  $scope.showReply =true;
                  if($scope.hasDiscuss){
                      $scope.showDiscuss = true;
                  }else{
                      $scope.showDiscuss = $scope.showReply;
                  }
          }

          function doComment(){
                if(!$scope.inputContent){
                    return;
                }
                if($.trim($scope.inputContent)==""){
                    return;
                }

                communicate.doComment(
                    1,$cookieStore.get('userCode'),$scope.inputContent,$scope.aitem.comment_id)
                    .then(function(data){
                        if(data.statecode){
                            $scope.toastMsg = "评论成功！";
                            $scope.aitem.comment_sum=$scope.aitem.comment_sum+1;
                            $scope.discussList.unshift(data.data);
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
          function loadAll(){
              communicate.getRemainDiscuss($scope.aitem.comment_id,$scope.discussList[$scope.discussList.length-1].comment_id)
                  .then(function(data){
                      console.info(data)
                      if(data.statecode){
                          $scope.discussList = $scope.discussList.concat(data.data)
                      }
                  });
            }
      }

})();

(function(){
    'use strict';
    angular
      .module('tigerwitPersonalApp')
      .controller('OneDiscussController',OneDiscussController);

    OneDiscussController.$inject = ['$scope','communicate','$cookieStore'];

    function  OneDiscussController($scope,communicate,$cookieStore){
        $scope.doSupport = doSupport;
        function doSupport(commentId){
            communicate.doSupportPoint(
                1,$cookieStore.get('userCode'),commentId)
                    .then(function(data){
                        if(data.statecode){
                            $scope.bitem.support_sum =  $scope.bitem.support_sum+1;
                        }

                },function(){});
        }
    }
})();
