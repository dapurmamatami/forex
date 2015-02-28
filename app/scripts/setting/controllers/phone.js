;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingPhoneController', SettingPhoneController);

    SettingPhoneController.$inject = ['$scope', '$modalInstance', 'account'];

    function SettingPhoneController($scope, $modalInstance, account) {
        $scope.step = 1;
        $scope.phone = {
            oldNumber: '',
            correct: true,     // 原手机号码是否正确
            newNumber: '',
            existence: false,   // 新手机号码是否已经认证
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
        $scope.submitFormStep2 = submitFormStep2;
        $scope.eliminateError = eliminateError;
        $scope.closeModal = closeModal;
        var token = '';

        function submitFormStep1() {
            account.changePhone($scope.phone.oldNumber, $scope.password.number).then(function (data) {
                console.info(data);
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

        function submitFormStep2() {
            account.changePhone(null, null, token, $scope.phone.newNumber, $scope.verifyCode.number).then(function (data) {
                console.info(data);
            });
        }

        function eliminateError(propName) {
            $scope[propName].correct = true;
        }

        function closeModal() {
            $modalInstance.close();
        }
    }
})();