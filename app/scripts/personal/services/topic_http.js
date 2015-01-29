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

