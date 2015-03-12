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
        $scope.goNextStep = goNextStep;
        $scope.checkExist = checkExist;
        $scope.eliminateErr = eliminateErr;
        $scope.getVerifyCode = getVerifyCode;

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
        }

        function getVerifyCode() {
            account.getVerifyCode($scope.phone.number);
        }

        function goNextStep() {
            $scope.step ++;
        }

    }
})();