;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingEmailVerifyController', SettingEmailVerifyController);

    SettingEmailVerifyController.$inject = ['$scope', '$location'];

    function SettingEmailVerifyController($scope, $location) {
        var searchObj = $location.search();

        if (searchObj.success === 'true') {
            $scope.success = true;    
        } else {
            $scope.success = false;
        }
    }
})();