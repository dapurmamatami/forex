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
        var date,
            w;

        money.getDepositAmnt().then(function (data) {
            $scope.deposit.minAmount = data.limit;
        });

        money.getFXRate().then(function (data) {
            $scope.FXRate.value = data.parity;
            date = new Date(data.update_date * 1000);
            $scope.FXRate.date.year = date.getFullYear();
            $scope.FXRate.date.month = date.getMonth() + 1;
            $scope.FXRate.date.day = date.getDate();
        });

        function deposit() {
            w = $window.open('#/static/waiting');

            money.deposit(Number($scope.deposit.amount).toFixed(2)).then(function (data) {
                if (!data.is_succ) return;
                openDepositModal();
                w.location = data.url; 
            });
        }

        function openDepositModal() {
            $modal.open({
                templateUrl: 'views/money/deposit_modal.html',
                controller: function ($scope, $modalInstance) {
                    $scope.closeModal = closeModal;

                    function closeModal() {
                        $modalInstance.dismiss();
                    }
                }
            });
        }
    }
})();