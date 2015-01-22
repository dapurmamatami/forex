(function () {
  'use strict';

  console.info("hello world  communicateinfo !!!");
  angular
    .module('tigerwitPersonalApp')
    .controller('PersonalCommunicateInfoController',
    PersonalCommunicateInfoController);

  PersonalCommunicateInfoController.$inject = ['$scope','communicate'];

  function PersonalCommunicateInfoController($scope,communicate) {

    /**
     *
     * hello a
     *
     *
     * @type {boolean}
     */
    $scope.showDropdown = false;

    $scope.showMenu = showMenu;
    $scope.backMenu = backMenu;

    $scope.loadMore = loadMore;
    $scope.publishTopic = publishTopic;


    function showMenu() {
      $scope.showDropdown = true;
    }

    function backMenu() {
      $scope.showDropdown = false;
    }

    function publishTopic(){

    }

    function loadMore(){
      getCommunicateInfo();
    }

    function getCommunicateInfo(){
      if(!$scope.data){
        $scope.data = [];
      }
      var startIndex = $scope.data.length;
      var promise = communicate.hotInvester({"startindex":startIndex,"offset":10});

      promise.then(function(data){
            if(data.statecode){
              $scope.data = $scope.data.concat(data.data);
            }else{
              console.log("statemessage:"+data.statemessage);
            }
          },
          function(data){
            console.log(data);
          });
    }
    getCommunicateInfo();
  }


  angular
    .module('tigerwitPersonalApp')
    .controller('PersonalCommentToggleController',PersonalCommentToggleController);

    PersonalCommentToggleController.$inject=["$scope"];

    function PersonalCommentToggleController($scope){
      $scope.commentShowToggle = false;
      $scope.showDropComment = showDropComment;

      $scope.doComment = doComment;
      $scope.doSupport = doSupport;
      $scope.doTransmit = doTransmit;
      $scope.getTopicDetial = getTopicDetail;
      $scope.skipDetail = skipDetail;

      function showDropComment(){
        $scope.commentShowToggle = !$scope.commentShowToggle;
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
    }

})();


