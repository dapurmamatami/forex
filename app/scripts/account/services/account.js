(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('account', account);

    account.$inject = ['$rootScope', '$http', 'storage'];

    function account($rootScope, $http, storage) {
        var service = {
            getInfo: getInfo,
            getStepInfo: getStepInfo,
            setInfo: setInfo,
            checkNumberExistence: checkNumberExistence
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

        function checkNumberExistence(number) {
            return $http.get('/exists', {
                params: {
                    key: number
                }
            });
        }

        function getStepInfo(type) {
            return $http.get('/get_info_progress', {
                params: {
                    type: type    //'ReliableInformation' or 'idPicInformation'
                }
            });
        }
    }
})();