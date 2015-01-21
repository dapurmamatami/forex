(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('storage', storage);

    storage.$injector = ['$window'];

    function storage($window) {
        var service = {
            get: get,
            set: set,
            remove: remove
        };
        return service;
                            
        function get(name) {
            return $window.localStorage.getItem(name);
        }

        function set(name, value) {
            return $window.localStorage.setItem(name, value);
        }

        function remove(name) {
            remove(name);
        }

        function removeAll() {
            var list = ['phone', 'password', 'register-step', 'is_set_info', 'is_set_id_pic'];
            $.each(list, function (i, v) {
                remove(v);
            });
        }
    }
})();