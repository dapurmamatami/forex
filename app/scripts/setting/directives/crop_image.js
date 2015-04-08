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
                scope.sizeLimit = true;
                scope.support = true;
                var MAX_SIZE = 2;   
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
                    var fileSize = this.files[0].size / (1024 * 1024);

                    if (fileSize > MAX_SIZE) {
                        scope.sizeLimit = false;
                    } else {
                        scope.sizeLimit = true;
                        image.cropper('replace', window.URL.createObjectURL(this.files[0]));
                    }
                });
                
            }
        };
    }
})();