;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingSafetyController', SettingSafetyController);

    SettingSafetyController.$inject = ['$scope', '$modal', 'account'];

    function SettingSafetyController($scope, $modal, account) {
        $scope.safetyInfo = {};
        $scope.openPwdModal = openPwdModal;
        $scope.openPhoneModal = openPhoneModal;
        //$scope.openDelModal = openDelModal;
        
        account.getSafetyInfo().then(function (data) {
            $scope.safetyInfo = data;
        });

        function openPwdModal(size) {
            $modal.open({
                templateUrl: 'views/setting/safety_pwd_modal.html',
                controller: 'SettingPasswordController',
                size: size
            });
        }

        function openPhoneModal(size) {
            $modal.open({
                templateUrl: 'views/setting/safety_phone_modal.html',
                controller: 'SettingPhoneController',
                size: size
            });
        }
    }
})();