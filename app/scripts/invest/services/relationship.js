(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('relationship', relationship);

    relationship.$inject = ['$http','topicHttp'];

    function relationship($http, topicHttp) {
        var service = {
            getCopiedTraders: getCopiedTraders,
            getCopiers: getCopiers,
            getFansSum: getFansSum
        };
        return service;

        function getCopiedTraders() {
            return $http.get('/copiedtraders_list');
        }

        function getCopiers() {
            return $http.get('/copiers_list');
        }

        function getFansSum(userCodes) {
            var codesStr = JSON.stringify(userCodes);
            //return topicHttp.get('/fanssum_p', userCodes);
            return $http.get('/fanssum_p', {
                params: {
                    usercodes: codesStr
                }
            });
        }
    }
})();