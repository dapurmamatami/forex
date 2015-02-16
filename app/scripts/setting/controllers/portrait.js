;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingPortraitController', SettingPortraitController);

    SettingPortraitController.$inject = ['$scope', '$modalInstance', 'personal'];

    function SettingPortraitController($scope, $modalInstance, personal) {
        $scope.personal = personal;
    }
})();
