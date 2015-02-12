(function(){
    'use strict';
    angular
      .module('tigerwitPersonalApp')
      .controller('TramsmitController',TramsmitController);

      TramsmitController.$inject =['$scope','mData'];

    function TramsmitController($scope,mData){
        $scope.tRemainSum = 0;
        $scope.doTramsmit = doTramsmit;
        $scope.matchCommentContent = matchCommentContent;

        if(mData.topic_type==3){
            $scope.mData = mData.relation;
        }else{
            $scope.mData = mData;

        }

        function doTramsmit(){
            $scope.$close($scope.inputContent);
        }

        function matchCommentContent(){
            var contentLength = $scope.inputContent.length;
            if(contentLength>1024){
              $scope.inputContent = $scope.inputContent.substring(0,1024);
              return;
            }
            $scope.tRemainSum =contentLength;
        }

    }

})();
