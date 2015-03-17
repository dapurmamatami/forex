;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountLoginController', AccountLoginController);

    AccountLoginController.$inject = ['$scope', '$state', 'account'];

    function AccountLoginController($scope, $state, account) {
        $scope.account = {
            id: '',
            password: '',
            correct: true
        };
        $scope.login = login;
        $scope.eliminateErr = eliminateErr;

        function login() {

            // 首先对 password 加密
            account.encrypt($scope.account.password).then(function (textEnc) {

                if (textEnc) {
                    account.login($scope.account.id, textEnc).then(function (data) {

                        if (!data.is_succ) {

                            if (data.error_msg === '用户名或密码错误') {
                                $scope.account.correct = false;
                            }
                        } else {
                            $state.go('personal.communicate_info');
                        }
                    });
                }
            });
        }

        function eliminateErr() {
            $scope.account.correct = true;
        }
    }
})();