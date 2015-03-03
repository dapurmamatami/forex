;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingAvatarController', SettingAvatarController);

    SettingAvatarController.$inject = ['$scope', '$modalInstance', 'personal'];

    function SettingAvatarController($scope, $modalInstance, personal) {
        $scope.personal = personal;
    }
})();
