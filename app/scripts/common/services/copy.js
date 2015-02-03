(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('copy', copy);

    copy.$inject = ['$http'];

    function copy($http) {
        var service = {
            getCCSum: getCCSum
        };
        return service;

        /**
         * 获取 copied trader、copier 总数
         */
        function getCCSum() {
            return $http.get('/get_user_info');
        }

    }
})();