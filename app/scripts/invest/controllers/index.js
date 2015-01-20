(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestIndexController', InvestIndexController);

    InvestIndexController.$inject = ['$scope', '$state'];

    function InvestIndexController($scope, $state) {
        $scope.childState = '';
        $scope.switchTab = switchTab;

        var stateUrl = $state.current.url;
        var stateUrlList = stateUrl.split('/');
        $scope.childState = stateUrlList[2];

        if ($scope.childState === '' || $scope.childState === ':subPage') {
            $scope.childState = 'statistics';
        }
                    
        function switchTab(childState) {
            $scope.childState = childState;
        }
    }
})();