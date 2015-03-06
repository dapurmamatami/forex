(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('money', money);

        money.$inject = ['$http'];

        function money($http) {
            var service = {
                getLastEquity: getLastEquity,
                getDepositAmnt: getDepositAmnt,
                getFXRate: getFXRate,
                deposit: deposit
            };
            return service;

            /**
             * Money Service 获取资产信息
             *
             * @method getLastEquity
             * @param {String} type 值为 'demo' or 'real'
             * @return {Object} {
             *   balance     余额
             *   equity      净值
             *   margin_free  
             * }
             */
            function getLastEquity(type) {
                return $http.get('/equity/last', {
                    params: {
                        tiger_source: type
                    }
                });
            }

            /**
             * Money Service 获取入金时的入金金额限制
             *
             * @method getDepositAmnt
             * @param 
             * @return  
             * }
             */
            function getDepositAmnt() {
                return $http.get('/pay_limit');
            }

            /**
             * Money Service 获取美元对人民币汇率
             *
             * @method getFXRate
             * @param 
             * @return  
             * }
             */
            function getFXRate() {
                return $http.get('/get_parity');
            }

            /**
             * Money Service 入金
             *
             * @method deposit
             * @param 
             * @return  
             * }
             */
            function deposit(amount) {
                return $http.get('/pay', {
                    params: {
                        amount: amount
                    }
                });
            }

        }
})();