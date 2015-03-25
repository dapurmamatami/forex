;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountForgetController', AccountForgetController);

    AccountForgetController.$inject = ['$rootScope', '$scope', 'account'];
    function AccountForgetController($rootScope, $scope, account) {
        $scope.step = 1;
        $scope.phone = {
            number:'',
            existence: true,  // 号码是否注册
            verifyCode: '',
            correct: true     // 验证码是否正确
        };
        $scope.password = {
            newPwd: '',
            confirmPwd: ''
        };
        $scope.formErr = {
            phone: false,
            verifyCode: false,
            newPwd: false,
            confirmPwd: false
        };
        $scope.goNextStep = goNextStep;

        $scope.hideErr = hideErr;
        $scope.showErr = showErr;
        $scope.getVerifyCode = getVerifyCode;
        $scope.submitFormStep1 = submitFormStep1;
        $scope.submitFormStep2 = submitFormStep2;
        var phoneValid = false;

        $rootScope.floatBtnShow = false;

        $scope.$on('phoneValid', function () {
            phoneValid = true;
        });

        // 检查手机号码是否已经认证过
        function checkExist(prop) {
            if ($scope[prop].number === undefined || $scope[prop].number === '') {
                $scope[prop].existence = true;
                return;
            };

            account.checkExist($scope[prop].number).then(function (data) {

                if (data.data) {
                    $scope[prop].existence = true;
                    $scope.$broadcast('phoneValid');
                } else {
                    $scope[prop].existence = false;
                }
            });

        }

        function getVerifyCode() {
            if (phoneValid) {
                account.getVerifyCode($scope.phone.number, true);
            }
        }

        function goNextStep() {
            $scope.step ++;
        }

        function submitFormStep1() {
            
            if ($scope.formStep1.$invalid) {
                $scope.formErr.phone = true;
                $scope.formErr.verifyCode = true;
                return;
            }
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
        }

        function showErr(name) {
            $scope.formErr[name] = true;

            if (name === 'phone') {
                checkExist('phone');
            }
        }

    }
})();