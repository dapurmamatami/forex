;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twSidebarNav', twSidebarNav);

    twSidebarNav.$inject = ['$state'];

    function twSidebarNav($state) {
        return {
            restrict: 'A',
            scope: true,
            controller: function ($scope) {
                $scope.subPage = $state.params.subPage;
                $scope.switchItem = switchItem;

                function switchItem(subPage) {
                    $scope.subPage = subPage;
                }
            }
        };
    }
})();