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
        $scope.registerReal = registerReal;  // 注册真实账户（实名认证）
        $scope.skipDetail = skipDetail;

        // 获取 personal 的信息
        account.getPersonalInfo().then(function (data) {
            $scope.personal = data;
            $cookieStore.put('userCode',parseInt(data.user_code));

            getAdditionalInfo($scope.personal, $scope.personal.user_code, account, communicate);

            // 是否注册真实账户
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
        
        // 获取开通真实账户的进度信息
        account.getStepInfo('ReliableInformation').then(function (data) {

            if (data.is_succ) {
                $scope.personal.step =data.progress + 1;
            }
        });

        //
        switchLayout();

        /*
         * 获取 personal 的其他的信息，包括 copier sum、
         * copied trader sum、fan sum、following sum、region
         */
        function getAdditionalInfo(personal, userCode, accountService, communicateService) {
            accountService.getUserInfo(userCode).then(function (data) {
                personal.copiedTraderSum = data.mycopy_count;
                personal.copierSum = data.copy_count;
                personal.region = data.region;
            });
            communicateService.getFFSum(userCode, userCode).then(function (data) {
                personal.followingSum = data.data.attention_sum;
                personal.fanSum = data.data.fans_sum;
            });
        }

        function registerReal(size) {
            $modal.open({
                templateUrl: 'views/account/register.html',
                controller: 'AccountRegisterRealController',
                size: size,
                resolve: {
                    personal: function () {
                        return $scope.personal
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
        
        //跳转到指定详情界面
        function skipDetail(topicId){
            $state.go('personal.topic_detail',{topicId:topicId});
        }
    }
})();
