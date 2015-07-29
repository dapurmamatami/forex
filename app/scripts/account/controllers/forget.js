;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountForgetController', AccountForgetController);

    AccountForgetController.$inject = ['$rootScope', '$scope', '$q', 
            'account', 'validator'];
    function AccountForgetController($rootScope, $scope, $q, account, 
            validator) {
        $scope.step = 1;
        $scope.phone = {
            number:'',
            numberReg: validator.regType.phone.reg,
            existence: true,  // 号码是否注册
            verifyCode: '',
            correct: true     // 验证码是否正确
        };
        $scope.password = {
            newPwd: '',
            confirmPwd: ''
        };
        $scope.formErr = {
            number: false,
            verifyCode: false,
            newPwd: false,
            confirmPwd: false
        };
        $scope.verifyCodeBtnClickable = true;
        $scope.goNextStep = goNextStep;
        $scope.hideErr = hideErr;
        $scope.showErr = showErr;
        $scope.getVerifyCode = getVerifyCode;
        $scope.submitFormStep1 = submitFormStep1;
        $scope.submitFormStep2 = submitFormStep2;

        $rootScope.floatBtnShow = false;

        
        function checkExist() {
            var deferred = $q.defer();
            deferred.resolve(false);
            var tmp = deferred.promise;

            if ($scope.phone.number === undefined || 
                    $scope.phone.number === '') {
                $scope.phone.existence = true;
                return tmp;
            };

            return account.checkExist($scope.phone.number).then(function (data) {

                if (data.data) {
                    $scope.phone.existence = true;
                    return true;
                } else {
                    $scope.phone.existence = false;
                    return false;
                }
            });
        }

        function getVerifyCode() {
            showErr('number');
            
            if ($scope.formStep1['number'].$invalid) {
                return;
            }

            $scope.verifyCodeBtnClickable = false;
            
            // 检查手机号码是否已经存在
            checkExist().then(function (data) {
                if (data) {
                    $scope.startTimer();
                    account.getVerifyCode($scope.phone.number, true);
                } else {
                    $scope.verifyCodeBtnClickable = true;
                }
            });
        }

        function goNextStep() {
            $scope.step ++;
        }

        function submitFormStep1() {
            if ($scope.formStep1.$invalid) {
                $scope.formErr.number = true;
                $scope.formErr.verifyCode = true;
                return;
            }
            account.verifyCode($scope.phone.number, $scope.phone.verifyCode).then(function (data) {

                if (!data.is_succ) {

                    if (data.error_msg === '验证码不正确' 
                            || data.error_msg === '请先发送验证码') {
                        $scope.phone.correct = false;
                    }
                } else {
                    $scope.phone.correct = true;
                    goNextStep();
                }
            });
        }

        function submitFormStep2() {

            if ($scope.formStep2.$invalid) {
                $scope.formErr.newPwd = true;
                $scope.formErr.confirmPwd = true;
                return;
            }

            account.setNewPwd($scope.phone.number, $scope.phone.verifyCode, 
                    $scope.password.newPwd).then(function (data) {
                
                if (data.is_succ) {
                    goNextStep();
                }        
            });
        }

        function hideErr(name) {
            $scope.formErr[name] = false;

            if (name === 'verifyCode') {
                $scope.phone.correct = true;
            }

            if (name === 'number') {
                $scope.phone.existence = true;
            }
        }

        function showErr(name) {
            $scope.formErr[name] = true;
        }

    }
})();