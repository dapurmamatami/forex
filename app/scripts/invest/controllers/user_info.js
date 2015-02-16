(function () {
    'use strict';
    angular
        .module('tigerwitPersonalApp')
        .controller('UserInfoController', UserInfoController);

    UserInfoController.$inject = ['$location','$scope', '$timeout',
            '$modal', '$cookieStore', '$state', 'account', 'money', 'communicate', 'copy'];

    function UserInfoController($location, $scope, $timeout, $modal, $cookieStore, $state,
            account, money, communicate, copy) {
        $scope.user = {};           // user（别人）
        
        $scope.openCopyModal = openCopyModal;
        $scope.follow = follow;
        $scope.cancelFollow = cancelFollow;

        // 取到 url 中的 user code
        $scope.userType.code = $state.params.userCode;

        if ($scope.userType.code && $cookieStore.get('userCode') &&
                $scope.userType.code !== $cookieStore.get('userCode').toString()) {

            // 确定了是 user（别人）的信息页面
            $scope.userType.isPersonal = false;

            // 获取 user（别人） 的信息
            account.getUserInfo($scope.userType.code).then(function (data) {

                if (!data.is_succ) {
                    return;
                }
                $scope.user.userCode = $scope.userType.code;
                $scope.user.userName = data.username;
                $scope.user.sex = data.sex;
                $scope.user.copiedTraderSum = data.mycopy_count;
                $scope.user.copierSum = data.copy_count;
                $scope.user.demoCopyAmount = data.copy_demo;
                $scope.user.realCopyAmount = data.copy_real;
                $scope.user.region = data.region;

                if (data.copy_demo || data.copy_real) {
                    $scope.user.isCopy = true;
                } else {
                    $scope.user.isCopy = false;
                }
            });
            // 获取别人的 fan sum
            getFanSum($scope.user, $scope.userType.code, communicate);
        }

        // 获取 user（别人）的 fan sum，同时确定 personal 与 user 的关注关系
        function getFanSum(user, userCode, service) {
            service.getFFSum(userCode).then(function (data) {
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
                            realBalance: $scope.realEquityInfo.balance,
                            demoBalance: $scope.demoEquityInfo.balance
                        }
                    }
                }
            });
        }

        function follow() {
            communicate.doAttention($scope.user.userCode, $scope.personal.user_code, 1).then(function (data) {
                if (data.statecode) {
                    getFanSum($scope.user, $scope.user.userCode, communicate);
                }
            });
        }

        function cancelFollow() {
            communicate.doAttention($scope.user.userCode, $scope.personal.user_code, 0).then(function (data) {
                if (data.statecode) {
                    getFanSum($scope.user, $scope.user.userCode, communicate);
                }
            });
        }
    }
})();