;
(function () {
    angular
        .module('tigerwitPersonalApp')
        .directive('twPublishBox', twPublishBox);

    function twPublishBox() {
        return {
            restrict: 'A',
            scope: {
                ngModel: '=',
                wordLimit: '=',
                wordNum: '='
            },
            link: function (scope, element) {
                scope.wordNum = 0;
                var wordLimit,
                    length;

                if (scope.wordLimit) {
                    wordLimit = parseInt(scope.wordLimit);
                }

                scope.$watch('ngModel', function (newVal, oldVal) {
                    if (newVal === oldVal) return;

                    scope.wordNum = newVal.replace(/[\u4e00-\u9fa5]/g, '**').length;    

                    if (scope.wordNum > wordLimit) {
                        length = newVal.length;
                        scope.ngModel = newVal.substring(0, length - 1);
                    }
                });

                element.keydown(function (event) {
                    if (event.keyCode === 13) {
                        event.preventDefault();
                    }
                });
            }
        };
    }
})();