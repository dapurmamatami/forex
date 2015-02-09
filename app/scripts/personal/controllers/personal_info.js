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
        $scope.personal = {};
        $scope.realEquityInfo = {}; // 真实账户资产信息
        $scope.demoEquityInfo = {}; // 模拟账户资产信息
        $scope.user = {};
        $scope.openRegisterModal = openRegisterModal;
        $scope.openCopyModal = openCopyModal;

        account.getPersonalInfo().then(function (data) {
            $scope.personal = data;
            $cookieStore.put('userCode',data.user_code);

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

        $scope.userType.code = $state.params.userCode;

        if ($scope.userType.code && $cookieStore.get('userCode') &&
                $scope.userType.code !== $cookieStore.get('userCode')) {

            $scope.userType.isPersonal = false;

            // 获取别人的信息
            account.getUserInfo($scope.userType.code).then(function (data) {
                
                if (!data.is_succ) {
                    return;
                }
                $scope.user = {
                    userCode: $scope.userType.code,
                    userName: data.username,
                    sex: data.sex,
                    copiedTraderSum: data.mycopy_count,
                    copierSum: data.copy_count,
                    demoCopyAmount: data.copy_demo,
                    realCopyAmount: data.copy_real 
                };
                
                if (data.copy_demo || data.copy_real) {
                    $scope.user.isCopy = true;
                } else {
                    $scope.user.isCopy = false;
                }

                // 获取 fan sum、following sum
                communicate.getFFSum($scope.user.userCode).then(function (data) {
                    $scope.user.followingSum = data.data.attention_sum;
                    $scope.user.fanSum = data.data.fans_sum;
                });
            });
        }

        switchLayout();

        // 获取 copier sum、copied trader sum、fan sum、following sum！！ 以后修改
        function getSocialSum(user, userCode, service1, service2) {
            service1.getCCSum(userCode).then(function (data) {
                user.copiedTraderSum = data.mycopy_count;
                user.copierSum = data.copy_count;
                service2.getFFSum(userCode).then(function (data) {
                    user.followingSum = data.data.attention_sum;
                    user.fanSum = data.data.fans_sum;
                });
            });
        }
        
        function openRegisterModal(size) {
              $modal.open({
                templateUrl: '/views/account/register.html',
                controller: 'AccountRegisterController',
                size: size
            });
        }

        function openCopyModal(size) {
            $modal.open({
                templateUrl: '/views/invest/copy.html',
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

        function switchLayout(){
            if($location.$$url == 'topic_detail'){
                $scope.layoutContent= 'content__detail';
                $scope.layoutSide = 'content__share';
            }else{
                $scope.layoutContent= 'content__content';
                $scope.layoutSide = 'content__sidebar-ad';
            }
        }
    }

})();
