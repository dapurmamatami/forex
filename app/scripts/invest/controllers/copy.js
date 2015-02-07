(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestCopyController', InvestCopyController);

    InvestCopyController.$inject = ['$scope','$state' , '$modalInstance', 'copy', 'passedScope'];

    function InvestCopyController($scope, $state, $modalInstance, copy, passedScope) {
        $scope.copiedTrader = passedScope.user;
        $scope.personal = passedScope.personal;
        $scope.copyType = 'demo'; // 'demo' or 'real'

        // 模拟账户复制
        $scope.demoCopy = {
            amount: $scope.copiedTrader.copy_demo || '100.00',
            balance: passedScope.demoBalance,
            percent: '',//toDecimal($scope.demoCopy.amount / $scope.demoCopy.balance * 100)
            minError: '',
            maxError: '' 
        };

        // 真实账户复制
        $scope.realCopy = {
            amount: $scope.copiedTrader.copy_real || '100.00',
            balance: passedScope.realBalance,
            percent: '',//toDecimal($scope.realCopy.amount / $scope.realCopy.balance * 100)
            minError: '',
            maxError: ''  
        };
        
        $scope.switchCopyType = switchCopyType;
        $scope.submitCopyForm = submitCopyForm;
        $scope.cancelCopy = cancelCopy;
        var COPY_MAX_PERCENT = 0.5;

        $scope.demoCopy.percent = toDecimal($scope.demoCopy.amount / $scope.demoCopy.balance * 100);
        $scope.realCopy.percent = toDecimal($scope.realCopy.amount / $scope.realCopy.balance * 100); 
        $scope.copiedTrader.userCode = $state.params.userCode;








        $scope.$watch('demoCopy.amount', function (amount) {
            validateAmount('demoCopy', amount);
        });

        $scope.$watch('realCopy.amount', function (amount) {
            validateAmount('realCopy', amount);
        });


        function switchCopyType() {
            
            if ($scope.copyType === 'real') { 
                $scope.copyType = 'demo';
                validateAmount('demoCopy', $scope.demoCopy.amount);
            } else {
                $scope.copyType = 'real';
                validateAmount('realCopy', $scope.realCopy.amount);
            }
        }
        
        function submitCopyForm() {
            copy.copy($scope.copiedTrader.userCode, $scope.copyType, 
                    $scope.copyAmount).then(function (data) {
                if (!data.is_succ) {
                    return;
                }
                copy.getCopiedTraderInfo($scope.copiedTrader.userCode).then(function (data) {
                    console.info(data);
                });        
            });
        }

        function cancelCopy() {

        }

        // 保留 2 位小数
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

            while (s.length <= rs + 2) {
                s += 0;
            }
            return s;
        }

        // 验证输入的金额是否有效
        function validateAmount(propName, amount) {
           var f = parseFloat(amount);
            
            if (isNaN(f)) {
                $scope[propName].minError = '';
                $scope[propName].maxError = '';
                return;
            }
            $scope[propName].percent = toDecimal(f / $scope[propName].balance * 100);
           
            if (f < 100) {
                $scope[propName].minError = '复制金额最少是 100 美金';
            } else {
                $scope[propName].minError = '';
            }

            if (f > $scope[propName].balance * COPY_MAX_PERCENT) {
                $scope[propName].maxError = '复制金额最多是可用复制金的 50%';
            } else {
                $scope[propName].maxError = '';
            }
        }
    }
})();