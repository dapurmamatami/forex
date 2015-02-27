;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twConfirmPwd', twConfirmPwd);

    function twConfirmPwd() {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, controller) {
                
                controller.$parsers.push(function (viewVal) {
                    if (typeof viewVal === 'undefined') {
                        return;
                    }

                    if (viewVal === scope.password.newPwd) {
                        controller.$setValidity('twConfirmPwd', true);
                        return viewVal;
                    } else {
                        controller.$setValidity('twConfirmPwd', false);
                        return viewVal;
                    }
                });

                scope.$watch('password.newPwd', function (newVal, oldVal) {
                    if (newVal === oldVal) {
                        return;
                    }
                    scope.password.confirmPwd = '';
                });   
                
            }
        };
    }

})();