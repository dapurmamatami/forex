(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountRegisterController', AccountRegisterController);

    AccountRegisterController.$inject = ['$scope', '$window', '$location', '$state', '$timeout',
            '$interval', '$modal', 'account', 'config', 'validator'];

    function AccountRegisterController($scope, $window, $location, $state, $timeout, $interval,
            $modal, account, config, validator) {
        /*$scope.registerType = '';
        $scope.realInfo = {};
        $scope.resetInfo = {};
        $scope.resetInfo.step = 1;*/
        console.info('Init register controller');



    }
})();