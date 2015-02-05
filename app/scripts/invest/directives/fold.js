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
                    var string = $(this).text();
                    var ul = $(this).parents('li').find('ul');
                    
                    if (string === '折叠') {
                        $(this).html('显示全部');
                    } else {
                        $(this).html('折叠');
                    }
                    
                    if (ul.css('display') === 'block') {
                        ul.animate({
                            opacity: 0
                        }, 500, function () {
                            $(this).css('display','none');
                        });
                    } else {
                        ul.css({
                            display: 'block',
                            opacity: 1
                        });
                    }
                });
            }
        };
    }
})();