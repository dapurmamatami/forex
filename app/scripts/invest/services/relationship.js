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
            getFanSum: getFanSum
        };
        return service;

        function getCopiedTraders() {
            return $http.get('/copiedtraders_list');
        }

        function getCopiers(lastId, count) {
            return $http.get('/copiers_list', {
                params: {
                    after: lastId,
                    count: count
                }
            });
        }

        function getFanSum(userCodes) {
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