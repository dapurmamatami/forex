(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('copy', copy);

    copy.$inject = ['$http'];

    function copy($http) {
        var service = {
            getCCSum: getCCSum,
            copy: copy
        };
        return service;

        /**
         * Copy Service 获取 personal 的 copied trader 和 copier 总数
         *
         * @method getCCSum
         * @return {Object} {
         *   copy_count:    // copier sum
         *   mycopy_count:  // copied trader sum
         * }
         */
        function getCCSum() {
            return $http.get('/get_user_info');
        }

        /**
         * Copy Service 获取 copied trader 信息
         *
         * @method getCopiedTraderInfo
         * @param {Object} {
         *   cros_user: // copied trader's user code
         * }
         * @return {Object} {
         *   copy_count: // copier sum
         *   copy_demo:  // null 或者是金额，判断是否用模拟账户复制
         *   copy_real:  // null 或者金额，判断是否用真实账户复制
         * }
         */
        function getCopiedTraderInfo(userCode) {
            return $http.get('/get_user_info', {
                params: {
                    cros_user: userCode
                }
            });
        }

        /**
         * Copy Service copy 某人
         *
         * @method copy
         * @param {Object} {
         *   user_code: // copiedTrader 的 usercode
         *   to:        // real or demo
         *   amount:    // 复制金额
         * }
         */
        function copy(userCode, copyType, copyAmount) {
            return $http.post('/copy', {
                user_code: userCode,   
                to: copyType,          
                amount: copyAmount     
            });
        }

    }
})();