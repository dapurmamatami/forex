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

            getSocialSum($scope.personal, communicate, copy);

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

            account.getUserInfo($scope.userType.code).then(function (data) {
                $scope.user = data;
                getSocialSum($scope.user, communicate, copy);
            });
        }

        switchLayout();

        function getSocialSum(personal, service1, service2) {
            service2.getCCSum().then(function (data) {
                personal.copiedTraderSum = data.mycopy_count;
                personal.copierSum = data.copy_count;
                service1.getFFSum().then(function (data) {
                    personal.followingSum = data.data.attention_sum;
                    personal.fanSum = data.data.fans_sum;
                });
            });
        }
        


     
        function openModal(size) {
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
        switchLayout();
    }

})();
