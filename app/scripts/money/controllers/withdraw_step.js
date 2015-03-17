;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyWithdrawStepController', MoneyWithdrawStepController);

    MoneyWithdrawStepController.$inject = ['$scope', '$modalInstance', 'money','personal', 'withdraw'];

    function MoneyWithdrawStepController($scope, $modalInstance, money, personal, withdraw) {
        $scope.step = 1;
        $scope.realName = personal.realname;
        $scope.withdrawAmount = withdraw.amount;
        $scope.card = {
            bankAddr: '',
            number: ''
        };
        $scope.goNextStep = goNextStep;
        $scope.goPreStep = goPreStep;
        $scope.withdrawFun = withdrawFun;
        $scope.closeModal = closeModal;

        function goNextStep() {
            $scope.step ++;
        }

        function goPreStep() {
            $scope.step--;
        }

        function closeModal() {
            $modalInstance.dismiss();
        }

        function withdrawFun() {
            money.withdraw(Number($scope.withdrawAmount).toFixed(2), $scope.card.bankAddr, 
                    $scope.card.number).then(function (data) {

                if (data.is_succ) {
                    goNextStep();
                }
            });
        }

    }
})();