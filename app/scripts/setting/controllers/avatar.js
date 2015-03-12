;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingAvatarController', SettingAvatarController);

    SettingAvatarController.$inject = ['$scope', '$modalInstance', 'personal', 'account'];

    function SettingAvatarController($scope, $modalInstance, personal, account) {
        $scope.personal = personal;
        $scope.uploadImg = uploadImg;

        function uploadImg() {
            console.info($scope.imgDataUrl);
            account.uploadAvatar($scope.imgDataUrl).then(function (data) {

                if (data.is_succ) {
                    $scope.personal.lgAvatar = $scope.imgDataUrl;
                }
            });
        }
    }
})();
