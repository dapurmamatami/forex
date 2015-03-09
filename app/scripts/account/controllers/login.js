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
            account.login($scope.account.id, $scope.account.password).then(function (data) {
                console.info(data);

                if (!data.is_succ) {

                    if (data.error_msg === '用户名或密码错误') {
                        $scope.account.correct = false;
                        return;
                    }
                } else {
                    $state.go('personal.communicate_info');
                }
            });
        }

        function eliminateErr() {
            $scope.account.correct = true;
        }
    }
})();