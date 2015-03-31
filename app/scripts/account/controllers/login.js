;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountLoginController', AccountLoginController);

    AccountLoginController.$inject = ['$rootScope', '$scope', '$state', 'account', 'validator'];

    function AccountLoginController($rootScope, $scope, $state, account, validator) {
        $scope.account = {
            id: '',
            idReg: validator.regType.phone.reg,
            password: ''
        };
        $scope.formErr = {
            id: false,
            password: false
        };
        $scope.login = login;
        $scope.hideErr = hideErr;
        $scope.showErr = showErr;
        $scope.callbackErr = {
            status: 0,
            message: '正常'
        };
        
        $rootScope.floatBtnShow = false;

        function login() {
            
            if ($scope.loginForm.$invalid) {
                $scope.formErr.id = true;
                $scope.formErr.password = true;    
                return;
            }

            // 首先对 password 加密
            account.encrypt($scope.account.password).then(function (textEnc) {

                if (textEnc) {
                    account.login($scope.account.id, textEnc).then(function (data) {
                        $scope.callbackErr.status = data.error_code;

                        if (!data.is_succ) {
                            
                            // 不会出现，前端做了验证
                            if ($scope.callbackErr.status === 1) {
                                $scope.callbackErr.message = '手机号码格式不正确';
                            }
                            
                            if ($scope.callbackErr.status === 2) {
                                $scope.callbackErr.message = '登录次数过多，请稍后登录';
                            }
                            
                            if ($scope.callbackErr.status === 3) {
                                $scope.callbackErr.message = '账号尚未注册';
                            }
                            
                            if ($scope.callbackErr.status === 4) {
                                $scope.callbackErr.message = '用户名或密码错误';
                            }
                        } else {
                            $state.go('personal.communicate_info');
                        }
                    });
                }
            });
        }

        function hideErr(name) {
            $scope.formErr[name] = false;
            $scope.callbackErr.status = 0;
        }

        function showErr(name) {
            $scope.formErr[name] = true;
        }
    }
})();