(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('account', account);

    account.$inject = ['$http'];

    function account($http) {
        var service = {
            getPersonalInfo: getPersonalInfo,
            getUserInfo: getUserInfo,
            getStepInfo: getStepInfo,
            setInfo: setInfo,
            checkNumberExistence: checkNumberExistence,
            submitQuestionnaire: submitQuestionnaire
        };
        return service;

        // 获取 personal 信息
        function getPersonalInfo(type) {
            return $http.get('/get_info', {
                params: {
                    type: type || ''
                }
            });
        }

        // 获取 user 信息
        function getUserInfo(userCode) {
            return $http.get('/get_user_info', {
                params: {
                    cros_user: userCode
                }
            });
        }

        // 注册时提交的真实姓名和身份证号
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

        function submitQuestionnaire(employment, income, experience) {
            return $http.post('/questionnaire', {
                current_situation: employment,
                yearly_income: income,
                investing_experience: experience
            });
        }
    }
})();
