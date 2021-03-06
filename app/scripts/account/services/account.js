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
            checkExist: checkExist,
            submitQuest: submitQuest,
            getBasicInfo: getBasicInfo,
            postLocationInfo: postLocationInfo,
            getCountries: getCountries,
            getStates: getStates,
            getCities: getCities,
            uploadImage: uploadImage,
            uploadAvatar: uploadAvatar,
            changePwd: changePwd,
            changePhone: changePhone,
            changeEmail: changeEmail,
            getSafetyInfo: getSafetyInfo,
            sendEmail: sendEmail,
            getVerifyCode: getVerifyCode,
            login: login,
            logout: logout,
            registerDemo: registerDemo,
            registerLeads: registerLeads,
            verifyCode: verifyCode,
            setNewPwd: setNewPwd,
            encrypt: encrypt
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

        // 注册真实账户时提交的真实姓名和身份证号
        function setInfo(realName, idNumber, forkCode) {
            return $http.post('/set_info', {
                real_name: realName,
                id_no: idNumber,
                fork_code: forkCode
            });
        }

        /**
         * Account Service 检查号码、昵称是否已存在
         *
         * @method checkExist
         * @param {String} number 可以是手机号、电子邮箱、身份证号码
         * @param {String} username 昵称
         */
        function checkExist(number, username) {
            return $http.get('/exists', {
                params: {
                    key: number,
                    username: username
                }
            });
        }

        /**
         * Account Service 获取注册真实账户的步骤
         *
         * @method getStepInfo
         * @param type:    //'ReliableInformation' or 'idPicInformation'
         */
        function getStepInfo(type) {
            return $http.get('/get_info_progress', {
                params: {
                    type: type    
                }
            });
        }

        /**
         * Account Service 提交问卷（风险调查）
         *
         * @method submitQuest
         * @param 
         */
        function submitQuest(employment, income, experience) {
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
         * @return {Object} {
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
         * @return {Object} {
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
         * Account Service 上传头像
         * 
         * @method uploadAvatar   
         */
        function uploadAvatar(imgDataUrl) {
            return $http.post('/upload_avatar', {
                file: imgDataUrl
            });
        }

        /**
         * Account Service 修改密码
         * 
         * @method changePwd
         * @return {Object} {
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
         *
         * @param
         * @method changePhone
         * @return {Object} {
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
         * Account Service 修改电子邮件
         *
         * @param
         * @method changeEmail
         * @return {Object} {
         * }    
         */
        function changeEmail(oldNumber, password, token, newNumber) {
            
            if (oldNumber === null && password === null) {
                return $http.post('/change_email', {
                    token: token,
                    new_mail: newNumber
                });
            } else {
                return $http.post('/change_email', {
                    current_mail: oldNumber,
                    password: password
                });
            }
        }

        /**
         * Account Service 获取账户安全信息
         * 
         * @method getSafetyInfo
         * @return {Object} {
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

        /**
         * Account Service 发邮件
         * 
         * @method sendEmail
         */  
        function sendEmail() {
            return $http.post('/send_mail');
        }

        /**
         * Account Service 获取手机验证码
         * 
         * @method getVerifyCode
         * @existence {Boolean} 给存在的手机还是不存在的手机发验证码
         */ 
        function getVerifyCode(phone, existence) {
            return $http.get('/verify', {
                params: {
                    phone: phone,
                    exists: existence
                }
            });
        }

        /**
         * Account Service 登陆
         * 
         * @method login
         */ 
        function login(id, password) {
            return $http.post('/login', {
                phone: id,
                password: password
            });
        }

        /**
         * Account Service 登出
         * 
         * @method logout
         */ 
        function logout() {
            return $http.get('/logout');
        }

        /**
         * Account Service 注册模拟账户
         * 
         * @method registerDemo
         */  
        function registerDemo(username, phone, verifyCode, email, password, 
                forkCode, lp, pid, unit, key) {
            
            return $http.post('/register', {
                username: username,
                phone: phone,
                verify_code: verifyCode,
                email: email,
                password: password,
                fork_code: forkCode,
                lp: lp,
                pid: pid,
                unit: unit,
                key: key
            });
        }

        /**
         * Account Service 统计通过 landing page 注册的用户   
         */

        function registerLeads(username, phone, email, lp, pid, unit, key) {

            return $http.post('/statistics_register', {
                username: username,
                phone: phone,
                email: email,
                lp: lp,
                pid: pid,
                unit: unit,
                key: key
            });
        }

        /**
         * Account Service 检查验证码是否正确
         * 忘记密码功能的第一步用到
         * 
         * @method verifyCode
         */
        function verifyCode(phone, verifyCode) {
            return $http.post('/verifycode', {
                phone: phone,
                verify_code: verifyCode
            });
        }

        /**
         * Account Service 设置新密码
         * 忘记密码功能的第二步用到
         * 
         * @method setNewPwd
         */
        function setNewPwd(phone, verifyCode, newPwd) {
            return $http.post('/change_password', {
                phone: phone,
                code: verifyCode,
                new_pwd: newPwd
            });
        }

        /**
         * Account Service 加密
         * 
         * @method encrypt
         */
        function encrypt(text) {
            return $http.get('/files/pub_v1.json').then(function (data) {
                var crypt = new JSEncrypt();
                var key = data;
                crypt.setKey(key);
                var enc = crypt.encrypt(text);
                return enc;
            });
        }
    }
})();
