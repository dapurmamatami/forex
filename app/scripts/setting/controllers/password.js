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
            correct: true,
            newPwd: '',
            confirmPwd: ''
        };
        $scope.formErr = {
            oldPwd: false,
            newPwd: false,
            confirmPwd: false
        };
        $scope.hideErr = hideErr;
        $scope.showErr = showErr;
        $scope.submitPwdForm = submitPwdForm;
        $scope.closeModal = closeModal;
        $scope.gotoLogin = gotoLogin;

        function hideErr(name) {
            $scope.formErr[name] = false;

            if (name === 'oldPwd') {
                $scope.password.correct = true;
            }
        }

        function showErr(name) {
            $scope.formErr[name] = true;
        }

        function submitPwdForm() {

            if ($scope.pwdForm.$invalid) {
                $scope.formErr.oldPwd = true;
                $scope.formErr.newPwd = true;
                $scope.formErr.confirmPwd = true;
                return;
            }

            account.changePwd($scope.password.oldPwd, $scope.password.newPwd).then(function (data) {

                if (data.error_msg === '密码不正确') {
                    $scope.password.correct = false;
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

        function gotoLogin() {
            closeModal();
            $state.go('account.login');
        }
    }
})();