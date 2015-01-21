(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('stock', stock);

    stock.$inject = ['$rootScope', '$http'];

    function stock($rootScope, $http) {
        var service = {
            getEquityReport: getEquityReport,
            getSummaryReport: getSummaryReport,
            getHistory: getHistory
        };
        return service;

        /*
         * 投资详情（Invest） - 近期资产情况
         *
         * @method getEquityReport
         * @param {Object} {
         *     period: //  距离当前的天数
         * }
         * @return {Object} {
         *     data: [[ //timestamp / 1000, // 金额]],
         *     error_msg:"",
         *     is_succ: true / false
         * }
         */
        function getEquityReport(opts) {
            return $http.get('/equity_report', {
                params: opts
            });    
        }

        /*
         * 投资详情（Invest） - 账户概况
         *
         * @method getSummaryReport
         * @return {Object} {
         *   total_profit_rate: // 盈利率,
         *   total_volume:      // 总交易手数,
         *   total_pips:        // 获利点数,
         *   order_count:       // 总订单数
         *   profit_rate:       //盈利订单
         *   max_profit:        //最大盈利
         *   min_profit:        //最小盈利
         *   avg_profit:        //平均盈利
         *   deficit_rate:      //亏损订单
         *   max_deficit:       //最大亏损
         *   min_deficit:       //最小亏损
         *   avg_deficit:       //平均亏损
         * }
         */
        function getSummaryReport(opts) {
            return $http.get('/summary_report', {
                params: opts
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
         function getHistory(opts) {
            return $http.get('/get_history', {
                params: opts
            })
         }
    }
})();