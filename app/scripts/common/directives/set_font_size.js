;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twSetFontSize', twSetFontSize);

    function twSetFontSize() {
        return {
            restrict: 'A',
            scope: {
                watchedVal: '='
            },
            link: function (scope, element) {
                var content = element.find('span');
                var fontSize = parseInt(content.css('font-size'));

                scope.$watch('watchedVal', function (newVal, oldVal) {

                    if (newVal === oldVal) {
                        return;
                    }

                    setFontSize(element, content);
                });


                function setFontSize(container, content) {

                    if (container.width() < content.width()) {
                        fontSize--;
                        content.css('font-size', fontSize);

                        setFontSize(container, content);
                    }
                }
                
            }
        };
    }
})();