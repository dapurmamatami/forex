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
            //username: ,
            //phone: ,
            //verifyCode: ,
            //email: ,
            //password: ,
            //confirmPwd: ,     // 确认密码
            forkCode: '',       // 邀请码（可选）
            agreement: true
        }

        // 前端错误，属性名与表单元素的 name 属性对应
        $scope.formErr = {
            username: {
                show: false,
                tip: validator.regType.username.tip
            },
            phone: {
                show: false,
                reg: validator.regType.phone.reg
            },
            verifyCode: {
                show: false
            },
            email: {
                show: false,
                reg: validator.regType.email.reg
            },
            password: {
                show: false,
                tip: validator.regType.password.tip
            },
            confirmPwd: {
                show: false
            }
        };
        // 后端返回的错误，属性名与表单元素的 name 属性对应
        $scope.backErr = {
            username: {
                show: false,
                status: 0,    // 0、1、2
                statusMsg: ''
            },
            phone: {
                show: false,
                status: 0,    // 0、1
                statusMsg: ''
            },
            verifyCode: {
                show: false,
                status: 0,    // 0、1
                statusMsg: ''
            },
            email: {
                show: false,
                status: 0,    // 0、1
                statusMsg: ''
            }
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

            if ($scope.account[prop] === undefined) {
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
                        $scope.backErr[prop].status = 1;
                        $scope.backErr[prop].statusMsg = '已存在';
                        return false;
                    } else {
                        return true;
                    }
                }
            });
        }

        function registerDemo() {

            if ($scope.registerForm.$invalid || $scope.backErr.username.status !== 0 || 
                    $scope.backErr.phone.status !== 0 || $scope.backErr.email.status !== 0) {
                $scope.formErr.username.show = true;
                $scope.backErr.username.show = true;
                $scope.formErr.phone.show = true;
                $scope.backErr.phone.show = true;
                $scope.formErr.verifyCode.show = true;
                $scope.backErr.verifyCode.show = true;
                $scope.formErr.email.show = true;
                $scope.backErr.email.show = true;
                $scope.formErr.password.show = true;
                $scope.formErr.confirmPwd.show = true;
                return;
            }

            account.registerDemo($scope.account.username, $scope.account.phone, $scope.account.verifyCode,
                    $scope.account.email, $scope.account.password).then(function (data) {

                if (!data.is_succ) {

                    if (data.error_code === 10) {
                        $scope.backErr.username.status = 2;
                        $scope.backErr.username.statusMsg = '昵称包含敏感词汇，请修改';
                    }

                    if (data.error_code === 5 || data.error_code === 12) {
                        $scope.backErr.verifyCode.status = 1;
                        $scope.backErr.verifyCode.statusMsg = '验证码不正确';
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
            $scope.formErr[name].show = false;

            if ($scope.backErr[name]) {
                $scope.backErr[name].show = false;
                $scope.backErr[name].status = 0;
                $scope.backErr[name].statusMsg = '';
            }
        }

        function showErr(name) {
            $scope.formErr[name].show = true;

            if ($scope.backErr[name]) {
                $scope.backErr[name].show = true;
            }
            
            // 这里不检查手机号码是否存在，在 getVerifyCode 方法中检查
            if (name === 'username' || name === 'email') {
                checkExist(name);
            }
        }
    }
})();