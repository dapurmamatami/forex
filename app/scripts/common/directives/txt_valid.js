;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twTxtValid', twTxtValid);

    twTxtValid.$inject = ['validator'];

    /* 
     * 自定义表单验证 
     *
     * 验证输入的 username 是否符合格式要求
     */
    function twTxtValid(validator) {
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                propName: '=',
                minLen: '=',
                maxLen: '='
            },
            link: function (scope, element, attrs, controller) {
                var propName = scope.propName,
                    minLen = scope.minLen,
                    maxLen = scope.maxLen,
                    pattern = validator.regType[propName].pattern,
                    dbcsPtn = validator.regType.dbcs.pattern;

                controller.$parsers.push(function (viewVal) {

                    if (typeof viewVal === 'undefined') {
                        controller.$setValidity('twTxtValid', true);
                        return undefined;
                    }

                    if (validator.isValidTxt(viewVal, pattern, dbcsPtn,
                            minLen, maxLen)) {
                        controller.$setValidity('twTxtValid', true);
                        return viewVal;
                    } else {
                        controller.$setValidity('twTxtValid', false);
                        return undefined;
                    }
                });

            }
        };
    }
})();