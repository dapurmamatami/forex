;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingEmailController', SettingEmailController);

    SettingEmailController.$inject = ['$scope', '$modalInstance', 'account', 'safetyInfo'];

    function SettingEmailController($scope, $modalInstance, account, safetyInfo) {
        $scope.step = 1;
        $scope.email = {
            oldNumber: '',
            correct: true,  
            newNumber: '',
            existence: false
        };
        $scope.password = {
            number: '',
            correct: true
        };
        $scope.formErr = {
            oldEmail: false,
            password: false,
            newEmail: false
        };
        $scope.submitFormStep1 = submitFormStep1;
        $scope.submitFormStep2 = submitFormStep2;
        $scope.closeModal = closeModal;
        $scope.showErr = showErr;
        $scope.hideErr = hideErr;
        var token = '';

        function submitFormStep1() {

            if ($scope.formStep1.$invalid) {
                $scope.formErr.oldEmail = true;
                $scope.formErr.password = true;
                return;
            }
            account.changeEmail($scope.email.oldNumber, $scope.password.number).then(function (data) {

                if (!data.is_succ) {

                    if (data.error_msg === '邮箱不正确') {
                        $scope.email.correct = false;
                    } else {
                        $scope.email.correct = true;
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

            if ($scope.formStep2.$invalid) {
                $scope.formErr.newEmail = true;
                return;
            }
            account.changeEmail(null, null, token, $scope.email.newNumber).then(function (data) {
 
                if (!data.is_succ) {

                    if (data.error_msg === '邮件已存在') {
                        $scope.email.existence = true;
                    } else {
                        $scope.email.existence = false;
                    }
                } else {
                    $scope.step++;
                }
            });
        }

        function closeModal() {

            if ($scope.step === 3) {
                account.getSafetyInfo().then(function (data) {
                    
                    angular.forEach(data, function (value, key) {
                        safetyInfo[key] = value;
                    });
                });
            }
            $modalInstance.close();
        }

        function showErr(name) {
            $scope.formErr[name] = true;
        }

        function hideErr(name) {
            $scope.formErr[name] = false;

            if (name === 'oldEmail') {
                $scope.email.correct = true;
            }

            if (name === 'password') {
                $scope.password.correct = true;
            }

            if (name === 'newEmail') {
                $scope.email.existence = false;
            }
        }
    }
})();