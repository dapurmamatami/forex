;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twConfirmPwd', twConfirmPwd);

    /* 
     * 自定义表单验证 
     *
     * 要两次输入密码的情况，确认第二次输入的密码是否与第一次的相同    
     */
    function twConfirmPwd() {
        return {
            require: 'ngModel',
            scope: {
                password: '='
            },
            link: function (scope, element, attrs, controller) {
                
                controller.$parsers.push(function (viewVal) {
                    
                    if (typeof viewVal === 'undefined' || typeof scope.password === 'undefined') {
                        controller.$setValidity('twConfirmPwd', true);
                        return viewVal;
                    }

                    if (viewVal === scope.password) {
                        controller.$setValidity('twConfirmPwd', true);
                        return viewVal;
                    } else {
                        controller.$setValidity('twConfirmPwd', false);
                        return undefined;
                    }
                });
            }
        };
    }

})();