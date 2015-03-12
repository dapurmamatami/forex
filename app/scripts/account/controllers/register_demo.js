;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountRegisterDemoController', AccountRegisterDemoController);

    AccountRegisterDemoController.$inject = ['$scope', '$state', 'account'];

    function AccountRegisterDemoController($scope, $state, account) {
        $scope.step = 1;
        $scope.account = {
            username: '',
            nameExist: false,   // 昵称是否存在
            phone: '',
            phoneExist: false,  // 手机号是否已注册
            pInfoBack: false,    // 检查手机号码是否存在的方法的返回信息
            verifyCode: '',
            codeCorrect: true,  // 验证码是否正确
            email: '',
            emailExist: false,  // 邮箱是否认证
            password: '',
            confirmPwd: '',     // 确认密码
            forkCode: ''        // 邀请码（可选）
        }
        $scope.checkNameExist = checkNameExist;
        $scope.checkPhoneExist = checkPhoneExist;
        $scope.checkEmailExist = checkEmailExist;
        $scope.registerDemo = registerDemo;
        $scope.eliminateErr = eliminateErr;
        $scope.getVerifyCode = getVerifyCode;
        $scope.registerReal = registerReal;

        // 检查昵称是否已存在
        function checkNameExist() {
            if ($scope.account.username === undefined || $scope.account.username === '') return;
            account.checkExist('', $scope.account.username).then(function (data) {
                
                if (data.is_succ) {

                    if (data.data) {
                        $scope.account.nameExist = true;
                    } else {
                        $scope.account.nameExist = false;
                    }
                }
            });
        }

        // 检查手机号码是否存在
        function checkPhoneExist() {
            if ($scope.account.phone === undefined || $scope.account.phone === '') return;
            account.checkExist($scope.account.phone).then(function (data) {
                
                if (data.is_succ) {
                    $scope.account.pInfoBack = true;

                    if (data.data) {
                        $scope.account.phoneExist = true;
                    } else {
                        $scope.account.phoneExist = false;
                    }
                }
            });
        }

        function checkEmailExist() {
            if ($scope.account.email === undefined || $scope.account.email === '') return;
            account.checkExist($scope.account.email).then(function (data) {

                if (data.is_succ) {

                    if (data.data) {
                        $scope.account.emailExist = true;
                    } else {
                        $scope.account.emailExist = false;
                    }
                }
            });
        }

        function registerDemo() {
            account.registerDemo($scope.account.username, $scope.account.phone, $scope.account.verifyCode,
                    $scope.account.email, $scope.account.password).then(function (data) {
                console.info(data);

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

        function eliminateErr(message) {

            if (message === 'username is existent') {
                $scope.account.nameExist = false;
            }

            if (message === 'phone is existent') {
                $scope.account.phoneExist = false;
                $scope.account.pInfoBack = false;
            }

            if (message === 'email is existent') {
                $scope.account.emailExist = false;
            }

            if (message === 'verify code is incorrect') {
                $scope.account.codeCorrect = true;
            }               

        }

        function getVerifyCode() {
            account.getVerifyCode($scope.account.phone);
        }

        // 注册真实账户
        function registerReal() {
            $state.go('account.subPage', {subPage: 'register_real'});
        }
    }
})();