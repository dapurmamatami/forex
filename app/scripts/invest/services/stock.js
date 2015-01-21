(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('stock', stock);

    stock.$inject = ['$rootScope', '$http'];

    function stock($rootScope, $http) {
        var service = {
            getEquityReport: getEquityReport,
            getSummaryReport: getSummaryReport
        };
        return service;

        /*
         * 投资详情 - 近期资产情况
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
         * 投资详情 - 账户概况
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
    }
})();