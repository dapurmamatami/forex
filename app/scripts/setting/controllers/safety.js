;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingSafetyController', SettingSafetyController);

    SettingSafetyController.$inject = ['$scope', '$modal'];

    function SettingSafetyController($scope, $modal) {
        $scope.openPwdModal = openPwdModal;
        //$scope.openDelModal = openDelModal;
        
        function openPwdModal(size) {
            $modal.open({
                templateUrl: 'views/setting/safety_pwd_modal.html',
                controller: 'SettingPasswordController',
                size: size
            });
        }

        /*function openDelModal(size) {
            $modal.open({
                templateUrl: 'views/setting/card_delete_modal.html',
                controller: 'SettingCardOperateController',
                size: size
            });
        }*/
    }
})();