;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingPasswordController', SettingPasswordController);

    SettingPasswordController.$inject = ['$scope', '$modalInstance'];

    function SettingPasswordController($scope, $modalInstance) {
        $scope.step = 1;
        $scope.submitPwdForm = submitPwdForm;
        $scope.closeModal = closeModal;

        function submitPwdForm() {
            $scope.step++;
        }

        function closeModal() {
            $modalInstance.close();
        }
    }
})();