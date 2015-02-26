;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingCardController', SettingCardController);

    SettingCardController.$inject = ['$scope', '$modal'];

    function SettingCardController($scope, $modal) {
        $scope.openAddModal = openAddModal;
        $scope.openDelModal = openDelModal;
        
        function openAddModal(size) {
            $modal.open({
                templateUrl: 'views/setting/card_add_modal.html',
                controller: 'SettingCardOperateController',
                size: size
            });
        }

        function openDelModal(size) {
            $modal.open({
                templateUrl: 'views/setting/card_delete_modal.html',
                controller: 'SettingCardOperateController',
                size: size
            });
        }
    }
})();