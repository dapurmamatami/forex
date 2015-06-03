;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('activity', activity);

    activity.$inject = ['$http'];

    // 各种临时活动服务
    function activity($http) {
        var service = {
            collectInfo: collectInfo
        };
        return service;

        /**    
         * Activity Service 现金返还活动收集用户 user code
         *
         * @method collectInfo
         *
         */
        function collectInfo(userCode) {
            return $http.get('/xxx', {
                params: {
                    cros_user: userCode
                }
            });
        } 
    }
})();