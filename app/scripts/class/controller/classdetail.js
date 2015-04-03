(function(){
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('ClassDetailController',ClassDetailController);

    ClassDetailController.$inject = ['$scope', '$state', 'stock','communicate','storage'];

    function ClassDetailController($scope, $state, stock,communicate,storage) {
        $scope.chartType = 'price';
        $scope.symbol = $state.params.className;
        $scope.single_symbol =  window.symbol_detail_single;
        $scope.forex = {
            name: $state.params.className,
            period: {
                value: '',
                valShow: ''
            },
            priceBuy: '',
            priceSale: '',
            timestamp: '',
        };
        $scope.paintChart = paintChart;
        $scope.skipToMasterInvester = skipToMasterInvester;
        $scope.linkDetail = linkDetail;
        function linkDetail(className){
          window.symbol_detail_single = $scope.mData;
          $state.go('class.detail',{className:className});
        }
        paintChart(7, '近 1 周内');

        function paintChart(value, valShow) {
            $scope.forex.period.value = value;
            $scope.forex.period.valShow = valShow;

            stock.getSymbolDetail($scope.forex.name, $scope.forex.period.value).then(function (data) {
                $scope.$broadcast('paintLineChart', data.data);
            });
        }
        function skipToMasterInvester(){
            $state.go('master.subPage',{subPage:'recommend'})
        }
        function getSymbolInfo(startIndex){
            var symbol = $scope.symbol;
            communicate.getSymbolInfo(symbol,startIndex).then(function(data){
                if(data.statecode){
                    $scope.mCdata = data.data;
                    $scope.anyMore = data.data.lenght ==5?true:false;
                }
            })
        }
        function getSymbolHotList(){
            stock.getSymbolHotList($scope.symbol).then(function(data){
                if(data.is_succ){
                    $scope.hotList = data.data;
                }
            });
        }
        function getSymbolPrice(){
            stock.getSymbolPrice($scope.symbol).then(function(data){
                if(data.is_succ){
                    $scope.priceData = data;
                }
            })

        }
        function getSymbolRelative(){
            stock.getSymbolRelative($scope.symbol).then(function(data){
                if(data.is_succ){
                    $scope.RelativeData = data.data
                }
            })
        }
        getSymbolPrice();
        getSymbolRelative()
        getSymbolHotList()
        getSymbolInfo(0);
    }


})();
