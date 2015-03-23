(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twDropdown', twDropdown);

    twDropdown.$inject = ['$document'];

    function twDropdown($document) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.dropdownShow = false;
                scope.toggleDropdown = toggleDropdown;

                element.on('click', 'a', function () {
                    scope.dropdownShow = false;
                });

                $document.bind('click', function (event) {
                    var isClickeElementChildOfPopup = element.find(event.target).length > 0;
                    if (isClickeElementChildOfPopup) return;
                    scope.dropdownShow = false;
                    scope.$apply();
                });

                function toggleDropdown() {
                    scope.dropdownShow = !scope.dropdownShow;
                }
            }
        };
    }
})();