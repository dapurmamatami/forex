(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('PersonalInfoController', PersonalInfoController);

    PersonalInfoController.$inject = ['$rootScope', '$scope','$state', '$timeout',
            '$modal', 'account', 'money'];

    function PersonalInfoController($rootScope, $scope, $state, $timeout, $modal, account, money) {
        $scope.profile = {};
        $scope.profileLoad = false;
        $scope.openModal = openModal;

        account.getInfo().then(function (data) {
            $scope.profileLoad = true;
            $scope.profile = data;

            if (data.verified) {
                // 获取个人的 money
                (function getEquity() {
                    money.getLastEquity().then(function (data) {
                        $scope.equityInfo = data;
                        $timeout(getEquity, 5 * 1000);
                    }, function (resp) {
                        console.info(resp);
                    });
                })();
            }
        });

        function openModal(size) {
              $modal.open({
                templateUrl: '/views/account/register.html',
                controller: 'AccountRegisterController',
                size: size
            });
        }
    }

})();
