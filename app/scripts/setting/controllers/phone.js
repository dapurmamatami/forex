;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingPhoneController', SettingPhoneController);

    SettingPhoneController.$inject = ['$scope', '$modalInstance'];

    function SettingPhoneController($scope, $modalInstance) {
        $scope.step = 1;
        $scope.submitFormStep1 = submitFormStep1;
        $scope.closeModal = closeModal;

        function submitFormStep1() {
            $scope.step++;
        }

        function closeModal() {
            $modalInstance.close();
        }
    }
})();