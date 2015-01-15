(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('PersonalInfoController', PersonalInfoController);
    
    PersonalInfoController.$inject = ['$rootScope', '$scope','$state', '$timeout', 'account'];

    function PersonalInfoController($rootScope, $scope, $state, $timeout, account) {
        $scope.profile = {};

        account.getInfo().then(function (data) {
            $scope.hasLoadProfile = true;
            $scope.profile = data;
        });
        
    }

})();