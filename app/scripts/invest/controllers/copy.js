(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestCopyController', InvestCopyController);

    InvestCopyController.$inject = ['$scope','$state' , '$modalInstance', 
            '$timeout', 'copy', 'passedScope'];

    function InvestCopyController($scope, $state, $modalInstance, $timeout, copy, 
            passedScope) {
        $scope.copiedTrader = passedScope.user;
        $scope.personal = passedScope.personal;
        $scope.copyType = 'demo'; // 'demo' or 'real'
        $scope.isCancel = false;  

        // 模拟账户复制
        $scope.demoCopy = {
            amount: $scope.copiedTrader.demoCopyAmount || '100.00',
            balance: passedScope.demoBalance || '0.00',
            percent: '', //toDecimal($scope.demoCopy.amount / $scope.demoCopy.balance * 100)
            isCopy: Boolean($scope.copiedTrader.demoCopyAmount), // 是否已经复制了
            isCloseOut: false, // 取消复制时是否平仓
            minError: '',
            maxError: '',
            backError: '' 
        };
        $scope.demoCopy.percent = toDecimal($scope.demoCopy.amount / $scope.demoCopy.balance * 100);

        // 真实账户复制
        $scope.realCopy = {
            amount: $scope.copiedTrader.realCopyAmount || '100.00',
            balance: passedScope.realBalance || '0.00',
            percent: '', //toDecimal($scope.realCopy.amount / $scope.realCopy.balance * 100)
            isCopy: Boolean($scope.copiedTrader.realCopyAmount),
            isCloseOut: false,
            minError: '',
            maxError: '',
            backError: ''  
        };
        $scope.realCopy.percent = toDecimal($scope.realCopy.amount / $scope.realCopy.balance * 100);  
        

        $scope.switchCopyType = switchCopyType;
        $scope.submitCopyForm = submitCopyForm;
        $scope.cancelCopy = cancelCopy;
        $scope.submitCancelForm = submitCancelForm;
        $scope.closeModal = closeModal;
        var COPY_MAX_PERCENT = 0.5;    

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
        
        // propName is: 'demoCopy' or 'realCopy'
        function submitCopyForm(propName) {
            copy.copy($scope.copiedTrader.userCode, $scope.copyType, 
                    $scope[propName].amount).then(function (data) {
                
                if (!data.is_succ) {
                    $scope[propName].backError = data.error_msg;
                } else {
                    updateCopiedTraderInfo($scope.copiedTrader, propName, copy);     
                }
            });
        }

        // 隐藏 copy 表单，显示取消 copy 的表单
        function cancelCopy() {
            $scope.isCancel = true;
        }

        function submitCancelForm(propName) {
            copy.cancelCopy($scope.copiedTrader.userCode, $scope[propName].isCloseOut,
                    $scope.copyType).then(function (data) {
                        
                if (!data.is_succ) {
                    return;
                }
                updateCopiedTraderInfo($scope.copiedTrader, propName, copy);
           });
        }


        // 保留 2 位小数
        function toDecimal(x) {
            var f = parseFloat(x);

            if (isNaN(f) || !isFinite(f)) {
                return undefined;
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

            if ($scope[propName].percent == undefined) {
                $scope[propName].percent = '无效';
            }
           
            if (f < 100) {
                $scope[propName].minError = '复制金额最少是 100 美金';
            } else {
                $scope[propName].minError = '';
            }

            //if (f > $scope[propName].balance * COPY_MAX_PERCENT) {
                //$scope[propName].maxError = '复制金额最多是可用复制金的 50%';
            if (f > $scope[propName].balance) {
                $scope[propName].maxError = '复制金额不能超过可用复制金';
            } else {
                $scope[propName].maxError = '';
            }
        }
        
        // 更新 copied trader 的信息
        function updateCopiedTraderInfo(copiedTrader, propName, service) {
            service.getCopiedTraderInfo(copiedTrader.userCode).then(function (data) {
                copiedTrader.copierSum = data.copy_count;
                
                if (propName === 'demoCopy') {
                    copiedTrader.demoCopyAmount = data.copy_demo;
                } else {
                    copiedTrader.realCopyAmount = data.copy_real;
                }

                if (data.copy_demo === null && data.copy_real === null) {
                    $scope.copiedTrader.isCopy = false;
                } else {
                    $scope.copiedTrader.isCopy = true;
                }


               $modalInstance.close();
            });
        }

        function closeModal() {
            $modalInstance.close();
        }
    }
})();