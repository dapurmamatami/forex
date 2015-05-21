;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyBonusController', MoneyBonusController);

    MoneyBonusController.$inject = ['$scope','money'];

    function MoneyBonusController($scope,money) {
        $scope.bonus = [];
        money.getBonus().then(function (data) {
            $scope.bonus = data.data;
            $scope.$broadcast('hideLoadingImg');
        });

        $scope.records = [];
        $scope.moreRecords = true;
        $scope.getRecords = getRecords;
        $scope.getMoreRecords = getMoreRecords;
        var lastCode,  // records 中最后一项的 code
        count = 10;

        // 获取全部记录
        getRecords('');
        function getRecords() {
            $scope.$broadcast('showLoadingImg');
            $scope.moreRecords = true;

            money.getBonusList('', count).then(function (data) {
                console.log(data.records[0]+"bbb");
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
            money.getBonusList(lastCode, count).then(function (data) {
                $scope.records = $scope.records.concat(data.records);
                var length = $scope.records.length;
                lastCode = $scope.records[length - 1].code;
                $scope.moreRecords = data.moreRecords;
                $scope.$broadcast('stopLoadingMore');
            });
        }

    }



})();