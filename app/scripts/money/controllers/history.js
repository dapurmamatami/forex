;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyHistoryController', MoneyHistoryController);

    MoneyHistoryController.$inject = ['$scope', 'money'];

    function MoneyHistoryController($scope, money) {
        $scope.type = ''; // 值为全部历史（''）或入金历史（'payment'）或出金历史（'withdraw'）   
        $scope.records = [];
        $scope.moreRecords = true;
        $scope.getRecords = getRecords;
        var count = 1;

        // 获取全部历史
        getRecords('');

        function getRecords(type) {
            $scope.$broadcast('showLoadingImg');
            $scope.type = type;
            $scope.moreRecords = true;

            money.getHistory(type, '', count).then(function (data) {
                $scope.records = data;
                $scope.$broadcast('hideLoadingImg');
            });
        }
    }
})();