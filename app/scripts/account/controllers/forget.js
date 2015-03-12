;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountForgetController', AccountForgetController);

    AccountForgetController.$inject = ['$scope', 'account'];
    function AccountForgetController($scope, account) {
        $scope.step = 1;
        $scope.phone = {
            number:'',
            existence: true,  // 号码是否注册
            infoBack: false,
            verifyCode: '',
            correct: true     // 验证码是否正确
        };
        $scope.password = {
            newPwd: '',
            confirmPwd: ''
        };
        $scope.goNextStep = goNextStep;
        $scope.checkExist = checkExist;
        $scope.eliminateErr = eliminateErr;
        $scope.getVerifyCode = getVerifyCode;
        $scope.submitFormStep1 = submitFormStep1;
        $scope.submitFormStep2 = submitFormStep2;

        // 检查手机号码是否已经认证过
        function checkExist() {
            if ($scope.phone.number === undefined || $scope.phone.number === '') return;

            account.checkExist($scope.phone.number).then(function (data) {
                $scope.phone.infoBack = true;

                if (data.data) {
                    $scope.phone.existence = true;
                } else {
                    $scope.phone.existence = false;
                }
            });

        }

        function eliminateErr(message) {
            
            if (message === 'phone is not existent') {
                $scope.phone.infoBack = false;
                $scope.phone.existence = true;
            }

            if (message === 'verify code is incorrect') {
                $scope.phone.correct = true;
            }

        }

        function getVerifyCode() {
            account.getVerifyCode($scope.phone.number, true);
        }

        function goNextStep() {
            $scope.step ++;
        }

        function submitFormStep1() {
            account.verifyCode($scope.phone.number, $scope.phone.verifyCode).then(function (data) {

                if (!data.is_succ) {

                    if (data.error_msg === '验证码不正确') {
                        $scope.phone.correct = false;
                    }
                } else {
                    $scope.phone.correct = true;
                    goNextStep();
                }
            });
        }

        function submitFormStep2() {
            account.setNewPwd($scope.phone.number, $scope.phone.verifyCode, 
                    $scope.password.newPwd).then(function (data) {
                
                if (data.is_succ) {
                    goNextStep();
                }        
            });
        }

    }
})();