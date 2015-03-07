;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyWithdrawController', MoneyWithdrawController);

    MoneyWithdrawController.$inject = ['$scope', '$modal', 'money'];

    function MoneyWithdrawController($scope, $modal, money) {
        $scope.withdraw = {
            amount: ''
        };
        $scope.FXRate = {
            value: '',
            timestamp: ''
        };
        $scope.withdraw = withdraw;

        money.getFXRate().then(function (data) {
            $scope.FXRate.value = data.parity;
            $scope.FXRate.timestamp = data.update_date;
        });

        function withdraw() {
            openWithdrawMdl();
        }

        function openWithdrawMdl() {
            $modal.open({
                templateUrl: 'views/money/withdraw_modal.html',
                controller: 'MoneyWithdrawStepController'
            });
        }

    }
})();