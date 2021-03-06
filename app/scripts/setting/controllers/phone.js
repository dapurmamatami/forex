;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingPhoneController', SettingPhoneController);

    SettingPhoneController.$inject = ['$scope', '$state', '$modalInstance', '$q', 'account', 'validator'];

    function SettingPhoneController($scope, $state, $modalInstance, $q, account, validator) {
        $scope.step = 1;
        $scope.phone = {
            oldNumber: '',
            correct: true,     // 原手机号码是否正确
            newNumber: '',
            newNumberReg: validator.regType.phone.reg,
            existence: false   // 新手机号码是否已经认证
        };
        $scope.password = {
            number: '',
            correct: true
        };
        $scope.verifyCode = {
            number: '',
            correct: true
        };
        $scope.formErr = {
            oldPhone: false,
            newPhone: false,
            password: false,
            verifyCode: false
        };
        $scope.verifyCodeBtnClickable = true;
        $scope.submitFormStep1 = submitFormStep1;
        $scope.getVerifyCode = getVerifyCode;
        $scope.submitFormStep2 = submitFormStep2;
        $scope.closeModal = closeModal;
        $scope.gotoLogin = gotoLogin;
        $scope.hideErr = hideErr;
        $scope.showErr = showErr;
        var token = '';

        function submitFormStep1() {

            if ($scope.formStep1.$invalid) {
                $scope.formErr.oldPhone = true;
                $scope.formErr.password = true;
                return;
            }
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
        function checkExist() {
            var deferred = $q.defer();
            deferred.resolve(false);
            var tmp = deferred.promise;


            if ($scope.phone.newNumber === undefined || $scope.phone.newNumber === '') {
                $scope.phone.existence = false;
                return tmp;
            };
            return account.checkExist($scope.phone.newNumber).then(function (data) {

                if (data.is_succ) {

                    if (data.data) {
                        $scope.phone.existence = true;
                        return false;
                    } else {
                        $scope.phone.existence = false;
                        return true;
                    }
                }
            });

        }

        function getVerifyCode() {
            showErr('newPhone');

            if ($scope.formStep2['newPhone'].$invalid) {
                return;
            }

            $scope.verifyCodeBtnClickable = false;
            
            checkExist().then(function (data) {
                if (data) {
                    $scope.startTimer();
                    account.getVerifyCode($scope.phone.newNumber);
                } else {
                    $scope.verifyCodeBtnClickable = true;
                }
            });
        }

        function submitFormStep2() {

            if ($scope.formStep2.$invalid) {
                $scope.formErr.newPhone = true;
                $scope.formErr.verifyCode = true;
                return;
            }
            account.changePhone(null, null, token, $scope.phone.newNumber, $scope.verifyCode.number).then(function (data) {
                
                if (!data.is_succ) {

                    if (data.error_msg === '验证码不正确') {
                        $scope.verifyCode.correct = false;
                    }
                } else {
                    $scope.step++;
                }
            });
        }

        function closeModal() {
            $modalInstance.close();
        }

        function gotoLogin() {
            closeModal()
            $state.go('account.login');
        }

        function hideErr(name) {
            $scope.formErr[name] = false;

            if (name === 'oldPhone') {
                $scope.phone.correct = true;
            }

            if (name === 'password') {
                $scope.password.correct = true;
            }

            if (name === 'newPhone') {
                $scope.phone.existence = false;
            }

            if (name === 'verifyCode') {
                $scope.verifyCode.correct = true;
            }
        }

        function showErr(name) {
            $scope.formErr[name] = true;
        }
    }
})();