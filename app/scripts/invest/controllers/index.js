(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestIndexController', InvestIndexController);

    InvestIndexController.$inject = ['$scope', '$state', '$injector', '$location'];

    function InvestIndexController($scope, $state, $injector, $location) {
        $scope.childState = 'statistics';               // tab 切换参数
        $scope.accountType = {
            key: 'demo',
            value: '模拟'
        };
        
        $scope.switchTab = switchTab;
        $scope.switchAccount = switchAccount;
              
        function switchTab(childState) {
            $scope.childState = childState;
        }

        function switchAccount() {
            if ($scope.accountType.key === 'real') {
                $scope.accountType.key = 'demo';
                $scope.accountType.value = '模拟';
            } else {
                $scope.accountType.key = 'real';
                $scope.accountType.value = '真实';
            }
        }
    }
})();