;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyWithdrawStepController', MoneyWithdrawStepController);

    MoneyWithdrawStepController.$inject = ['$scope', '$modalInstance', 'money',
            'personal', 'withdraw', 'validator'];

    function MoneyWithdrawStepController($scope, $modalInstance, money, personal, 
            withdraw, validator) {
        $scope.step = 2;
        $scope.realName = personal.realname;
        $scope.withdrawAmount = withdraw.amount;
        $scope.card = {
            bankAddr: '',
            number: '',
            numShow: '',
            numberReg: validator.regType.bankCardNum.reg,
            numberTip: validator.regType.bankCardNum.tip
        };
        $scope.formErr = {
            cardNum: false,
            bankAddr: false
        };
        $scope.goNextStep = goNextStep;
        $scope.goPreStep = goPreStep;
        $scope.withdrawFun = withdrawFun;
        $scope.closeModal = closeModal;
        $scope.hideErr = hideErr;
        $scope.showErr = showErr;

        function goNextStep() {

            if ($scope.step === 2) {

                if ($scope.bankForm.$invalid) {
                    $scope.formErr.cardNum = true;
                    $scope.formErr.bankAddr = true;
                    return;
                } else {
                    $scope.card.numShow = setSpaceInStr($scope.card.number);
                }
            }
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

        function hideErr(name) {
            $scope.formErr[name] = false;
        }

        function showErr(name) {
            $scope.formErr[name] = true;
        }

        function setSpaceInStr(str) {
            var strLen,
                tmpStr,
                tmpStrLen = 4,
                tmpStrNum,
                i,
                resultStr = '';
            
            strLen = str.length;
 
            if (strLen % tmpStrLen) {
                tmpStrNum = parseInt(strLen / tmpStrLen) + 1;
            } else {
                tmpStrNum = parseInt(strLen / tmpStrLen);
            } 
             
            for (i = 0; i < tmpStrNum * tmpStrLen; i = i + tmpStrLen) {
                tmpStr = str.slice(i, i + tmpStrLen) + ' ';
                resultStr = resultStr + tmpStr;
            }
            return resultStr;
        }
    }
})();