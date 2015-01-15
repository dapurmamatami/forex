(function () {
    'use strict'

    angular
        .module('tigerwitPersonalApp')
        .factory('i18nConf', i18nConf);

    i18nConf.$inject = ['$rootScope', '$location'];

    function i18nConfig($rootScope, $location) {
        var service = {
        };
        return service;
    }

})();