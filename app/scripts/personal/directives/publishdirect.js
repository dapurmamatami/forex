(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .directive('twPublish',twPublish);

    function twPublish(){
        return {
            restrict:'E',

            templateUrl:'views/template/publish_content.html',

            scope:{
                inputContent:'=',
                toastShow:'=',
                toastMsg:'=',
                doComment:'&',
                inputChar:'='
            },

            replace:true,

            controller:function($scope){
                $scope.showOrNo = false;
                $scope.inputContent = '';
                $scope.tRemainSum = 0 ;
                $scope.matchCommentContent = matchCommentContent;
                function matchCommentContent(){

                    var contentLength = $scope.inputContent.length;
                    $scope.inputChar = $scope.inputContent.substring(contentLength-1);
                    if(contentLength>1024){
                      $scope.inputContent = $scope.inputContent.substring(0,1024);
                      return;
                    }
                    $scope.tRemainSum =contentLength;
                }
            }
            //,
            //link:function(scope,elem,attrs){
            //    scope.tRemainSum = 0 ;
            //    scope.matchCommentContent = function matchCommentContent(){
            //        var contentLength = scope.inputContent.length;
            //        if(contentLength>1024){
            //          scope.inputContent = scope.inputContent.substring(0,1024);
            //          return;
            //        }
            //        scope.tRemainSum =contentLength;
            //    }
            //}

        }


    }

})();
