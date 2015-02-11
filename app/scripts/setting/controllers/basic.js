(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingBasicController', SettingBasicController);

    SettingBasicController.$inject = ['$scope', 'account'];

    function SettingBasicController($scope, account) {
        $scope.countries = [];
        $scope.myCountry = {
            nameEN: '',
            nameCN: '',
            code:''
        };
        account.getCountries().then(function (data) {
            console.info(data);
        });
    }
})();