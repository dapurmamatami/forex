;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingPasswordController', SettingPasswordController);

    SettingPasswordController.$inject = ['$scope', '$modalInstance', 'account'];

    function SettingPasswordController($scope, $modalInstance, account) {
        $scope.step = 1;
        $scope.password = {
            oldPwd: '',
            newPwd: '',
            confirmPwd: ''
        };
        $scope.pwdCorrect = true;

        $scope.eliminateError = eliminateError;
        $scope.comparePwd = comparePwd;
        $scope.submitPwdForm = submitPwdForm;
        $scope.closeModal = closeModal;

        function submitPwdForm() {
            console.info($scope.password);

            account.changePwd($scope.password.oldPwd, $scope.password.newPwd).then(function (data) {
                console.info(data);

                if (data.error_msg === '密码不正确') {
                    $scope.pwdCorrect = false;
                    return;
                }

                if (data.is_succ) {
                    $scope.step++;        
                }
            });
            
        }

        function closeModal() {
            $modalInstance.close();
        }

        function eliminateError() {
            $scope.pwdCorrect = true;
        }

        function comparePwd() {

        }
    }
})();