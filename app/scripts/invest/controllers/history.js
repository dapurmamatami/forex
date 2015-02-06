(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestHistoryController', InvestHistoryController);

    InvestHistoryController.$inject = ['$scope', 'stock'];

    function InvestHistoryController($scope, stock) {    
        $scope.orders = [];          // 交易订单（全部交易和自主交易）
        $scope.noMoreOrders = false; // 是否有更多的订单（全部交易和自主交易）
        $scope.copiedTraders = [];   // 复制交易中的 copied traders         
        $scope.orderType = 'normal'; // 'normal'、'not_copy'、'only_copy'、'copy_detail'
        $scope.getOrders = getOrders; // 可获取三种订单
        $scope.getMoreOrders = getMoreOrders; //获取更多订单（全部和自主交易）
        $scope.getMoreCopyOrders = getMoreCopyOrders; //获取更多复制交易订单
        var lastId,
            count = 1;   //单页订单(全部和自主交易)数 

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

        // 只 personal 可以切换账户类型（demo、real）和订单类型（三种）
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
                var dataLength = data.data.length;

                if (dataLength <= 0) {
                    $scope.noMoreOrders = true;
                    $scope.$broadcast('hideLoadingImg');
                    return;
                }

                if (orderType === 'only_copy') {
                    $scope.copiedTraders = data.data;
                    angular.forEach($scope.copiedTraders, function (copiedTrader) {
                        copiedTrader.noMoreOrders = false;
                    });
                $scope.orders = data.data;
                var dataLength = $scope.orders.length;
                } else {
                    $scope.orders = data.data;
                }
                
                
                lastId = data.data[dataLength - 1].id;
               
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

                if (dataLength <= 0) {
                    $scope.noMoreOrders = true;
                    $scope.$broadcast('stopLoadingMore');
                    return;
                }

                if ($scope.orderType === 'noly_copy') {
                    $scope.copiedTraders = $scope.copiedTraders.concat(data.data);
                } else {
                    $scope.orders = $scope.orders.concat(data.data);
                }
     
                lastId = data.data[dataLength - 1].id;

                $scope.$broadcast('stopLoadingMore');
            });
        }

        function getMoreCopyOrders(copiedTrader, copiedTraderUserCode) {
            stock.getHistory({
                orderType: 'copy_detail',
                accountType: $scope.accountType.key,
                copiedTraderUserCode: copiedTraderUserCode
            }).then(function (data) {
                var dataLength = data.data.length;

                if (dataLength) {
                    copiedTrader.data = copiedTrader.data.concat(data.data);
                } else {
                    copiedTrader.noMoreOrders = true;
                }

                $scope.$broadcast('stopLoadingMore');
            });
        }
    }
})();