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
        $scope.getMoreRecords = getMoreRecords;
        var lastCode,  // records 中最后一项的 code
            count = 1;

        // 获取全部历史
        getRecords('');

        function getRecords(type) {
            $scope.$broadcast('showLoadingImg');
            $scope.type = type;
            $scope.moreRecords = true;

            money.getHistory(type, '', count).then(function (data) {
                $scope.records = data.records;
                $scope.moreRecords = data.moreRecords;
                var length = $scope.records.length;

                if (length <= 0) {
                    $scope.moreRecords = false;
                } else {
                    lastCode = $scope.records[length - 1].code;
                }
                $scope.$broadcast('hideLoadingImg');
            });
        }

        function getMoreRecords() {
            money.getHistory($scope.type, lastCode, count).then(function (data) {
                $scope.records = $scope.records.concat(data.records);
                var length = $scope.records.length;
                lastCode = $scope.records[length - 1].code;
                $scope.moreRecords = data.moreRecords;
                $scope.$broadcast('stopLoadingMore');
            });
        }
    }
})();