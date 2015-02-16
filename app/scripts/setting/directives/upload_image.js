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
                var fileUpload = $(element);
                fileUpload.fileupload({
                    url: config.apiUrl + '/upload_avatar'
                });
            }
        };
    }
})();