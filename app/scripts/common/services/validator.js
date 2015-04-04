(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('validator', validator);

    validator.$inject = ['$window'];

    function validator($window) {
        
        var regType = {
            idNumber: {
                tip: '身份证号为 15 或 18 位数字，最后一位为字母时用大写 X',
                reg: /(^\d{15}$)|(^\d{17}([0-9]|X)$)/
            },
            username: {
                tip: '4-20 个字符，由中文、英文、数字以及符号组成，符号为 ~!@#$%^&*()_+',
                pattern: '^[\\u4e00-\\u9fa5a-zA-Z\\d~!@#$%^&*()_+～！＠＃＄％＾＆＊（）＿＋]*$', // 符号包括全角
                ptnMagnify: '[\\u4e00-\\u9fa5～！＠＃＄％＾＆＊（）＿＋]' // 需要加大长度的字符
            },
            bankCardNum: {
                tip: '银行卡卡号为 16-19 位数字',
                reg: /^\d{16,19}$/
            },
            phone: {
                tip: '手机号码为 1 开头的 11 位数字',
                reg: /^1\d{10}$/
            },
            email: {
                tip: '请输入正确的邮箱名，邮箱前缀由英文数字、下划线、减号、点组成，以英文数字结尾',
                reg: /^\w+([-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
            },
            amount: {
                tip: '输入的金额格式不正确。金额为大于零的整数或者小数（小数点后最多两位数字）',
                //reg: '(^0\\.[0-9]{1,2}$)|(^[1-9][0-9]*\\.[0-9]{1,2}$)|(^[1-9][0-9]*$)'   
                reg: /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/
            },
            password: {
                tip: '6-15 个字符，可由大写字母、小写字母、数字、符号（~!@#$%^&*()_+）组成，且至少包含其中2项'
            },
            dbcs: {
                tip: '双字节字符', // 包括汉字
                reg: /[^\x00-\xff]/,
                pattern: '[^\\x00-\\xff]'
            },
            'zh-cn': {
                tip: "简体中文",
                reg: /[\u4e00-\u9fa5]/
            },
            en: {
                tip: "请输入英文",
                reg: /a-zA-Z/
            },
            sym: {
                tip: "合法的特殊符号",
                reg: /[!@#$%^&*()_+]/
            }
        };

        var service = {
            regType: regType,
            isValidPwd: isValidPwd,
            isValidTxt: isValidTxt
        };
        return service;

        /**
         * Validator Service 验证密码是否有效
         * 
         * @method isValidPwd
         */
        function isValidPwd(str) {
            var invalidMsg = '',
                counter = 0;

            if (!/^[a-zA-Z0-9!@#$%^&*()_+]{6,15}$/.test(str)) {
                invalidMsg = '位数（6-15）不正确或者包含非法字符';
            }

            if (str.search(/\d/) != -1) {
                counter += 1;
            }

            if (str.search(/[a-z]/) != -1) {
                counter += 1;
            }

            if (str.search(/[A-Z]/) != -1) {
                counter += 1;
            }

            if (str.search(/[!@#$%^&*()_+]/) != -1) {
                counter += 1;
            }

            if (counter < 2) {
                invalidMsg = '密码必须包含大写字母，小写字母，数字和符号其中两项';
            }

            if (invalidMsg === '') {
                return true;
            } else {
                return false;
            }
        }

        /**
         * Validator Service 验证输入的文本是否有效         
         * 
         * @method isValidTxt
         * @param {String} inputStr 手输文本
         * @param {String} pattern RegExp 的 pattern，匹配可输入的字符
         * @param {String} ptnMagnify 匹配需要加大长度的字符，如汉字长度变为 2 或 3
         * @param {Number} rate 需要加大长度的字符长度加大到多少（2 或 3）   
         * @param {Number} minLen maxLen 最小长度和最大长度
         */
        function isValidTxt(inputStr, pattern, ptnMagnify, rate, minLen, maxLen) {
            var length,
                tmpLen,
                reg,
                regMagnify, 
                invalidMsg = '';

            reg = new RegExp(pattern, 'g');    
            regMagnify = new RegExp(ptnMagnify, 'g');

            if (!reg.test(inputStr)) {
                invalidMsg = '包含非法字符';
                return false;
            }

            length = inputStr.replace(regMagnify, '**').length;

            if (length < minLen || length > maxLen) {
                invalidMsg = '字符数不符合要求';
                return false;
            }
            
            if (invalidMsg === '') {
                return true;
            }
        }
    }
})();