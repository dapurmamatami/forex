(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('account', account);

    account.$inject = ['$rootScope', '$http', 'storage'];

    function account($rootScope, $http, storage) {
        var service = {
            getInfo: getInfo
        };
        return service;

        function getInfo(type) {
            return $http.get('/get_info', {
                params: {
                    type: type || ''
                }
            });
        }
    }
})();