(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('personal', personal);

    personal.$inject = ['$http', 'topicHttp'];
    function personal($http, topicHttp) {
        var service = {
            getCCSum: getCCSum,
            getFFSum: getFFSum
        };
        return service;

        //获取 copied trader、copier 总数
        function getCCSum() {
            return $http.get('/get_user_info');
        }
        //获取 fans、followings 总数 
        function getFFSum() {
            return topicHttp.get('/attentionsfans');
        }

    }
})();