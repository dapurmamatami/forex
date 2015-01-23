(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestHistoryController', InvestHistoryController);

    InvestHistoryController.$inject = ['$scope', 'stock'];

    function InvestHistoryController($scope, stock) {    
        $scope.orders = [];                //交易历史订单
        $scope.count = 3;                  //单页订单数 
        $scope.noMoreOrders = false;
        $scope.orderType = 'normal';       //value is 'normal' or 'not_copy' or 'only_copy'
        $scope.getMoreOrders = getMoreOrders;
        $scope.switchOrderType = switchOrderType;

        var lastId;

        $scope.$watch(function () {
            return $scope.$parent.accountType;
        }, function () {
            $scope.noMoreOrders = false;
            $scope.orderType = 'normal';

            stock.getHistory({
                count: $scope.count,
                category: $scope.orderType,
                tiger_source: $scope.$parent.accountType.key
            }).then(function (data) {
                $scope.$broadcast('hideLoadingImg');

                $scope.orders = data.data;
                var dataLength = $scope.orders.length;
                if (dataLength) {
                    lastId = data.data[dataLength - 1].id;
                }
            });
        }, true);      

        function getMoreOrders() {
            stock.getHistory({
                count: $scope.count,
                after: lastId,
                category: $scope.orderType,
                tiger_source: $scope.$parent.accountType.key
            }).then(function (data) {
                var dataLength = data.data.length;

                if (dataLength) {
                    $scope.orders = $scope.orders.concat(data.data);
                    lastId = data.data[dataLength - 1].id;
                } else {
                    $scope.noMoreOrders = true;
                }
            });
        }

        function switchOrderType(type) {
            $scope.$broadcast('showLoadingImg');
            $scope.orderType = type;
            
            stock.getHistory({
                count: $scope.count,
                category: $scope.orderType,
                tiger_source: $scope.$parent.accountType.key
            }).then(function (data) {
                $scope.$broadcast('hideLoadingImg');
                $scope.orders = data.data;
                var dataLength = $scope.orders.length;
                if (dataLength) {
                    lastId = data.data[dataLength - 1].id;
                }
            });
        }

    }
})();