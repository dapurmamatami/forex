;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twUploadImage', twUploadImage);

    twUploadImage.$inject = ['config'];

    function twUploadImage(config) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var imagePath,
                    fileInput = element.find('input'),
                    face = fileInput.attr('id');

                fileInput.fileupload({
                    url: config.apiUrl + '/upload',
                    formData: {
                        face: face
                    },
                    done: function (e, data) {
                        imagePath = JSON.parse(data.result).path;
                        
                        if ($('.upload_image__image', element).length === 1) {
                            $('.upload_image__image', element).remove();
                        }
                        element.prepend('<img class="upload_image__image" src="' + 
                                imagePath + '?timestamp=' + e.timeStamp + '" alt="**">');

                        scope.$emit('uploadImageSuccess', {
                            face: face
                        });

                    },
                    fail: function (e, data) {
                        scope.$emit('uploadImageFail', {
                            face: face
                        });
                    },
                    send: function () {
                        scope.$emit('uploadImageStart', {
                            face: face
                        });
                    }
                });
            }
        };
    }
})();