;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingSafetyController', SettingSafetyController);

    SettingSafetyController.$inject = ['$scope', '$timeout', '$modal', 'account'];

    function SettingSafetyController($scope, $timeout, $modal, account) {
        $scope.safetyInfo = {};
        // 邮箱验证
        $scope.emailVerify = {  
            succSend: false,   // 邮件是否已发送
            status: 0,
            statusMsg: '',
            succVerify: false,    // 邮箱验证是否成功（在 SettingEmailVerifyController 中用） 
            sendEmail: sendEmail
        };
        $scope.openPwdModal = openPwdModal;
        $scope.openPhoneModal = openPhoneModal;
        $scope.openEmailModal = openEmailModal;
        $scope.sendEmail = sendEmail;
        $scope.emailSendSucc = false;

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
                    passedScope: function () {
                        return $scope;
                    }
                }
            });
        }

        function openEmailVerifyMdl(size) {
            $modal.open({
                templateUrl: 'views/setting/email_verify_modal.html',
                controller: function ($scope, $modalInstance, emailVerify) {
                    $scope.emailVerify = emailVerify;
                    $scope.closeModal = closeModal;

                    function closeModal() {
                        $modalInstance.dismiss();
                    }
                },
                size: size,
                resolve: {
                    emailVerify: function () {
                        return $scope.emailVerify;
                    }
                }
            });
        }

        function sendEmail() {
            account.sendEmail().then(function (data) {

                if (!data.is_succ) {

                    if (data.error_code === 1) {
                        $scope.emailVerify.status = 1;
                        $scope.emailVerify.statusMsg = '验证邮件发送次数过多，请稍后再试';
                    }

                    if (data.error_code === 2) {
                        $scope.emailVerify.status = 2;
                        $scope.emailVerify.statusMsg = '电子邮箱已验证';
                    }
                }

                openEmailVerifyMdl();
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