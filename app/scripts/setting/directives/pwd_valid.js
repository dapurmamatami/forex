;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twPwdValid', twPwdValid);

    twPwdValid.$inject = ['validator'];

    function twPwdValid(validator) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, controller) {
                controller.$parsers.push(function (viewVal) {
                    if (typeof viewVal === 'undefined') {
                        return;
                    }

                    if (validator.isValidPwd(viewVal)) {
                        controller.$setValidity('twPwdValid', true);
                        return viewVal;
                    } else {
                        controller.$setValidity('twPwdValid', false);
                        return viewVal;
                    }
                });

            }
        };
    }

})();