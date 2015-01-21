(function () {
  'use strict'

  angular.module('tigerwitPersonalApp')
    .controller('PersonalCommunicateInfoController',PersonalCommunicateInfoController)

  PersonalCommunicateInfoController.$injector = ['$scope','CommunicateData'];

  function PersonalCommunicateInfoController($scope,CommunicateData) {
    $scope.showDropdown = false;
    $scope.showcommentToggle = false;


    $scope.dropmenu = dropmenus;
    $scope.getbackmenu = getbackmenus;
    $scope.showCommentCase = showCommentCase;
    $scope.getbackCommentCase = getbackCommentCase;
    $scope.skipDetail = skipDetail;


    $scope.loadMore = loadMore;
    $scope.publishTopic = publishTopic;
    $scope.doComment = doComment;
    $scope.doSupport = doSupport;
    $scope.doTransmit = doTransmit;
    $scope.getTopicDetial = getTopicDetail;


    function dropmenus() {
      $scope.showDropdown = true;
    }

    function getbackmenus() {
      $scope.showDropdown = false;
    }

    function showCommentCase(){
      $scope.showcommentToggle = true;
    }
    function getbackCommentCase(){
      $scope.showcommentToggle = false;
    }

    function publishTopic(){

    }
    function doComment(){

    }
    function doSupport(){

    }
    function doTransmit(){

    }
    function getTopicDetail(){

    }
    function skipDetail(){

    }

    function loadMore(){
      getCommunicateInfo();
    }

    function getCommunicateInfo(){
      if(!$scope.data){
        $scope.data = [];
      }
      var startIndex = $scope.data.length;
      var promise = CommunicateData.hotInvester({"startindex":startIndex,"offset":10});

      promise.then(function(data){
          if(data.statecode){
            $scope.data = $scope.data.concat(data.data);
          }else{
            console.log("statemessage:"+jdata.statemessage)
          }
        },
      function(data){
        console.log(data);
      });
    }
    getCommunicateInfo();
  }


})()


