;
(function () {
    angular
        .module('tigerwitPersonalApp')
        .directive('twPublishBox', twPublishBox);

    function twPublishBox() {
        return {
            restrict: 'A',
            scope: {
                watchedVal: '=',
                wordLimit: '=',
                wordNum: '='
            },
            link: function (scope, element) {
                scope.wordNum = 0;
                var wordLimit

                if (scope.wordLimit) {
                    wordLimit = parseInt(scope.wordLimit);
                }

                scope.$watch('watchedVal', function (newVal, oldVal) {
                    if (newVal === oldVal) return;

                    scope.wordNum = newVal.length;    

                    if (scope.wordNum > wordLimit) {
                        scope.watchedVal = newVal.substring(0, wordLimit);
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