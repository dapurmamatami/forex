;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingSafetyController', SettingSafetyController);

    SettingSafetyController.$inject = ['$scope', '$timeout', '$modal', 'account'];

    function SettingSafetyController($scope, $timeout, $modal, account) {
        $scope.succSend = false;
        $scope.safetyInfo = {};
        $scope.openPwdModal = openPwdModal;
        $scope.openPhoneModal = openPhoneModal;
        $scope.openEmailModal = openEmailModal;
        $scope.verifyEmail = verifyEmail;

        account.getSafetyInfo().then(function (data) {
            $scope.safetyInfo = data;
            $scope.$broadcast('hideLoadingImg');
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

        function openEmailModal(size) {
            $modal.open({
                templateUrl: 'views/setting/safety_email_modal.html',
                controller: 'SettingEmailController',
                size: size,
                resolve: {
                    safetyInfo: function () {
                        return $scope.safetyInfo
                    }
                }
            });
        }

        // 往邮箱发送邮件
        function verifyEmail() {
            account.verifyEmail().then(function (data) {

                if (data.is_succ) {
                    $scope.succSend = true;
                    $timeout(function () {
                        $scope.succSend = false;
                    }, 1000);
                }
            });
        }

        function registerReal(size) {
            $modal.open({
                templateUrl: 'views/account/register.html',
                controller: 'AccountRegisterRealController',
                size: size,
                resolve: {
                    personal: function () {
                        return $scope.personal
                    }
                }
            });
        }
    }
})();