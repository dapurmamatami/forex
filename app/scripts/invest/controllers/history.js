(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestHistoryController', InvestHistoryController);

    InvestHistoryController.$inject = ['$scope', 'stock'];

    function InvestHistoryController($scope, stock) {
        $scope.orders = []; //交易历史订单
        $scope.count = 30;
        $scope.getMoreOrders = getMoreOrders;

        var lastId = 0;
        stock.getHistory({
            count: $scope.count,
            tiger_source: $scope.$parent.accountType.key
        }).then(function (data) {
            var dataLength = data.data.length;

            if (dataLength) {
                $scope.orders = data.data;
                lastId = data.data[dataLength - 1].id;
            }
        });

        function getMoreOrders() {
            stock.getHistory({
                count: $scope.count,
                after: lastId
            }).then(function (data) {
                var dataLength = data.data.length;
                if (dataLength) {
                    $scope.orders = $scope.orders.concat(data.data);
                    lastId = data.data[dataLength - 1].id;
                }
            });
        }

    }
})();