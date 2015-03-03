;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingCardController', SettingCardController);

    SettingCardController.$inject = ['$scope', '$modal', 'account'];

    function SettingCardController($scope, $modal, account) {
        $scope.cards = [];
        $scope.cardId;    // 要删除的 bank card 的 id
        $scope.openAddModal = openAddModal;
        $scope.openDelModal = openDelModal;
        $scope.modifyProp = modifyProp;
        
        account.getBankCrds().then(function (data) {

            if (data.is_succ) {
                $scope.cards = data.data;
                if (data.data.length) {
                    modifyProp($scope.cards);
                }
            }
        });

        function openAddModal(size) {
            $modal.open({
                templateUrl: 'views/setting/card_add_modal.html',
                controller: 'SettingCardCRUDController',
                size: size,
                resolve: {
                    passedScope: function () {
                        return $scope;
                    }
                }
            });
        }

        function openDelModal(size, cardId) {
            $scope.cardId = cardId;
            
            $modal.open({
                templateUrl: 'views/setting/card_del_modal.html',
                controller: 'SettingCardCRUDController',
                size: size,
                resolve: {
                    passedScope: function () {
                        return $scope;
                    }
                }
            });
        }

        function modifyProp(cards) { 

            angular.forEach(cards, function (card) {

                if (card['bank_name'] === 'CMB') {
                    card['nameEN'] = 'CMB';
                    card['nameZH'] = '招商银行';
                }
                
                if (card['bank_name'] === 'ICBC') {
                    card['nameEN'] = 'ICBC';
                    card['nameZH'] = '工商银行';
                }

                if (card['bank_name'] === 'CCB') {
                    card['nameEN'] = 'CCB';
                    card['nameZH'] = '建设银行';
                }

                if (card['bank_name'] === 'BOC') {
                    card['nameEN'] = 'BOC';
                    card['nameZH'] = '中国银行';
                } 

            });
        }
    }
})();