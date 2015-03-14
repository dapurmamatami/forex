;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingPasswordController', SettingPasswordController);

    SettingPasswordController.$inject = ['$scope', '$state', '$modalInstance', 'account'];

    function SettingPasswordController($scope, $state, $modalInstance, account) {
        $scope.step = 1;
        $scope.password = {
            oldPwd: '',
            newPwd: '',
            confirmPwd: ''
        };
        $scope.pwdCorrect = true;

        $scope.eliminateError = eliminateError;
        $scope.submitPwdForm = submitPwdForm;
        $scope.closeModal = closeModal;
        $scope.gotoLogin = gotoLogin;

        function submitPwdForm() {
            account.changePwd($scope.password.oldPwd, $scope.password.newPwd).then(function (data) {

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

        function gotoLogin() {
            closeModal();
            $state.go('account.login');
        }
    }
})();