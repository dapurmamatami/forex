;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyWithdrawController', MoneyWithdrawController);

    MoneyWithdrawController.$inject = ['$scope', '$modal', 'money', 'validator'];

    function MoneyWithdrawController($scope, $modal, money, validator) {
        $scope.withdraw = {
            amount: '',
            amountReg: validator.regType.amount.reg,
            amountTip: validator.regType.amount.tip
        };
        $scope.FXRate = {
            value: '',
            timestamp: ''
        };
        $scope.formErr = {
            withdrawAmount: false
        };
        $scope.openWithdrawMdl = openWithdrawMdl;
        $scope.hideErr = hideErr;
        $scope.showErr = showErr;

        money.getFXRate().then(function (data) {
            $scope.FXRate.value = data.parity;
            $scope.FXRate.timestamp = data.update_date;
            $scope.$broadcast('hideLoadingImg');
        });

        function openWithdrawMdl(size) {
            
            if ($scope.withdrawForm.$invalid) {
                $scope.formErr.withdrawAmount = true;
                return;
            }
            $modal.open({
                templateUrl: 'views/money/withdraw_modal.html',
                controller: 'MoneyWithdrawStepController',
                size: size,
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

        function hideErr(name) {
            $scope.formErr[name] = false;
        }

        function showErr(name) {
            $scope.formErr[name] = true;
        }
    }
})();