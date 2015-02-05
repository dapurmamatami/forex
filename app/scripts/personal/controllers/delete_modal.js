(function(){
   'use strict';

  angular
    .module('tigerwitPersonalApp')
    .controller("DeleteModal",DeleteModal);

  DeleteModal.$inject=['$scope'];

  function DeleteModal($scope){

      $scope.deleteConfirm = deleteConfirm;
      $scope.closeModal = closeModal;
      function deleteConfirm(){

      }
      function closeModal(result){

          $scope.$close(result);
      }
  }

})();
