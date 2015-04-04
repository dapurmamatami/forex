(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestIndexController', InvestIndexController);

    InvestIndexController.$inject = ['$location', '$rootScope', '$scope', '$state'];

    function InvestIndexController($location, $rootScope, $scope, $state) {
        $scope.childState = '';
        $scope.accountType = {
            key: 'demo',      //'demo' or 'real'
            value: '模拟',    // '模拟' or '真实'
            visible: false    // 切换真实模拟账户按钮的可见性
        };
        $scope.switchAccount = switchAccount;

        $scope.$on('$viewContentLoaded', function () {
            $scope.childState = $state.params.subPage;

            if (!$scope.userType.isPersonal) {
                $scope.accountType.visible = false;
            } else {

                if ($scope.childState === 'relationship' || $scope.childState === 'summary') {
                    $scope.accountType.visible = false;
                }

                if ($scope.childState === 'statistics' || $scope.childState === 'history') {
                    $scope.accountType.visible = true;
                }
            }
        });

        if (!$scope.userType.isPersonal) {
            // 获取别人信息用户名和签名    
        }

        function switchAccount() {
            $scope.$broadcast('showLoadingImg');

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
