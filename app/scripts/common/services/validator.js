(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('validator', validator);

    validator.$inject = ['$window'];

    function validator($window) {
        
        var regTypes = {
            'idNumber': {
                tips: '身份证号为 15 或 18 位数字，最后一位为字母时用大写 X',
                reg: '(^\d{15}$)|(^\d{17}([0-9]|X)$)'
            },
            'phone': {
                tips: "请输入正确的手机号",
                reg:'^(?:\\+86)?(1[0-9]{10}$)'
            },
            'email': {
                tips: '请输入正确的邮箱名，邮箱前缀由英文数字、下划线、减号、点组成，以英文数字结尾',
                reg:'^\\w+([-.]\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$'
            },
            'money': {
                tips: '请输入正确的金额，只能为小数或者整数，小数点后最多两位小数',
                //reg: '(^0\\.[0-9]{1,2}$)|(^[1-9][0-9]*\\.[0-9]{1,2}$)|(^[1-9][0-9]*$)'   
                reg: '^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$'
            },
            'num': {
                tips: '输入项不能包含数字',
                type: '数字',
                reg: '0-9'
            },
            'zh': {
                tips: "输入项不能包含中文",
                type: '中文',
                reg: '\\u4e00-\\u9fa5·'
            },
            'en': {
                tips: "输入项不能包含英文",
                type: '英文',
                reg: 'a-zA-Z'
            },
            'sym': {
                tips: "输入项不能包含特殊符号",
                type: "特殊符号",
                reg: '[!@#$%^&*()_+]'
            }
        };

        var service = {
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