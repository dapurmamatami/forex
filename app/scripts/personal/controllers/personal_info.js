(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('PersonalInfoController', PersonalInfoController);

    PersonalInfoController.$inject = ['$rootScope', '$location','$scope', '$timeout','$modal', '$cookieStore',
            '$state', '$q','config', 'account', 'money', 'communicate', 'copy'];

    function PersonalInfoController($rootScope, $location, $scope, $timeout, $modal, $cookieStore, $state,
            $q, config, account, money, communicate, copy) {
        $scope.registerRealStep = 1;
        $scope.userType = {
            code:'',
            isPersonal:true
        };
        $scope.personal = {};       // personal（自己）
        $scope.realEquityInfo = {}; // 真实账户资产信息
        $scope.demoEquityInfo = {}; // 模拟账户资产信息
        $scope.registerReal = registerReal;  // 注册真实账户（实名认证）
        $scope.skipDetail = skipDetail;

        // 显示在线客服图标
        $rootScope.floatBtnShow = true;

        // 获取 personal 的信息
        account.getPersonalInfo().then(function (data) {
            $scope.personal = data;
            $scope.personal.xsAvatar = config.avatarUrl + data.user_code + '_28.jpg';
            $scope.personal.smAvatar = config.avatarUrl + data.user_code + '_50.jpg';
            $scope.personal.mdAvatar = config.avatarUrl + data.user_code + '_80.jpg';
            $scope.personal.lgAvatar = config.avatarUrl + data.user_code + '_150.jpg';

            $cookieStore.put('userCode',parseInt(data.user_code));

            getAdditionalInfo($scope.personal, $scope.personal.user_code, account, communicate);

            // 是否注册真实账户
            if (data.verified) {
                // 获取真实账户的 money
                (function getEquity() {
                    money.getLastEquity().then(function (data) {
                        $scope.realEquityInfo = data;
                        console.info($scope.realEquityInfo);
                        $scope.$broadcast('equity',data);
                        $timeout(getEquity, 5 * 1000);
                    });
                })();            			  
            }

            // 获取模拟账户的 money，传递给 copy modal
            money.getLastEquity('demo').then(function (data) {
                $scope.demoEquityInfo = data;
            });
    
        });

        // 获取开通真实账户的进度信息
        account.getStepInfo('ReliableInformation').then(function (data) {

            if (data.is_succ) {
                $scope.registerRealStep = data.progress + 1;
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
                personal.location = data.region;
                personal.signature = data.desc;
            });
            communicateService.getFFSum(userCode, userCode).then(function (data) {
                personal.followingSum = data.data.attention_sum;
                personal.fanSum = data.data.fans_sum;
            });
        }

        // 打开注册真实账户的 Modal
        function registerReal(size) {
            $modal.open({
                templateUrl: 'views/account/register_real_mdl.html',
                controller: 'AccountRegisterRealMdlController',
                size: size,
                resolve: {
                    registerStep: function () {
                        return $scope.registerRealStep;
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
