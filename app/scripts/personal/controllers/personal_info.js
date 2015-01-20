(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('PersonalInfoController', PersonalInfoController);
    
    PersonalInfoController.$inject = ['$rootScope', '$scope','$state', '$timeout',
            'account', 'money'];

    function PersonalInfoController($rootScope, $scope, $state, $timeout, account, money) {
        $scope.profile = {};

        account.getInfo().then(function (data) {
            $scope.hasLoadProfile = true;
            $scope.profile = data;

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
        
    }

})();