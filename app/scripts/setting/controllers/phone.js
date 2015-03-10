;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingPhoneController', SettingPhoneController);

    SettingPhoneController.$inject = ['$scope', '$modalInstance', 'account'];

    function SettingPhoneController($scope, $modalInstance, account) {
        $scope.step = 2;
        $scope.phone = {
            oldNumber: '',
            correct: true,     // 原手机号码是否正确
            newNumber: '',
            existence: false,   // 新手机号码是否已经认证
            infoBack: false     // 检查新手机号码是否已经认证的方法返回的信息
        };
        $scope.password = {
            number: '',
            correct: true
        };
        $scope.verifyCode = {
            number: '',
            correct: true
        };
        $scope.submitFormStep1 = submitFormStep1;
        $scope.checkExistence = checkExistence;
        $scope.getVerifyCode = getVerifyCode;
        $scope.submitFormStep2 = submitFormStep2;
        $scope.eliminateErr = eliminateErr;
        $scope.closeModal = closeModal;
        $scope.gotoLogin = gotoLogin;
        var token = '';

        function submitFormStep1() {
            account.changePhone($scope.phone.oldNumber, $scope.password.number).then(function (data) {

                if (!data.is_succ) {

                    if (data.error_msg === '手机号码不正确') {
                        $scope.phone.correct = false;
                    } else {
                        $scope.phone.correct = true;
                    }

                    if (data.error_msg === '密码不正确') {
                        $scope.password.correct = false;
                    } else {
                        $scope.password.correct = true;
                    }
                } else {
                    token = data.token;
                    $scope.step++;    
                }
            });
            
        }

        // 检查新手机号码是否已经认证过
        function checkExistence() {
            if ($scope.phone.newNumber === undefined || $scope.phone.newNumber === '') return;
            account.checkExist($scope.phone.newNumber).then(function (data) {

                if (data.is_succ) {
                    $scope.phone.infoBack = true;

                    if (data.data) {
                        $scope.phone.existence = true;
                    } else {
                        $scope.phone.existence = false;
                    }
                }
            });

        }

        function getVerifyCode() {
            account.getVerifyCode($scope.phone.newNumber);
        }

        function submitFormStep2() {
            account.changePhone(null, null, token, $scope.phone.newNumber, $scope.verifyCode.number).then(function (data) {
                
                if (!data.is_succ) {

                    if (data.error_msg === '验证码不正确') {
                        $scope.verifyCode.correct = false;
                    }
                }

                if (data.is_succ) {
                    $scope.step++;
                }
            });
        }

        function eliminateErr(message) {

            if (message === 'phone is incorrect') {
                $scope.phone.correct = true;
            }

            if (message === 'password is incorrect') {
                $scope.password.correct = true;
            }

            if (message === 'phone is existent') {
                $scope.phone.existence = false;
                $scope.phone.infoBack = false;
            }

            if (message === 'verify code is incorrect') {
                $scope.verifyCode.correct = true;
            }
        }

        function closeModal() {
            $modalInstance.close();
        }

        function gotoLogin() {
            
        }
    }
})();