(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('copy', copy);

    copy.$inject = ['$http'];

    function copy($http) {
        var service = {
            getCCSum: getCCSum,
            copy: copy,
            getCopiedTraderInfo: getCopiedTraderInfo,
            cancelCopy: cancelCopy
        };
        return service;

        /**
         * Copy Service 获取用户的 copied trader 和 copier 总数！要删除
         *
         * @method getCCSum
         * @param {Object} {
         *   cros_user:  // user code
         * }
         * @return {Object} {
         *   copy_count:    // copier sum
         *   mycopy_count:  // copied trader sum
         * }
         */
        function getCCSum(userCode) {
            return $http.get('/get_user_info', {
                params: {
                    cros_user: userCode
                }
            });
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

        /**
         * Copy Service 取消 copy 某人
         * @method cancelCopy
         * @param {Object} {
         *   auto_delete:  // 是否平仓 
         * }
         */
        function cancelCopy(userCode, isCloseOut, copyType) {
            return $http.post('/uncopy', {
                user_code: userCode,
                auto_delete: false,
                to: copyType
            });
        }

    }
})();