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
                        imagePath = data.path;
                        
                        if ($('.upload_form__image', element).length === 1) {
                            $('.upload_form__image', element).remove();
                        }
                        element.append('<img class="upload_form__image" src="' + 
                                imagePath + '">');

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