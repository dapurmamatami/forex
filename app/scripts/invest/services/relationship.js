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
            getFollowings: getFollowings,
            getFans: getFans,
            getFanSum: getFanSum,
            getOtherParams: getOtherParams
        };
        return service;

        function getCopiedTraders() {
            return $http.get('/copiedtraders_list');
        }

        function getCopiers(userCode, lastId, count) {
            return $http.get('/copiers_list', {
                params: {
                    cros_user: userCode,
                    after: lastId,
                    count: count
                }
            });
        }

        function getFollowings(userCode, lastId, count) {
            return topicHttp.get('/fflist', {
                userCode: userCode,
                startIndex: lastId,
                offset: count,
                type: 0
            });
        }

        function getFans(userCode, lastId, count) {
            return topicHttp.get('/fflist', {
                userCode: userCode,
                startIndex: lastId,
                offset: count,
                type: 1 
            });
        }
        

        function getFanSum(userCodes) {
            var codesStr = JSON.stringify(userCodes);
            return topicHttp.get('/fanssum', {
                usercodes:codesStr
            });
        }

        function getOtherParams(userCodes) {
            var codeStr = JSON.stringify(userCodes);
            return $http.get('/extend_list', {
                params: {
                    user_codes: codeStr
                }
            });
        }

        
    }
})();