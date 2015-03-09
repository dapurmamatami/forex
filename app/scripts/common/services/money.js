(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('money', money);

        money.$inject = ['$http'];

        function money($http) {
            var service = {
                getLastEquity: getLastEquity,
                getHistory: getHistory,
                getDepositAmnt: getDepositAmnt,
                getFXRate: getFXRate,
                deposit: deposit,
                withdraw: withdraw
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

            /**
             * Money Service 出金
             *
             * @method withdraw
             * @param 
             * @return  
             * }
             */
            function withdraw(amount, cardId) {
                return $http.post('/withdraw', {
                    amount: amount,
                    card_id: cardId
                });
            }

            /**
             * Money Service 获取出入金历史
             *
             * @method getHistory
             * @param {String} type 值为 'payment' or 'withdraw' 出金还是入金
             * @param {String} after 值为 '' 或者数字
             * @param {Number} count 每次请求的记录个数
             * @return  
             * }
             */
            function getHistory(type, lastId, count) {
                return $http.get('/pay_history', {
                    params: {
                        direction: type,
                        after: lastId,
                        count: count
                    }
                }).then(function (data) {
                    if (!data.is_succ) return;
                    if (Object.prototype.toString.call(data.data) !== '[object Array]') return;
                    // 要返回的历史记录
                    var records = [];
                    
                    angular.forEach(data.data, function (item) {
                        var record = {};

                        record['amount'] = item['amount'];
                        record['timestamp'] = item['order_date'];
                        record['code'] = item['order_no'];   

                        if (item['status'] === 4) {

                            record['statusMsg'] = '确认支付成功';
                            record['type'] = 'deposit';
                        }

                        if (item['status'] === 5) {

                            record['statusMsg'] = '开户赠金';
                            record['type'] = 'deposit';
                        }

                        if (item['status'] === 6) {

                            record['statusMsg'] = '推荐好友赠金';
                            record['type'] = 'deposit';
                        }

                        if (item['status'] === -2) {

                            record['statusMsg'] = '出金处理完毕（人工转账完成）';
                            record['type'] = 'withdraw';
                        }

                        this.push(record);
                    }, records);
                    
                    return records;
                });
            }
        }
})();