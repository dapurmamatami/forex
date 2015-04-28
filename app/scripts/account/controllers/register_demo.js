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
                status: 0    // 0、1、2
            },
            phone: {
                show: false,
                status: 0    // 0、1
            },
            verifyCode: {
                show: false,
                status: 0    // 0、1
            },
            email: {
                show: false,
                status: 0    // 0、1
            }
        };
        $scope.registerDemo = registerDemo;
        $scope.showErr = showErr;
        $scope.hideErr = hideErr;
        $scope.getVerifyCode = getVerifyCode;
        $scope.registerReal = registerReal;

        $rootScope.floatBtnShow = false;

        console.info($state.params);

        $scope.account.username = $state.params.name;
        $scope.account.phone = $state.params.phone;
        $scope.account.email = $state.params.email;

        // 从 landing page 进入时，验证错误
        if ($scope.account.username) {

            if (!validator.isValidTxt($scope.account.username, validator.regType.
                    username.pattern, validator.regType.dbcs.pattern, 4, 20)) {
                $scope.account.username = undefined;
            }
        }

        if ($scope.account.phone) {

            if (!validator.regType.phone.reg.test($scope.account.phone)) {
                $scope.account.phone = undefined;
            }
        }

        if ($scope.account.email) {

            if (!validator.regType.email.reg.test($scope.account.email)) {
                $scope.account.email = undefined;
            }
        }

        // return a promise object is for prop='phone'
        // prop 值为 'username', 'phone', 'email'
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
                        return false;
                    } else {
                        return true;
                    }
                }
            });
        }

        function registerDemo() {

            // 前端有错误
            if ($scope.registerForm.$invalid) {

                angular.forEach($scope.formErr, function (value, key) {
                    value.show = true;
                });

                return;
            }

            // 为了兼容 landing page 注册，查重 email
            // phone 查重在 getVerifyCode 中，username 检查在 account.registerDemo
            checkExist('email').then(function (data) {

                // 邮箱已存在
                if (data === false) {
                    $scope.backErr.email.show = true;
                } else {

                    account.registerDemo($scope.account.username, $scope.account.phone, 
                            $scope.account.verifyCode, $scope.account.email, 
                            $scope.account.password, $scope.account.forkCode, 
                            $state.params.lp, $state.params.pid,$state.params.unit, 
                            $state.params.key).then(function (data) {

                        if (!data.is_succ) {

                            if (data.error_code === 7) {
                                $scope.backErr.username.show = true;
                                $scope.backErr.username.status = 1;
                            }

                            if (data.error_code === 10) {
                                $scope.backErr.username.show = true;
                                $scope.backErr.username.status = 2;
                            }

                            if (data.error_code === 5 || data.error_code === 12) {
                                $scope.backErr.verifyCode.show = true;
                                $scope.backErr.verifyCode.status = 1;
                            }
                        } else {
                            $scope.step ++;
                        }        
                    });
                }
            });
        }

        function getVerifyCode() {

            $scope.backErr.phone.show = true;

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