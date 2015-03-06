;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twAmountValid', twAmountValid);

    /*
     * 自定义表单验证
     *
     * 验证输入的金额是否满足最大值或者最小值的要求
     * 需要与其他验证规则共同使用
     */
    function twAmountValid() {
        return {
            require: '?ngModel',
            scope: {
                minAmount: '=',
                maxAmount: '='
            },
            link: function (scope, element, attrs, controller) {
                if (!controller) return;
                var REG = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;

                controller.$parsers.push(function (viewVal) {

                    // 如果其他验证规则（required、pattern）报错，则该验证规则不报错
                    if (typeof viewVal === 'undefined' || !REG.test(viewVal)) {
                        controller.$setValidity('twAmountValid', true);
                        return viewVal;
                    }

                    // 有最小值限制
                    if (typeof scope.minAmount !== 'undefined') {

                        if (parseFloat(viewVal) >= parseFloat(scope.minAmount)) {
                            controller.$setValidity('twAmountValid', true);
                            return viewVal;
                        } else {
                            controller.$setValidity('twAmountValid', false);
                            return viewVal;
                        }
                    }

                    // 有最大值限制
                    if (typeof scope.maxAmount !== 'undefined') {

                        if (parseFloat(viewVal) <= parseFloat(scope.maxAmount)) {
                            controller.$setValidity('twAmountValid', true);
                            return viewVal;
                        } else {
                            controller.$setValidity('twAmountValid', false);
                            return viewVal;
                        }
                    }

                });
            }
        };
    }
})();