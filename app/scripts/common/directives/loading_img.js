(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twLoadingImg', twLoadingImg);

    function twLoadingImg() {
        return {
            restrict: 'EA',
            replace: true,
            template: '<div class="loading_img_pnl"' + 
                      'style="position:absolute;top:0;bottom:0;left:0;right:0;z-index:1000;background:#fff;">' + 
                            '<img src="ngsrc/ajax-loading.gif"' + 
                            'style="position:absolute;top:50%;left:50%;width:60px;height:60px;margin-top:-30px;margin-left:-30px;">' + 
                        '</div>',
            link: function (scope, element, attrs) {
                scope.$on('showLoadingImg', function () {
                    $(element).css({
                        display: 'block',
                        opacity: 1
                    });
                });

                scope.$on('hideLoadingImg', function () {
                    $(element).animate({
                        opacity: 0
                    }, 500 ,function () {
                        $(this).css('display','none');
                    });
                });
            }
        }
    }
})();