;
(function () {
    angular
        .module('tigerwitPersonalApp')
        .directive('twTextarea', twTextarea);

    function twTextarea() {
        return {
            restrict: 'A',
            replace: true
        };
    }
})();