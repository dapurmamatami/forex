;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyDepositController', MoneyDepositController);

    MoneyDepositController.$inject = ['$scope','$window', '$modal', 'money'];

    function MoneyDepositController($scope, $window, $modal, money) {
        $scope.deposit = {
            amount: '',          // 金额
            minAmount: '',       // 最小金额
        };
        $scope.FXRate = {
            value: '',
            date: {
                year: '',
                month: '',
                day: ''
            }
        };
        $scope.deposit = deposit;

        money.getDepositAmnt().then(function (data) {
            $scope.deposit.minAmount = data.limit;
        });

        money.getFXRate().then(function (data) {
            $scope.FXRate.value = data.parity;
            var date = new Date(data.update_date * 1000);
            $scope.FXRate.date.year = date.getFullYear();
            $scope.FXRate.date.month = date.getMonth() + 1;
            $scope.FXRate.date.day = date.getDate();
        });

        function deposit(amount) {
            var newAmount,
                w;

            // 判断是否注册真实账户    
            if ($scope.personal.verified) {
                openTipModal('sm');
                return;
            }

            // 是选择金额还是手输金额
            if (typeof amount === 'undefined') {
                newAmount = Number($scope.deposit.amount).toFixed(2);
            } else {
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
    }
})();