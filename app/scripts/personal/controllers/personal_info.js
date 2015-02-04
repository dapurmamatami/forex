(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('PersonalInfoController', PersonalInfoController);

    PersonalInfoController.$inject = ['$location','$scope', '$timeout',
            '$modal', '$cookieStore', '$state', 'account', 'money', 'communicate', 'copy'];

    function PersonalInfoController($scope, $timeout, $modal, $cookieStore, $state,
            account, money, communicate, copy) {
        $scope.userType = {
            code:'',         //  code      
            isPersonal:true  // 是自己还是别人，默认�true
        };
        $scope.personal = {};
        $scope.equityInfo = {};  // personal money info
        $scope.user = {};
        $scope.openModal = openModal;

        account.getPersonalInfo().then(function (data) {
            $scope.personal = data;
            $cookieStore.put('userCode',data.user_code);

            getSocialSum($scope.personal, communicate, copy);

            if (data.verified) {
                // 获取个人�money
                (function getEquity() {
                    money.getLastEquity().then(function (data) {
                        $scope.equityInfo = data;
                        $scope.$broadcast('equity',data);
                        $timeout(getEquity, 5 * 1000);
                    });
                })();
            }
        });

        $scope.userType.code = $state.params.userCode;

        if ($scope.userType.code && $cookieStore.get('userCode') &&
                $scope.userType.code !== $cookieStore.get('userCode')) {
            
            $scope.userType.isPersonal = false;
            
            account.getUserInfo($scope.userType.code).then(function (data) {
                $scope.user = data;
            });
        } 

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
        /*personal.getCCSum().then(function (data) {
            $scope.personal.copiedTraderSum = data.mycopy_count;
            $scope.personal.copierSum = data.copy_count;
        });

        personal.getFFSum().then(function (data) {
            $scope.personal.followingSum = data.data.attention_sum;
            $scope.personal.fanSum = data.data.fans_sum;
        });
*/
        function openModal(size) {
              $modal.open({
                templateUrl: '/views/account/register.html',
                controller: 'AccountRegisterController',
                size: size
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
