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
            submitQuestionnaire: submitQuestionnaire,
            getLocationInfo: getLocationInfo,
            getCountries: getCountries,
            getStates: getStates,
            getCities: getCities,
            uploadImage: uploadImage
        };
        return service;

        /**
         * Account Service 获取 personal（本人）信息
         * 
         * @method getPersonalInfo
         * @param {Object} {
         *   type: // 不设置 or ID or Profile 
         * }
         * @return {Object} {
         *   is_succ:
         *   err_msg:
         *   user_code:       // 用户的邀请码
         *   username:        // 用户昵称
         *   demo_id:         // 模拟 id
         *   real_id:         // 真实 id
         *   verified:        // 是否是真实用户
         *   realname:        // 真实名称
         *   sex:             // 性别 1 男 0 女，模拟账户都是1
         * }   
         */ 
        function getPersonalInfo(type) {
            return $http.get('/get_info', {
                params: {
                    type: type || ''
                }
            });
        }

        /**
         * Account Service 获取 user（包括 personal）信息
         * 
         * @method getUserInfo
         * @param {Object} {
         *   cros_user:     // 获取谁信息传谁的 user code
         * }
         * @return {Object} {
         *   is_succ:
         *   err_msg:
         *   username:        // 用户昵称
         *   copy_count:      // copier sum
         *   mycopy_count:    // copied trader sum
         *   copy_demo:       // personal 的模拟账户复制该账户的金额
         *   copy_real:       // personal 的真实账户复制该账户的金额
         *   sex:             // 性别 1 男 0 女，模拟账户都是1
         *   region: {
         *     world_name:    // 国家名字
         *     world_code:    // 国家编码
         *     state_name:    // 省、州名字
         *     city_name:     // 城市、区名字 
         *   }
         * }   
         */ 
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

        // 获取注册第几步
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

        /**
         * Account Service 获取国家列表
         */
        function getCountries() {
            return $http.get('/worldcode_list');
        }

        /**
         * Account Service 获取地址信息（包括所有 code）
         * 
         * @method getLocationInfo
         * return {Object} {
         *   username:
         *   world_code:
         *   world_name:
         *   state_code:
         *   state_name:
         *   city_code:
         *   city_name:
         * }    
         */
        function getLocationInfo() {
            return $http.get('/basic_settings');
        }

        function getStates(countryCode) {
            return $http.get('/statecode_list', {
                params: {
                    world_code: countryCode
                }
            });
        }

        function getCities(stateCode) {
            return $http.get('/citycode_list', {
                params: {
                    parent_code: stateCode
                }
            });
        }

        function uploadImage(file) {
            return $http.post('/upload', {
                file: file
            });
        }  
    }
})();
