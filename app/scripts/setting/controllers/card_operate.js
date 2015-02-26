;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingCardOperateController', SettingCardOperateController);

    SettingCardOperateController.$inject = ['$scope', '$modalInstance'];

    function SettingCardOperateController($scope, $modalInstance) {
        $scope.closeModal = closeModal;

        function closeModal() {
            $modalInstance.close();
        }
    }
})();