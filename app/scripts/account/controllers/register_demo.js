;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountRegisterDemoController', AccountRegisterDemoController);

    AccountRegisterDemoController.$inject = ['$rootScope', '$scope', '$state', '$q', 'account', 'validator'];

    function AccountRegisterDemoController($rootScope, $scope, $state, $q, account, validator) {
        $scope.step = 1;
        $scope.account = {
            username: '',
            usernameExist: false,   // 昵称是否存在
            usernameReg: validator.regType.username.reg,
            phone: '',
            phoneExist: false,  // 手机号是否已注册
            phoneReg: validator.regType.phone.reg,
            verifyCode: '',
            codeCorrect: true,  // 验证码是否正确
            email: '',
            emailExist: false,  // 邮箱是否认证
            emailReg: validator.regType.email.reg,
            password: '',
            confirmPwd: '',     // 确认密码
            forkCode: '',        // 邀请码（可选）
            agreement: true
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

        $rootScope.floatBtnShow = false;

        // return a promise object is for prop='phone'
        function checkExist(prop) {
            var deferred = $q.defer();
            deferred.resolve(false);
            var tmp = deferred.promise;

            if ($scope.account[prop] === undefined || $scope.account[prop] === '') {
                $scope.account[prop + 'Exist'] = false;
                return tmp;
            }

            if (prop === 'username') {
                tmp = account.checkExist('', $scope.account['username']);
            } else {
                tmp = account.checkExist($scope.account[prop]);
            }
            return tmp.then(function (data) {

                if (data.is_succ) {

                    if (data.data) {
                        $scope.account[prop + 'Exist'] = true;
                        return false;
                    } else {
                        $scope.account[prop + 'Exist'] = false;
                        return true;
                    }
                }
            });
        }

        function registerDemo() {

            if ($scope.registerForm.$invalid || $scope.account.usernameExist || 
                    $scope.account.phoneExist || $scope.account.emailExist) {
                $scope.formErr.username = true;
                $scope.formErr.phone = true;
                $scope.formErr.verifyCode = true;
                $scope.formErr.email = true;
                $scope.formErr.password = true;
                $scope.formErr.confirmPwd = true;
                return;
            }

            account.registerDemo($scope.account.username, $scope.account.phone, $scope.account.verifyCode,
                    $scope.account.email, $scope.account.password).then(function (data) {

                if (!data.is_succ) {

                    if (data.error_msg === '验证码不正确' || data.error_msg === '请先发送验证码') {
                        $scope.account.codeCorrect = false;
                        return;
                    }
                } else {
                    $scope.step ++;
                }        
            });
        }

        function getVerifyCode() {

            // 检查手机号码是否已经存在
            checkExist('phone').then(function (data) {
                if (data) {
                    $scope.startTimer();
                    account.getVerifyCode($scope.account.phone);
                }
            });
        }

        // 注册真实账户
        function registerReal() {
            $state.go('account.subPage', {subPage: 'register_real'});
        }

        function hideErr(name) {
            $scope.formErr[name] = false;

            if (name === 'verifyCode') {
                $scope.account.codeCorrect = true;
            }

            if (name === 'phone') {
                $scope.account.phoneExist = false;
            }
        }

        function showErr(name) {
            $scope.formErr[name] = true;

            // 这里不检查手机号码是否存在，在 getVerifyCode 方法中检查
            if (name === 'username' || name === 'email') {
                checkExist(name);
            }
        }
    }
})();