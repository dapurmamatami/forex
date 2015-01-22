(function () {
  'use strict'

  angular
    .module('tigerwitPersonalApp')
    .controller('PersonalHotDynamicsController',PersonalHotDynamicsController);

  PersonalHotDynamicsController.$inject = ['$scope'];

  function PersonalHotDynamicsController($scope) {
    console.info('hot dynamics page');
  }

})();
