(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('validator', validator);

    validator.$inject = ['$window'];

    function validator($window) {
        var validateFuns = {
            regTypes: {
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
            },

            /*
             *text 书写规则: text:en-zh-num, 是"或"的关系, 且仅有
             */
            /*text: function (str, type) {
                var textTypes = type.split(":")[1];
                var textTypeList = textTypes.split("-");

                var regStr = "";
                textTypeList.forEach(function (item) {
                    regStr += '' + (validateFuns.regTypes[item].reg || '');
                });
                var textRegStr = "[" + regStr + "]";
                var antiTextRegStr = "[^" + regStr + "]";
                // trim string
                var textReg = new RegExp(textRegStr);
                var antiTextReg = new RegExp(antiTextRegStr);
                var validateResult = textReg.test(str) && !antiTextReg.test(str);

                var validateReason = "";
                if (!validateResult) {
                    if (antiTextReg.test(str)) {
                        validateReason = "输入项只能包含";
                        textTypeList.forEach(function (item) {
                            validateReason += '' + (validateFuns.regTypes[item].type);
                        });
                    }
                }

                if (/\s/.test(str)) {
                    validateResult = false;
                    validateReason = "请勿包含空格";
                }

                return {
                    validate_reason: validateReason,
                    validate_result: validateResult
                };
            },*/

            /*
             *密码验证：6-15位字符，可由大写字母，小写字母，数字，符号组成，且至少包含其中2项
             */
            password: function (str) {

                var typeCounter = 0;
                if (str.search(/\d/) != -1) {
                    typeCounter += 1;
                }

                if (str.search(/[a-z]/) != -1) {
                    typeCounter += 1;
                }

                if (str.search(/[A-Z]/) != -1) {
                    typeCounter += 1;
                }

                if (str.search(/[!@#$%^&*()_+]/) != -1) {
                    typeCounter += 1;
                }

                var hasBadChar = false;
                if (str.search(/[^a-zA-Z0-9!@#$%^&*()_+]/) !=-1) {
                    hasBadChar = true;
                }

                var validateReason = "";
                var validateResult = true;
                if (typeCounter < 2) {
                    validateReason = "密码必须包含大写字母，小写字母，数字和符号其中两项";
                    validateResult = false;
                }

                if (hasBadChar){
                    validateReason = "包含非法输入项";
                    validateResult = false;
                }

                return {
                    validate_reason: validateReason,
                    validate_result: validateResult
                };
            }
            /*phone: function (str) {
                var phoneReg = new RegExp(this.regTypes.phone.reg);
                var validateReason = "";
                var validateResult = phoneReg.test(str);
                if (!validateResult) {
                    validateReason = this.regTypes.phone.tips;
                }

                return {
                    validate_reason: validateReason,
                    validate_result: validateResult
                };
            },
            money: function (str) {
                var moneyReg = new RegExp(this.regTypes.money.reg);
                var validateReason = "";
                var validateResult = moneyReg.test(str);
                if (!validateResult) {
                    validateReason = this.regTypes.money.tips;
                }

                if (/\s/.test(str)) {
                    validateResult = false;
                    validateReason = "请勿包含空格";
                }

                return {
                    validate_reason: validateReason,
                    validate_result: validateResult
                };
            },
            email: function (str) {
                var emailReg = new RegExp(this.regTypes.email.reg);
                var validateReason = "";
                var validateResult = emailReg.test(str);
                if (!validateResult) {
                    validateReason = this.regTypes.email.tips;
                }

                if (/\s/.test(str)) {
                    validateResult = false;
                    validateReason = "请勿包含空格";
                }

                return {
                    validate_reason: validateReason,
                    validate_result: validateResult
                };
            }*/
        };
        
        var service = {
            validateFuns: validateFuns,
        };
        return service;
    }
})();