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
                tRemainSum : '=',
                fansInfo:'='
            },

            replace:true,

            controller:function($scope){
        

            }
            ,
            link:function(scope,elem){

                scope.$watch('fansInfo',function(newVal, oldVal){

                    if(newVal===oldVal) return;

                    var fansInfo = scope.fansInfo;

                    elem.find('#textArea').atwho({
                        at:"@",
                        data:scope.fansInfo
                    })
                });

                scope.showOrNo = false;
                scope.inputContent = '';
                scope.tRemainSum = 0 ;
                scope.matchCommentContent = matchCommentContent;
                
                function matchCommentContent(){
                    var contentLength = scope.inputContent.length;
                    //scope.inputChar = scope.inputContent.substring(contentLength-1);
                    if(contentLength>1024){
                      scope.inputContent = scope.inputContent.substring(0,1024);
                       scope.tRemainSum  = 1024
                      return;
                    }
                    scope.tRemainSum =contentLength;
                }

                
               
                elem.find('#textArea').atwho({
                    at:"$",
                    data:['USDJPY','EURUSD','EURGBP','USDCAD','GBPCHF','EURCHF','AUDUSD',
                      'USDCHF','NZDUSD','GBPUSD','GBPJPY','EURAUD','CHFJPY','AUDJPY',
                      'AUDCAD', 'AUDCHF', 'AUDNZD', 'CADCHF', 'CADJPY', 'EURCAD',
                      'EURNZD', 'GBPAUD', 'GBPCAD', 'GBPNZD', 'NZDCAD', 'NZDCHF', 'NZDJPY',
                      'SILVER','GOLD','WTOil','USDX','SFC','NK','mSP','mND','mDJ','HSI','FFI','DAX']
                })
            }

        }


    }

})();
