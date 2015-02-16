(function () {
    'use strict';

    angular
    .module('tigerwitPersonalApp')
    .directive('twCropImage', twCropImage);

    function twCropImage() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                
                scope.$watch('personal', function (newVal, oldVal) {
                    if (!newVal) {
                        return;
                    }
                    var image = $(element).find('.upload_portrait__image');

                    image.cropper({
                        aspectRatio: 1,
                        data: {
                            width: 150,
                            height: 150
                        },
                        resizable: false,
                        zoomable: false,
                        dragCrop: false,
                        preview: '.upload_portrait__preview',
                        done: function(data) {
                            //console.info(image.cropper('getData', true));
                        }
                    });
                }, true);
            }
        };
    }
})();