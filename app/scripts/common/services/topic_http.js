/*
 * 请求 fwb 数据都需要通过该服务封装 http 请求    
 */
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('topicHttp', topicHttp);

    topicHttp.$inject = ['$http'];

    function topicHttp($http) {
        var service = {
            get: get
        };
        return service;

        function get(url, argu) {
            return $http.get('/communicate/api' + url, {
                params: argu
            });
        }
    }
})();

