(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingSidebarController', SettingSidebarController);

    SettingSidebarController.$inject = ['$scope', '$state'];

    function SettingSidebarController($scope, $state) {
        $scope.subPage = $state.params.subPage;
        $scope.switchItem = switchItem;

        function switchItem(subPage) {
            $scope.subPage = subPage;
        }
    }
})();