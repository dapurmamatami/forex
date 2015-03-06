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
            date: {
                year: '',
                month: '',
                day: ''
            }
        };
        $scope.withdraw = withdraw;

        money.getFXRate().then(function (data) {
            $scope.FXRate.value = data.parity;
            var date = new Date(data.update_date * 1000);
            $scope.FXRate.date.year = date.getFullYear();
            $scope.FXRate.date.month = date.getMonth() + 1;
            $scope.FXRate.date.day = date.getDate();
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