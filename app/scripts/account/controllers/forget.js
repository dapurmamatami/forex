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
            verifyCode: '',
            correct: true     // 验证码是否正确
        };
        $scope.goNextStep = goNextStep;
        $scope.checkExistence = checkExistence;
        $scope.eliminateErr = eliminateErr;
        $scope.getVerifyCode = getVerifyCode;

        // 检查手机号码是否已经认证过
        function checkExistence() {

            if (!$scope.phone.number) {
                return;
            }

            account.checkNumberExistence($scope.phone.number).then(function (data) {

                if (data.data) {
                    $scope.phone.existence = true;
                } else {
                    $scope.phone.existence = false;
                }
            });

        }

        function eliminateErr(message) {
            if (message === 'phone is not existent') {
                $scope.phone.existence = true;
            }
        }

        function getVerifyCode() {
            account.getVerifyCode($scope.phone.number);
        }

        function goNextStep() {
            $scope.step ++;
        }

    }
})();