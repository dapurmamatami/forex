(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('money', money);

        money.$inject = ['$window', '$http'];

        function money($window, $http) {
            //var equitySocketUrl = 'ws://test.tigerwit.com/api/v1/equity';
            //var equitySocket;

            var service = {
                //equitySocket: equitySocket,
                getLastEquity: getLastEquity,
                //pay: pay,
                //withdraw: withdraw
            };
            return service;

            /*function equitySocket() {
                if (equitySocket) {
                    return equitySocket;
                } else {
                    if ('WebSocket' in window) {
                        console.info(window);
                        console.info($window);
                        equitySocket = new WebSocket(equitySocketUrl);
                        return equitySocket;
                    } else {

                    }
                }
            }*/

            function getLastEquity() {
                return $http.get('/equity/last');
            }

           /* function pay() {
                return $http.get('/pay', {
                    params: {
                        amount: money
                    }
                });
            }

            function withdraw(opts) {
                return $http.post('/withdraw', opts);
            }*/
        }
})();