(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('account', account);

    account.$inject = ['$rootScope', '$http', 'storage'];

    function account($rootScope, $http, storage) {
        var service = {
            getInfo: getInfo,
            setInfo: setInfo,
            checkExistence: checkExistence
        };
        return service;

        function getInfo(type) {
            return $http.get('/get_info', {
                params: {
                    type: type || ''
                }
            });
        }

        function setInfo(realName, idNumber, forkCode) {
            return $http.post('/set_info', {
                real_name: realName,
                id_no: idNumber,
                fork_code: forkCode
            });
        }

        function checkExistence(number, userName) {
            return $http.get('/exists', {
                key: number,
                user_name: userName
            });
        }
    }
})();
