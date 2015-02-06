(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestCopyController', InvestCopyController);

    InvestCopyController.$inject = ['$scope', '$modalInstance', 'passedScope'];

    function InvestCopyController($scope, $modalInstance, passedScope) {
        $scope.user = passedScope.user;
        $scope.personal = passedScope.personal;
        $scope.balance = passedScope.balance;
        $scope.copyNumber = 100;
        $scope.copyRate = toDecimal(100 / $scope.balance * 100);
        $scope.minError = '';
        $scope.maxError = '';
        var COPY_MAX_PERCENT = 0.5;

        $scope.$watch('copyNumber', function (value) {

            if (isNaN(value)) {
                $scope.minError = '';
                $scope.maxError = '';
                return;
            }

            var f = parseFloat(value);
            $scope.copyRate = toDecimal(f / $scope.balance * 100);
            
            if (f < 100) {
                $scope.minError = '复制金额最少为 100 美金';
            } else {
                $scope.minError = '';
            }

            if (f > $scope.balance * COPY_MAX_PERCENT) {
                $scope.maxError = '复制金额最多是可用复制金的 50%';
            } else {
                $scope.maxError = '';
            }
        });

        function toDecimal(x) {
            var f = parseFloat(x);

            if (isNaN(f)) {
                return;
            }

            var f = Math.round(x * 100) / 100;
            var s = f.toString();
            var rs = s.indexOf('.');

            if (rs < 0) {
                rs = s.length;
                s += '.';
            }

            while (s.length <= rs +2) {
                s += 0;
            }
            return s;
        }
    }
})();