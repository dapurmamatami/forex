;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twSidebarNav', twSidebarNav);

    function twSidebarNav() {
        return {
            restrict: 'A',
            scope: true,
            controller: function ($scope, $state) {
                $scope.subPage = $state.params.subPage;
                $scope.switchItem = switchItem;

                function switchItem(subPage) {
                    $scope.subPage = subPage;
                }
            }
        };
    }
})();