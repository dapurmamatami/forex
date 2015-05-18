(function () {
    'use strict';
    angular
        .module('tigerwitPersonalApp')
        .controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['$location','$scope', '$timeout',
            '$modal', '$cookieStore', '$state', 'config', 'account', 'money', 'communicate', 'copy'];

    function UserInfoController($location, $scope, $timeout, $modal, $cookieStore, $state,
            config, account, money, communicate, copy) {
        $scope.user = {};                     // user（别人）
        $scope.openCopyModal = openCopyModal;
        $scope.follow = follow;
        $scope.cancelFollow = cancelFollow;
        var personalUserCode;                 // personal 的 user code

        // 取到 url 中的 user code
        $scope.userType.code = $state.params.userCode;

        if ($scope.userType.code && $cookieStore.get('userCode') &&
                $scope.userType.code !== $cookieStore.get('userCode').toString()) {

            // 确定了是 user（别人）的信息页面
            $scope.userType.isPersonal = false;
            $scope.user.userCode = $scope.userType.code;
            $scope.user.xsAvatar = config.avatarUrl + $scope.user.userCode + '_28.jpg';
            $scope.user.smAvatar = config.avatarUrl + $scope.user.userCode + '_50.jpg';
            $scope.user.mdAvatar = config.avatarUrl + $scope.user.userCode + '_80.jpg';
            $scope.user.lgAvatar = config.avatarUrl + $scope.user.userCode + '_150.jpg';

            personalUserCode = $cookieStore.get('userCode').toString();

            // 获取 user（别人） 的信息
            account.getUserInfo($scope.userType.code).then(function (data) {
                if (!data.is_succ)return;
                $scope.user.username = data.username;
                $scope.user.sex = data.sex;
                $scope.user.copiedTraderSum = data.mycopy_count;
                $scope.user.copierSum = data.copy_count;
                $scope.user.demoCopyAmount = data.copy_demo;
                $scope.user.realCopyAmount = data.copy_real;
                $scope.user.location = data.region;

                if (data.copy_demo || data.copy_real) {
                    $scope.user.isCopy = true;
                } else {
                    $scope.user.isCopy = false;
                }
            });

            // 获取别人的 fan sum
            getFanSum($scope.user, personalUserCode, communicate);
        }

        
        money.getAvailableBalance('demo').then(function (data) {
            $scope.demoAvaBalance = data.available; 	
        });
        money.getAvailableBalance().then(function (data) {
            $scope.realAvaBalance = data.available; 	
        });
        
        /* 
         * 获取 user（别人）的 fan sum，同时确定 personal 与 user 的关注关系
         * 参数 personalUserCode 是 personalUserCode 而非 $scope.personal.user_code（异步数据）
         */
        function getFanSum(user, personalUserCode, communicateService) {
            communicateService.getFFSum(user.userCode, personalUserCode).then(function (data) {
                if (!data.statecode) {
                    return;
                }
                //user.followingSum = data.data.attention_sum;
                user.fanSum = data.data.fans_sum;

                if (data.data.is_by_attention) {
                    user.isFollow = true;
                } else {
                    user.isFollow = false;
                }
            });
        }
        
        console.info($scope);

        function openCopyModal(size) {
            $modal.open({
                templateUrl: 'views/invest/copy.html',
                controller: 'InvestCopyController',
                size: size,
                resolve: {
                    passedScope: function () {
                        return {
                            user: $scope.user,
                            personal: $scope.personal,
                            realBalance: $scope.realEquityInfo.copyAvaBalance,
                            demoBalance: $scope.demoEquityInfo.copyAvaBalance
                        }
                    }
                }
            });
        }

        function follow() {
            communicate.doAttention($scope.user.userCode, $scope.personal.user_code, 1).then(function (data) {
                if (data.statecode) {
                    getFanSum($scope.user, $scope.personal.user_code, communicate);
                }
            });
        }

        function cancelFollow() {
            communicate.doAttention($scope.user.userCode, $scope.personal.user_code, 0).then(function (data) {
                if (data.statecode) {
                    getFanSum($scope.user, $scope.personal.user_code, communicate);
                }
            });
        }
    }
})();