(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestHistoryController', InvestHistoryController);

    InvestHistoryController.$inject = ['$scope', 'stock'];

    function InvestHistoryController($scope, stock) {    
        $scope.orders = [];                //交易历史订单
        $scope.noMoreOrders = false;
        $scope.orderType = 'normal';       //value is 'normal' or 'not_copy' or 'only_copy'
        $scope.getOrders = getOrders;
        $scope.getMoreOrders = getMoreOrders;
        var lastId,
            count = 10;   //单页订单数 

        if (!$scope.userType.isPersonal) {
            $scope.orderType = 'not_copy';
            $scope.accountType.key = 'real';
            getOrders('not_copy', 'real', $scope.userType.code);
        } else {
            $scope.$watch(function () {
                return $scope.$parent.accountType;
            }, function () {
                getOrders($scope.orderType, $scope.accountType.key);
            }, true);
        }

        function getOrders(orderType, accountType, userCode) {
            $scope.$broadcast('showLoadingImg');
            $scope.orderType = orderType;
            $scope.noMoreOrders = false;

            stock.getHistory({
                orderType: orderType,
                count: count,
                accountType: accountType,
                userCode: userCode
            }).then(function (data) {
                console.info(data);
                $scope.orders = data.data;
                var dataLength = $scope.orders.length;
                
                if (dataLength) {
                    lastId = data.data[dataLength - 1].id;
                }

                $scope.$broadcast('hideLoadingImg');
            });
        }


        function getMoreOrders() {
            stock.getHistory({
                orderType: $scope.orderType,
                count: count,
                lastId: lastId,
                accountType: $scope.accountType.key,
                userCode: $scope.userType.code
            }).then(function (data) {
                var dataLength = data.data.length;

                if (dataLength) {
                    $scope.orders = $scope.orders.concat(data.data);
                    lastId = data.data[dataLength - 1].id;
                } else {
                    $scope.noMoreOrders = true;
                }

                $scope.$broadcast('stopLoadingMore');
            });
        }
    }
})();