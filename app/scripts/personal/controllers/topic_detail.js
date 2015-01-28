(function(){
    'use strict';

    angular
      .module('tigerwitPersonalApp')
      .controller('PersonalTopicDetailController',PersonalTopicDetailController);

    PersonalTopicDetailController.$inject = ["$rootScope","$scope",'communicate','$cookieStore'];
    function PersonalTopicDetailController($rootScope,$scope,communicate,$cookieStore){



        function getTopicInfo(){
            communicate.topicDetail($cookieStore.get("mDetailTopicId"),0)
              .then(function(data){
                if(data.statecode){
                    $scope.mData = data.data;
                }
            },function(data){

            });
        }
        getTopicInfo();





    }

})();
