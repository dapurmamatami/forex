(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('stock', stock);

    stock.$inject = ['$http'];

    function stock($http) {
        var service = {
            getEquityReport: getEquityReport,
            getSymbolDetail: getSymbolDetail,
            getSummaryReport: getSummaryReport,
            getHistory: getHistory,
            getSymbolHotList: getSymbolHotList,
            getSymbolPrice:getSymbolPrice,
            getSymbolRelative:getSymbolRelative
        };
        return service;

        /*
         * Stock Service 获取资产的净值的变化率
         *
         * @method getEquityReport
         * @param {String} period 距离当前的天数
         * @param {String} accountType 值为 'demo' or 'real'
         * @param {String} userCode 用户的 user code
         * @return {Object} {
         *   data: [{
         *
         *   }],
         *   error_msg: '',
         *   is_succ: true / false
         * }
         */
        function getEquityReport(period, accountType, userCode) {
            return $http.get('/equity_report', {
                params: {
                    period: period,
                    tiger_source: accountType,
                    cros_user: userCode
                }
            });
        }

        /*
         * Stock Service 获取外汇价格变化曲线
         *
         * @method getSymbolDetail
         * @param {String} symbol 外汇名
         * @param {String} period 距离当前的天数
         * }
         */
        function getSymbolDetail(symbol, period) {
            return $http.get('/symbol_detail', {
                params: {
                    symbol: symbol,
                    period: period
                }
            });
        }

        /*
         * Stock Service 获取资产概况
         *
         * @method getSummaryReport
         * @param {String} period 距离当前的天数
         * @param {String} accountType 值为 'demo' or 'real'
         * @param {String} userCode 用户的 user code
         * @return {Object} {
         *   total_profit_rate 盈利率
         *   total_volume      总交易手数
         *   total_pips        获利点数
         *   order_count       总订单数
         *   profit_rate       盈利订单（即胜率）
         *   max_profit        最大盈利
         *   min_profit        最小盈利
         *   avg_profit        平均盈利
         *   deficit_rate      亏损订单
         *   max_deficit       最大亏损
         *   min_deficit       最小亏损
         *   avg_deficit       平均亏损
         * }
         */
        function getSummaryReport(accountType, userCode, period) {
            return $http.get('/summary_report', {
                params: {
                    tiger_source: accountType,
                    cros_user: userCode,
                    period: period
                }
            });
        }

        /*
         * 投资详情（Invest） - 历史交易记录
         *
         * @method getHistory
         * @param {Object} {
         *   after: // 从某个编号（id） 之后取记录,
         *   count: // 拉取记录的数量
         * }
         * @return {Object} {
         *   id: // 历史单编号
         *   open_price: // 开仓价格
         *   close_price: // 平仓价格
         *   profit: // 收益金额
         *   storage: // 隔夜利息
         *   timestamp: // 平仓时间
         *   symbol: // 外汇名称
         *   cmd: //类型， 0是做多的平仓， 1是做空的平仓
         * }
         */
         function getHistory(argu) {
            var newArgu = {};

            angular.forEach(argu, function (value, key) {
                switch(key) {
                    case 'orderType':
                        this['category'] = value;
                        break;
                    case 'count':
                        this['count'] = value;
                        break;
                    case 'lastId':
                        this['after'] = value;
                        break;
                    case 'copiedTraderUserCode':
                        this['user_code'] = value;
                        break;
                    case 'accountType':
                        this['tiger_source'] = value;
                        break;
                    case 'userCode':
                        this['cros_user'] = value;
                    default:
                        break;
                }
            }, newArgu);

            return $http.get('/get_history', {
                params: newArgu
            });
         }

      /**
       *  获取品类详情页面的热门投资者列表
       * @param symbol
       * @returns {HttpPromise}
       */
         function getSymbolHotList(symbol){

           return $http.get('/symbol_master',{
              params:{
                  symbol:symbol
              }
           })

         }

        /**
         * 获取品类实时价格
         * @param symbol
         * @returns {HttpPromise}
         */
          function getSymbolPrice(symbol){
              return $http.get('/symbol_price',{
                  params:{
                      symbol:symbol
                  }
              })
          }
          function getSymbolRelative(symbol){
              return $http.get('/symbol_relative',{
                  params:{
                      symbol:symbol
                  }
              })
          }
    }
})();
