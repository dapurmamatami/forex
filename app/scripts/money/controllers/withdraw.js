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
        $scope.openWithdrawMdl = openWithdrawMdl;

        money.getFXRate().then(function (data) {
            $scope.FXRate.value = data.parity;
            $scope.FXRate.timestamp = data.update_date;
            $scope.$broadcast('hideLoadingImg');
        });

        function openWithdrawMdl() {
            $modal.open({
                templateUrl: 'views/money/withdraw_modal.html',
                controller: 'MoneyWithdrawStepController',
                resolve: {
                    withdraw: function () {
                        return $scope.withdraw;
                    },
                    personal: function () {
                        return $scope.personal;
                    }
                }
            });
        }

    }
})();