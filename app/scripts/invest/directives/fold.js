(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twFold', twFold);

    twFold.$inject = [];

    function twFold() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                element.on('click', function () {
                    var ul = $(this).parents('li').find('ul');

                    $(this).toggleClass('closed');
                    
                    if (ul.css('display') === 'block') {
                        /*ul.animate({
                            opacity: 0
                        }, 500, function () {
                            $(this).css('display','none');
                        });*/
                        ul.css('display', 'none');
                    } else {
                        ul.css('display', 'block');
                    }
                });
            }
        };
    }
})();