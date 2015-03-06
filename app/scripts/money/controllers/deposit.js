;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyDepositController', MoneyDepositController);

    MoneyDepositController.$inject = ['$scope', '$modal', 'money'];

    function MoneyDepositController($scope, $modal, money) {
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
        $scope.openDepositModal = openDepositModal;
        var date;

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

        function openDepositModal() {
            $modal.open({
                templateUrl: 'views/money/deposit_modal.html',
                controller: ''
            });
        }
    }
})();