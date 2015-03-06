(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('PersonalInfoController', PersonalInfoController);

    PersonalInfoController.$inject = ['$location','$scope', '$timeout',
            '$modal', '$cookieStore', '$state', 'config', 'account', 'money', 'communicate', 'copy'];

    function PersonalInfoController($location, $scope, $timeout, $modal, $cookieStore, $state,
            config, account, money, communicate, copy) {
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
                personal.location = data.region;
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

      function switchMessageData(type){
        if(type == 'sys'){
          $scope.message_show_data = $scope.sys_message;
          $scope.unvisit_item_sum = $scope.unvisited_sys;
          $scope.message_title_tip = "系统消息";
          $scope.sys_msg_selected = true;
          $scope.self_msg_selected = false;
          updateMessages($scope.message_show_data,type);

        }else{
          $scope.message_show_data = $scope.user_message;
          $scope.unvisit_item_sum = $scope.unvisited_user;
          $scope.message_title_tip = "我的消息";
          $scope.self_msg_selected = true;
          $scope.sys_msg_selected = false;
          updateMessages($scope.message_show_data,type);
        }
        $scope.msg_type = type;
      }
      function getMessageInfo(item){
        communicate.getMessageInfo(0,10).then(function(data){
          if(data.statecode){
            $scope.unvisited_sys = data.data.unvisited_sum.sys_unvisited_sum;
            $scope.unvisited_user = data.data.unvisited_sum.user_unvisited_sum;
            $scope.sys_message = data.data.sys;
            $scope.user_message = data.data.user;
            switchMessageData(item);
          }
        });
      }


    }
})();
