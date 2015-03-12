;
(function () {
    'use strict';

    angular
    .module('tigerwitPersonalApp')
    .directive('twCropImage', twCropImage);


    // 上传头像功能使用该指令，上传裁剪生成的 base64
    function twCropImage() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                scope.imgDataUrl = '';
                scope.support = true;   
                var image = $(element).find('#image');
                var input = $(element).find('#input');

                if (Object.prototype.toString.call(window.URL) !== '[object Function]') {
                    scope.support = false;
                    return;
                }

                scope.$watch('personal', function (newVal) {
                    if (!newVal) return;

                    image.cropper({
                        aspectRatio: 1,
                        data: {
                        },
                        minWidth: 150,
                        minHeight: 150,
                        resizable: true,
                        zoomable: false,
                        dragCrop: false,
                        preview: '#imgPreview',
                        done: function(data) {
                            scope.imgDataUrl = image.cropper('getDataURL');
                        }
                    });
                }, true);

                
                input.bind('change', function () {
                    image.cropper('replace', window.URL.createObjectURL(this.files[0]));
                });
                
            }
        };
    }
})();