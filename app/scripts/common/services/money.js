(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('money', money);

        money.$inject = ['$http'];

        function money($http) {
            var service = {
                getLastEquity: getLastEquity,
            };
            return service;

            /**
             * Money Service 获取资产信息
             *
             * @method getLastEquity
             * @param {String} type 值为 'demo' or 'real'
             */
            function getLastEquity(type) {
                return $http.get('/equity/last', {
                    params: {
                        tiger_source: type
                    }
                });
            }
        }
})();