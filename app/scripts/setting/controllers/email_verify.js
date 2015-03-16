;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingEmailVerifyController', SettingEmailVerifyController);

    SettingEmailVerifyController.$inject = ['$scope', '$state'];

    function SettingEmailVerifyController($scope, $state) {
        var queryVal = $state.params.success;

        if (queryVal === 'true') {
            $scope.success = true;    
        } else {
            $scope.success = false;
        }
    }
})();