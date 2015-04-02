;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingEmailVerifyController', SettingEmailVerifyController);

    SettingEmailVerifyController.$inject = ['$scope', '$state'];

    function SettingEmailVerifyController($scope, $state) {
        $scope.emailVerify = {};

        var queryVal = $state.params.success;

        if (queryVal === 'true') {
            $scope.emailVerify.succVerify = true;    
        } else {
            $scope.emailVerify.succVerify = false;
        }
    }
})();