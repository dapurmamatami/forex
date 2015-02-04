(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestHistoryController', InvestHistoryController);

    InvestHistoryController.$inject = ['$scope', 'stock'];

    function InvestHistoryController($scope, stock) {    
        $scope.orders = [];                //交易历史订单
        $scope.count = 10;                 //单页订单数 
        $scope.noMoreOrders = false;
        $scope.orderType = 'normal';       //value is 'normal' or 'not_copy' or 'only_copy'
        $scope.getMoreOrders = getMoreOrders;
        $scope.switchOrderType = switchOrderType;
        var lastId;

        if (!$scope.userType.isPersonal) {
            $scope.noMoreOrders = false;

            stock.getHistory({
                orderType: 'not_copy',
                count: $scope.count,
                type: 'real',
                userCode: $scope.userType.code
            }).then(function (data) {
                $scope.orders = data.data;
                var dataLength = $scope.orders.length;
                
                if (dataLength) {
                    lastId = data.data[dataLength - 1].id;
                }

                $scope.$broadcast('hideLoadingImg');
            });
        } else {
            $scope.$watch(function () {
                return $scope.$parent.accountType;
            }, function () {
                $scope.noMoreOrders = false;
                $scope.orderType = 'normal';

                stock.getHistory({
                    orderType: $scope.orderType,
                    count: $scope.count,
                    type: $scope.accountType.key
                }).then(function (data) {
                    $scope.orders = data.data;
                    var dataLength = $scope.orders.length;
                    
                    if (dataLength) {
                        lastId = data.data[dataLength - 1].id;
                    }

                    $scope.$broadcast('hideLoadingImg');
                });
            }, true); 
        }
  
        function getMoreOrders() {
            var tmp;

            if (!$scope.userType.isPersonal) {
                tmp = stock.getHistory({
                    orderType: 'not_copy',
                    count: $scope.count,
                    lastId: lastId,
                    type: 'real',
                    userCode: $scope.userType.code
                });
            } else {
                tmp = stock.getHistory({
                    orderType: $scope.orderType,
                    count: $scope.count,
                    lastId: lastId,
                    type: $scope.accountType.key
                });
            }
            tmp.then(function (data) {
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

        // 只有 personal 的历史订单可以切换类型
        function switchOrderType(type) {
            $scope.$broadcast('showLoadingImg');
            $scope.noMoreOrders = false;
            $scope.orderType = type;
            
            stock.getHistory({
                orderType: $scope.orderType,
                count: $scope.count,
                type: $scope.accountType.key
            }).then(function (data) {
                $scope.orders = data.data;
                var dataLength = $scope.orders.length;
                
                if (dataLength) {
                    lastId = data.data[dataLength - 1].id;
                }

                $scope.$broadcast('hideLoadingImg');
            });
        }
    }
})();