(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('PersonalInfoController', PersonalInfoController);

    PersonalInfoController.$inject = ['$scope', '$timeout',
            '$modal', '$cookieStore', 'account', 'money', 'personal'];

    function PersonalInfoController($scope, $timeout, $modal, $cookieStore, account, money, personal) {
        //$scope.profile = {};
        $scope.personal = {};
       
        $scope.openModal = openModal;

        account.getInfo().then(function (data) {
            $scope.personal = data;
            $cookieStore.put('userCode',data.user_code);
 
            getSocialSum($scope.personal, personal);
            
            if (data.verified) {
                // 获取个人的 money
                (function getEquity() {
                    money.getLastEquity().then(function (data) {
                        $scope.equityInfo = data;
                        $timeout(getEquity, 5 * 1000);
                    });
                })();
            }
        });

        function getSocialSum(personal, service) {
            service.getCCSum().then(function (data) {
                personal.copiedTraderSum = data.mycopy_count;
                personal.copierSum = data.copy_count;
                service.getFFSum().then(function (data) {
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
    }

})();
