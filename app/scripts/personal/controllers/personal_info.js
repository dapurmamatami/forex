(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('PersonalInfoController', PersonalInfoController);

    PersonalInfoController.$inject = ['$location','$scope', '$timeout',
            '$modal', '$cookieStore', '$state', 'account', 'money', 'communicate', 'copy'];

    function PersonalInfoController($location, $scope, $timeout, $modal, $cookieStore, $state,
            account, money, communicate, copy) {
        $scope.userType = {
            code:'',
            isPersonal:true
        };
        $scope.personal = {};       // personal（自己）
        $scope.realEquityInfo = {}; // 真实账户资产信息
        $scope.demoEquityInfo = {}; // 模拟账户资产信息
        $scope.user = {};           // user（别人）
        $scope.openRegisterModal = openRegisterModal;
        $scope.openCopyModal = openCopyModal;
        $scope.follow = follow;
        $scope.cancelFollow = cancelFollow;

        // 获取 personal 的信息
        account.getPersonalInfo().then(function (data) {
            $scope.personal = data;
            $cookieStore.put('userCode',parseInt(data.user_code));
            getSocialSum($scope.personal, $scope.personal.user_code, copy, communicate);

            if (data.verified) {
                // 获取真实账户的 money
                (function getEquity() {
                    money.getLastEquity().then(function (data) {
                        $scope.realEquityInfo = data;
                        $scope.$broadcast('equity',data);
                        $timeout(getEquity, 5 * 1000);
                    });
                })();

                // 获取模拟账户的 money，传递给 copy modal
                money.getLastEquity('demo').then(function (data) {
                    $scope.demoEquityInfo = data;
                });
            }
        });


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

                if (data.copy_demo || data.copy_real) {
                    $scope.user.isCopy = true;
                } else {
                    $scope.user.isCopy = false;
                }
            });
            // 获取别人的 fan sum
            getFanSum($scope.user, $scope.userType.code, communicate);
        }

        switchLayout();

        // 获取 personal 的 copier sum、copied trader sum 和 fan sum、following sum
        function getSocialSum(personal, userCode, service1, service2) {
            service1.getCCSum(userCode).then(function (data) {
                personal.copiedTraderSum = data.mycopy_count;
                personal.copierSum = data.copy_count;
                service2.getFFSum(userCode).then(function (data) {
                    personal.followingSum = data.data.attention_sum;
                    personal.fanSum = data.data.fans_sum;
                });
            });
        }

        // 获取 user 的 fan sum，同时确定 personal 与 user 的关注关系
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


        function openModal(size) {
              $modal.open({
                templateUrl: 'views/account/register.html',
                controller: 'AccountRegisterController',
                size: size
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

        function switchLayout(){
            if($location.$$url == 'topic_detail'){
                $scope.layoutContent= 'content__detail';
                $scope.layoutSide = 'content__share';
            }else{
                $scope.layoutContent= 'content__content';
                $scope.layoutSide = 'content__sidebar-ad';
            }
        }
        switchLayout();
    }

})();
