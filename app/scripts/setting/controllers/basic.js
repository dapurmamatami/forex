(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingBasicController', SettingBasicController);

    SettingBasicController.$inject = ['$scope', 'account'];

    function SettingBasicController($scope, account) {
        $scope.countries = [];
        $scope.region = {
            countryCode: '',
            countryNameCN: '',
            stateCode: '',
            stateNameCN: '',
            cityCode: '',
            cityNameCN: ''
        };

        account.getRegionInfo().then(function (data) {
            if (!data.is_succ) {
                return;
            }
            $scope.region.countryCode = data.world_code;
            $scope.region.countryNameCN = data.world_name;
            $scope.region.stateCode = data.state_code;
            $scope.region.stateNameCN = data.state_name;
            $scope.region.cityCode = data.city_code;
            $scope.region.cityNameCN = data.city_name;
        });
        account.getCountries().then(function (data) {
            if (!data.is_succ) {
                return;
            }
            $scope.countries = data.data;
        });
    }
})();