;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingCardCRUDController', SettingCardCRUDController);

    SettingCardCRUDController.$inject = ['$scope', '$modalInstance', 'account', 'passedScope'];

    function SettingCardCRUDController($scope, $modalInstance, account, passedScope) {
        $scope.banks = [{
            nameZH: '招商银行',
            nameEN: 'CMB'
        }, {
            nameZH: '工商银行',
            nameEN: 'ICBC'
        }, {
            nameZH: '建设银行',
            nameEN: 'CCB'
        }, {
            nameZH: '中国银行',
            nameEN: 'BOC'
        }];
        $scope.bank;          // one object of banks
        $scope.card = {
            number: '',
            bankAddr: ''     // 开户行详细地址
        };
        $scope.addCard = addCard;
        $scope.delCard = delCard;
        $scope.closeModal = closeModal;

        function addCard() {
            account.addBankCrd($scope.bank.nameEN, $scope.card.number, $scope.card.bankAddr).then(function (data) {
                
                if (!data.is_succ) {
                    return;
                }
                updateCards(passedScope);
            });
        }

        function delCard() {
            account.delBankCrd(passedScope.cardId).then(function (data) {

                if (!data.is_succ) {
                    return;
                }
                updateCards(passedScope);
            });
        }

        function closeModal() {
            $modalInstance.close();
        }

        // 添加或者删除银行卡后更新 $scope.cards，并且更新后再关闭 modal
        function updateCards(passedScope) {
            account.getBankCrds().then(function (data) {

                if (!data.is_succ) {
                    return;
                }
                passedScope.cards = data.data;

                if (passedScope.cards.length) {
                    passedScope.modifyProp(passedScope.cards);
                }

                // 关闭弹窗
                closeModal();
            });
        }
    }
})();