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
            getBasicInfo: getBasicInfo,
            postLocationInfo: postLocationInfo,
            getCountries: getCountries,
            getStates: getStates,
            getCities: getCities,
            uploadImage: uploadImage,
            changePwd: changePwd,
            changePhone: changePhone,
            getSafetyInfo: getSafetyInfo
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
         * Account Service 获取基本信息
         * 
         * @method getBasicInfo
         * return {Object} {
         *   username:
         *   world_code:
         *   world_name:
         *   state_code:   // 若非中国，为 null
         *   state_name:
         *   city_code:    // 若非中国，为 null
         *   city_name:
         *   desc:         //个性签名
         * }    
         */
        function getBasicInfo() {
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

        /**
         * Account Service 提交地址信息
         * 
         * @method postLocationInfo
         * return {Object} {
         * }    
         */
        function postLocationInfo(sexCode, location, inputRegion, signature) {
            return $http.post('/basic_settings', {
                sex: sexCode,
                world_code: location.country.code,
                state_code: location.state.code || inputRegion.stateName || null,
                city_code: location.city.code || inputRegion.cityName || null,
                desc: signature || null       
            });
        } 

        function uploadImage(file) {
            return $http.post('/upload', {
                file: file
            });
        }

        /**
         * Account Service 修改密码
         * 
         * @method changePwd
         * return {Object} {
         * }    
         */
        function changePwd(oldPwd, newPwd) {
            return $http.post('/change_password', {
                password: oldPwd,
                new_pwd: newPwd
            });
        }

         /**
         * Account Service 修改手机号码
         * @param
         * @method changePhone
         * return {Object} {
         * }    
         */
        function changePhone(oldNumber, password, token, newNumber, verifyCode) {

            if (oldNumber === null && password === null) {
                
                // 修改手机的第二步
                return $http.post('/change_phone', {
                    token: token,
                    new_phone: newNumber,
                    verify_code: verifyCode
                });
            } else {

                // 修改手机的第一步
                return $http.post('/change_phone', {
                    current_phone: oldNumber,
                    password: password
                });
            }

        }

        /**
         * Account Service 获取账户安全信息
         * 
         * @method getSafetyInfo
         * return {Object} {
         *   login_password:
         *   phone_number:      // 是否认证手机
         *   phone:             // 认证的手机号 
         *   email_addr:        // 是否认证邮箱
         *   email:             // 认证的邮箱
         *   real_name:         // 是否实名认证
         *   level:             // 安全级别：high、medium、low
         *      
         * }    
         */  
        function getSafetyInfo() {
            return $http.get('/security_settings');
        }
    }
})();
