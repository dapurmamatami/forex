;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyWithdrawStepController', MoneyWithdrawStepController);

    MoneyWithdrawStepController.$inject = ['$scope', '$modalInstance', 'money', 'account','personal', 'withdraw'];

    function MoneyWithdrawStepController($scope, $modalInstance, money, account, personal, withdraw) {
        $scope.step = 1;
        $scope.cards = [];
        $scope.chosedCard = {};
        $scope.realName = personal.realname;
        $scope.withdrawAmount = withdraw.amount;
        $scope.toNextStep = toNextStep;
        $scope.choseCard = choseCard;
        $scope.withdrawFun = withdrawFun;

        account.getBankCrds().then(function (data) {
            $scope.cards = data;
        });

        function toNextStep() {
            $scope.step ++;
        }

        function choseCard(cardId) { 

            angular.forEach($scope.cards, function (card) {

                if (card.id === cardId) {
                    $scope.chosedCard = card;
                }
            });

            toNextStep();
        }

        function withdrawFun() {
            money.withdraw(Number($scope.withdrawAmount).toFixed(2), $scope.chosedCard.id).then(function (data) {
                console.info(data);
            });
        }

    }
})();