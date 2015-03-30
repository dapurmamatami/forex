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
                tip: '昵称长度为 4-30 位，由中文、英文以及数字组成',
                reg: /^[\u4e00-\u9fa5a-zA-Z\d]{4,20}$/
            },
            bankCardNum: {
                tip: '银行卡号码为 16-19 位数字',
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
            zh: {
                tip: "请输入中文",
                reg: /\u4e00-\u9fa5/
            },
            en: {
                tip: "请输入英文",
                reg: /a-zA-Z/
            },
            sym: {
                tip: "输入项能包含的特殊符号",
                reg: /[!@#$%^&*()_+]/
            }
        };

        var service = {
            regType: regType,
            isValidPwd: isValidPwd
        };
        return service;

        /**
         * Validator Service 验证密码是否有效
         * @method isValidPwd
         */
        function isValidPwd(str) {
            var invalidReason = '',
                counter = 0;

            if (!/^[a-zA-Z0-9!@#$%^&*()_+]{6,15}$/.test(str)) {
                invalidReason = '位数（6-15）不正确或者包含非法字符';
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
                invalidReason = '密码必须包含大写字母，小写字母，数字和符号其中两项';
            }

            if (invalidReason === '') {
                return true;
            } else {
                return false;
            }
        }
    }
})();