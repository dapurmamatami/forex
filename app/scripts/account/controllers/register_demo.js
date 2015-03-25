;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountRegisterDemoController', AccountRegisterDemoController);

    AccountRegisterDemoController.$inject = ['$rootScope', '$scope', '$state', 'account'];

    function AccountRegisterDemoController($rootScope, $scope, $state, account) {
        $scope.step = 1;
        $scope.account = {
            username: '',
            usernameExist: false,   // 昵称是否存在
            phone: '',
            phoneExist: false,  // 手机号是否已注册
            verifyCode: '',
            codeCorrect: true,  // 验证码是否正确
            email: '',
            emailExist: false,  // 邮箱是否认证
            password: '',
            confirmPwd: '',     // 确认密码
            forkCode: ''        // 邀请码（可选）
        }
        $scope.formErr = {
            username: false,
            phone: false,
            verifyCode: false,
            password: false,
            confirmPwd: false
        };
        $scope.registerDemo = registerDemo;
        $scope.showErr = showErr;
        $scope.hideErr = hideErr;
        $scope.getVerifyCode = getVerifyCode;
        $scope.registerReal = registerReal;
        var phoneValid = false;

        $rootScope.floatBtnShow = false;

        $scope.$on('phoneValid', function () {
            phoneValid = true;
        });

        function checkExist(prop) {
            var tmp;

            if ($scope.account[prop] === undefined || $scope.account[prop] === '') {
                $scope.account[prop + 'Exist'] = false;
                return;
            }

            if (prop === 'username') {
                tmp = account.checkExist('', $scope.account['username']);
            } else {
                tmp = account.checkExist($scope.account[prop]);
            }
            tmp.then(function (data) {

                if (data.is_succ) {

                    if (data.data) {
                        $scope.account[prop + 'Exist'] = true;
                    } else {
                        $scope.account[prop + 'Exist'] = false;

                        if (prop === 'phone') {
                            $scope.$broadcast('phoneValid');
                        }
                    }
                }
            });
        }

        function registerDemo() {
            var prop;

            if ($scope.registerForm.$invalid || $scope.account.usernameExist || 
                    $scope.account.phoneExist || $scope.account.emailExist) {
                

                $scope.formErr.username = true;
                $scope.formErr.phone = true;
                $scope.formErr.verifyCode = true;
                $scope.formErr.password = true;
                $scope.formErr.confirmPwd = true;
                return;
            }

            account.registerDemo($scope.account.username, $scope.account.phone, $scope.account.verifyCode,
                    $scope.account.email, $scope.account.password).then(function (data) {

                if (!data.is_succ) {

                    if (data.error_msg === '验证码不正确') {
                        $scope.account.codeCorrect = false;
                        return;
                    }
                } else {
                    $scope.step ++;
                }        
            });
        }

        function getVerifyCode() {
            
            if (phoneValid) {
                account.getVerifyCode($scope.account.phone);
            }
        }

        // 注册真实账户
        function registerReal() {
            $state.go('account.subPage', {subPage: 'register_real'});
        }

        function hideErr(name) {
            $scope.formErr[name] = false;
        }

        function showErr(name) {
            $scope.formErr[name] = true;

            if (name === 'username' || name === 'phone' || name === 'email') {
                checkExist(name);
            }

        }
    }
})();