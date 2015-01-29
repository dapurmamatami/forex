(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('config', config);

    config.$inject = ['$rootScope', '$location'];

    function config($rootScope, $location) {
        var service = {
            apiUrl: '/api/v1',
            personalUrl:'/communicate/api',
            webSocketUrl: 'ws://' + $location.host() + '/api/v1',
            httpTimeout: 10000
        };
        return service;
    }
})();