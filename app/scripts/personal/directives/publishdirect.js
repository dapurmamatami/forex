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
                tRemainSum : '='
            },

            replace:true,

            controller:function($scope){
                $scope.showOrNo = false;
                $scope.inputContent = '';
                $scope.tRemainSum = 0 ;
                $scope.matchCommentContent = matchCommentContent;
                function matchCommentContent(){

                    var contentLength = $scope.inputContent.length;
                    //$scope.inputChar = $scope.inputContent.substring(contentLength-1);
                    if(contentLength>1024){
                      $scope.inputContent = $scope.inputContent.substring(0,1024);
                      return;
                    }
                    $scope.tRemainSum =contentLength;
                }
            }
            ,
            link:function(scope,elem){
                elem.find('#textArea').atwho({
                    at:"@",
                    data:['tigerwitbone','helloworld','热门投资']
                })
                elem.find('#textArea').atwho({
                    at:"$",
                    data:['USDJPY','EURUSD','EURGBP','USDCAD','GBPCHF','EURCHF','AUDUSD',
                      'USDCHF','NZDUSD','GBPUSD','GBPJPY','EURAUD','CHFJPY','AUDJPY','SILVER','GOLD',
                      'WTOil','USDX','SFC','NK','mSP','mND','mDJ','HSI','FFI','DAX']
                })
            }

        }


    }

})();
