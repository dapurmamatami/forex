(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestIndexController', InvestIndexController);

    InvestIndexController.$inject = ['$rootScope', '$scope', '$location'];

    function InvestIndexController($rootScope, $scope, $location) {
        $scope.childState = '';         
        $scope.accountType = {
            key: 'demo',      //'demo' or 'real'
            value: '模拟',    // '模拟' or '真实'
            visible: false    // 切换真实模拟账户按钮的可见性
        };
        $scope.switchAccount = switchAccount;

        $scope.$on('$viewContentLoaded', function () {
            var url = $location.path();
            $scope.childState = url.split('/')[2];

            if ($scope.childState === 'relationship' || $scope.childState === 'summary') {
                $scope.accountType.visible = false;
            }

            if ($scope.childState === 'statistics' || $scope.childState === 'history') {
                $scope.accountType.visible = true;
            } 
        });

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