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
        function getTopicInfo(){
            communicate.topicDetail($cookieStore.get("mDetailTopicId"),0)
              .then(function(data){
                console.info(data)
                if(data.statecode){
                    $scope.mData = data.data;
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
              0,$cookieStore.get('usercode'),$scope.mData.topicid)
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
                0,$cookieStore.get('usercode'),$scope.inputContent,$scope.mData.topicid)
                .then(function(data){
                    if(data.statecode){
                        $scope.toastMsg = "评论成功！";
                        //$scope.mData.comment_sum=$scope.mData.comment_sum+1;
                        getTopicInfo();
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
        getTopicInfo();
    }
})();
