;
(function () {
    angular
        .module('tigerwitPersonalApp')
        .directive('twPublishBox', twPublishBox);

    twPublishBox.$inject = ['validator'];    

    function twPublishBox(validator) {
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                ngModel: '=',
                wordLimit: '=',
                wordNum: '=',
            },
            link: function (scope, element, attrs, controller) {
                scope.wordNum = 0;
                var wordLimit,
                    wordNum,
                    dbcsReg = new RegExp(validator.regType.dbcs.pattern, 'g');

                if (typeof controller === 'undefined') return;
                    
                if (scope.wordLimit) {
                    wordLimit = parseInt(scope.wordLimit);
                } else {
                    return;
                }

                scope.$watch('ngModel', function (newVal, oldVal) {
                    if (newVal === oldVal) return;
                    scope.wordNum = newVal.replace(dbcsReg, '**').length;
                });

                
                controller.$parsers.push(function (viewVal) {
                    
                    wordNum = viewVal.replace(dbcsReg, '**').length;

                    if (wordNum > wordLimit) {
                        element.parent().find('.publish_box__word_limit').css('color', '#cc3300');
                        controller.$setValidity('twPublishBox', false);
                        // not return undefined is for $watch function
                        return viewVal;
                    } else {
                        element.parent().find('.publish_box__word_limit').css('color', '#909090');
                        controller.$setValidity('twPublishBox', true);
                        return viewVal;
                    }
                });


                /*scope.$watch('ngModel', function (newVal, oldVal) {
                    if (newVal === oldVal) return;

                    scope.wordNum = newVal.replace(dbcsReg, '**').length;    

                    if (scope.wordNum > wordLimit) {
                        scope.ngModel = newVal.substring(0, newVal.length - 1);
                    }
                });*/

                element.keydown(function (event) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                    }
                });
            }
        };
    }
})();