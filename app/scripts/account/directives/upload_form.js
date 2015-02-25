(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twUploadForm', twUploadForm);

    twUploadForm.$inject = ['$window', '$timeout', 'config'];

    function twUploadForm($window, $timeout, config) {
        return {
            restrict: 'A',
            replace: false,
            link: function (scope, element, attrs) {
                var uploader = $window.WebUploader.create({
                    auto: true,
                    compress: false,
                    swf: 'base/webuploader-0.1.5/Uploader.swf',
                    server: config.apiUrl + '/upload',
                    pick: element[0], //????/
                    accept: {
                        title: 'Images',
                        extensions: 'jpg,jpeg,png',
                        mimeTypes: 'images/*'
                    },
                    formData: {
                        face: attrs.face
                    }
                });

                uploader.on('startUpload', function () {
                    scope.$emit('uploadFormStart', {
                        face: attrs.face
                    });
                });

                uploader.on('uploadSuccess', function (data, response) {
                    var imagePath = response.path;

                    if ($('.upload_form__image', element).length === 1) {
                        $('.upload_form__image', element).remove();
                    }
                    element.append('<img class="upload_form__image" src="' + 
                            imagePath + '">');
                    
                    scope.$emit('uploadFormSuccess', {
                        face: attrs.face
                    });
                });

                uploader.on('uploadError', function (error) {
                    scope.$emit('uploadFormError', {
                        face: attrs.face
                    });
                });

                uploader.on('error', function (error) {
                    $timeout(function () {
                        scope.$emit('uploadFormTypeError', {
                            face: attrs.face
                        });
                    }, 300);
                });
            }
        };
    }
})();