(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('PersonalTopicDetailController',PersonalTopicDetailController);

    PersonalTopicDetailController.$inject = ["$modal",'$location',"$timeout","$scope",'communicate','$cookieStore'];
    function PersonalTopicDetailController($modal,$location,$timeout,$scope,communicate,$cookieStore){

        $scope.tRemainSum = 0;
        $scope.isMy = true;
        $scope.mTopicId = $location.search().topicid;

        $scope.matchCommentContent = matchCommentContent;
        $scope.doComment = doComment;
        $scope.doSupport = doSupport;
        $scope.loadMore = loadMore;
        $scope.skipToSummary = skipToSummary;
        $scope.openConfirmDeleteC = openConfirmDeleteC;

        function getTopicInfo(commentLength){
            communicate.topicDetail($scope.mTopicId ,commentLength)
                .then(function(data){
                    console.info(data)
                    if(data.statecode){
                       if(!commentLength){
                          $scope.topicDetailData = data.data;
                          $scope.commentList = $scope.topicDetailData.comment_list;
                          $scope.pContent = data.data.content;
                          $scope.isMy = (data.data.publisher_id == $scope.personal.user_code);
                          console.info("isMy:"+$scope.isMy);
                       }else{
                          $scope.commentList = $scope.commentList.concat(data.data);
                       }
                       $scope.$broadcast('stopLoadingMore');

                    }
            },function(data){

            });
        }

        function openConfirmDeleteC(topicid,index){
            var modalInstance = $modal.open({
                templateUrl:'/views/personal/delete_model.html',
                controller:'DeleteModal',
                size: 'sm'
            });
            modalInstance.result.then(function(result) {
              if (result) {
                  deleteTopic(topicid, index);
              }
            });
        }


        function deleteTopic(topicId,index){
            var type = 1;
            if(typeof(index) =='undefined') type = 0;
            communicate.deleteTopic($scope.personal.user_code,type,topicId)
                .then(function(){
                    if(type==1){
                        $scope.commentList.splice(index,1);
                    }else{
                        history.back();
                    }
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
        function skipToSummary(touchId){
          $location.path('/invest/summary/'+touchId);
        }
        function loadMore(){
            var commentLength = $scope.commentList.length;
            getTopicInfo(commentLength);
        }

        getTopicInfo(0);
    }
})();
