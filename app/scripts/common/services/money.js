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
                withdraw: withdraw,
                cancelWithdraw: cancelWithdraw,
                getAvailableBalance: getAvailableBalance
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
            
            /*
            	获取复制可用金额
             */
            function getAvailableBalance(type) {
                return $http.get('/copy_available_balance', {
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
            function withdraw(amount, bankAddr, cardNum) {
                return $http.post('/withdraw', {
                    amount: amount,
                    bank_name: bankAddr,
                    card_id: cardNum
                });
            }

            /**
             * Money Service 撤消出金申请
             * @method cancelWithdraw
             * 
             * @param {Number} code 出入金历史纪录的编号
             */
             function cancelWithdraw(code) {
                return $http.post('/cancel_withdraw', {
                    order_no: code
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
                        record['status'] = item['status'];
                        record['timestamp'] = item['order_date'];
                        record['code'] = item['order_no'];   

                        if (item['status'] === 2 || item['status'] === 3) {
                            record['statusMsg'] = '入金中或入金失败';
                            record['type'] = 'deposit';

                        }

                        if (item['status'] === 4) {
                            record['statusMsg'] = '成功';
                            record['type'] = 'deposit';
                        }

                        if (item['status'] === 5) {
                            record['statusMsg'] = '成功';
                            record['type'] = 'deposit';
                        }

                        if (item['status'] === 6) {
                            record['statusMsg'] = '成功';
                            record['type'] = 'deposit';
                        }


                        if (item['status'] === -1) {
                            record['statusMsg'] = '已提交';
                            record['type'] = 'withdraw';
                        }

                        if (item['status'] === -2) {
                            record['statusMsg'] = '撤销成功';
                            record['type'] = 'withdraw';
                        }


                        if (item['status'] === -3) {
                            record['statusMsg'] = '处理中';
                            record['type'] = 'withdraw';
                        }


                        if (item['status'] === -4) {

                            // 失败会有各种理由
                            record['statusMsg'] = '失败';
                            record['type'] = 'withdraw';
                        }

                        if (item['status'] === -5) {
                            record['statusMsg'] = '成功';
                            record['type'] = 'withdraw';
                        }

                        this.push(record);
                    }, records);
                    
                    return {
                        records: records,

                        moreRecords: data.next
                    };
                });
            }
        }
})();