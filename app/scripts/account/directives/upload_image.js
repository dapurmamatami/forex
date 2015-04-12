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
                        console.info(data);
                        imagePath = '../ngsrc/man.png';
                        
                        if ($('.upload_image__image', element).length === 1) {
                            $('.upload_image__image', element).remove();
                        }
                        element.prepend('<img class="upload_image__image" src="' + 
                                imagePath + '" alt="**">');

                        scope.$emit('uploadImageSuccess', {
                            face: face
                        });

                    },
                    fail: function (e, data) {
                        console.info(e);
                        console.info(data);
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