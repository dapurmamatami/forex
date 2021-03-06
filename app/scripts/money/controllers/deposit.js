;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyDepositController', MoneyDepositController);

    MoneyDepositController.$inject = ['$scope','$window', '$modal', 'money', 'validator'];

    function MoneyDepositController($scope, $window, $modal, money, validator) {
        $scope.deposit = {
            amount: '',          // 金额
            amountReg: validator.regType.amount.reg,
            amountTip: validator.regType.amount.tip,
            minAmount: '',       // 最小金额
        };
        $scope.FXRate = {
            value: '',
            timestamp: ''
        };
        $scope.formErr = {
            depositAmount: false
        };
        $scope.depositFun = depositFun;
        $scope.hideErr = hideErr;
        $scope.showErr = showErr;

        money.getDepositAmnt().then(function (data) {
            $scope.deposit.minAmount = parseFloat(data.limit);
        });

        money.getFXRate().then(function (data) {
            $scope.FXRate.value = data.parity;
            $scope.FXRate.timestamp = data.update_date;
            $scope.$broadcast('hideLoadingImg');
        });

        function depositFun(amount) {
            var newAmount,
                w;  

            // 判断是否注册真实账户    
            if (!$scope.personal.verified) {
                openTipModal('sm');
                return;
            }

            // 判断是是手输金额还是选择金额
            if (typeof amount === 'undefined') {
                // 是手输金额

                if ($scope.depositForm.$invalid) {
                    $scope.formErr.depositAmount = true;
                    return;
                }
                newAmount = Number($scope.deposit.amount).toFixed(2);
            } else {
                // 是选择金额
                newAmount = Number(amount).toFixed(2);
            }
            
            w = $window.open('#/static/waiting');

            money.deposit(newAmount).then(function (data) {
                if (!data.is_succ) return;
                openDepositModal();
                w.location = data.url; 
            });
        }

        // 入金后的窗口，有支付遇到问题和支付成功俩选项
        function openDepositModal() {
            $modal.open({
                templateUrl: 'views/money/deposit_modal.html',
                controller: function ($scope, $modalInstance) {
                    $scope.closeModal = closeModal;
                    $scope.openDialog = openDialog;

                    function closeModal() {
                        $modalInstance.dismiss();
                    }

                    function openDialog() {
                        OpenChat();
                        closeModal();
                    }
                }
            });
        }

        // 未注册真实账户时入金打开该窗口
        function openTipModal(size) {
            $modal.open({
                templateUrl: 'views/money/tip_modal.html',
                controller: function ($scope, $modalInstance) {
                    $scope.closeModal = closeModal;

                    function closeModal() {
                        $modalInstance.dismiss();
                    }
                },
                size: size
            });
        }

        function hideErr(name) {
            $scope.formErr[name] = false;
        }

        function showErr(name) {
            $scope.formErr[name] = true;
        }
    }
})();