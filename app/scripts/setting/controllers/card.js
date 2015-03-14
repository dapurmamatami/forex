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
        $scope.modifyProp = account.modCardsProp;
        
        account.getBankCrds().then(function (data) {
            $scope.cards = data;
            $scope.$broadcast('hideLoadingImg');
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
    }
})();