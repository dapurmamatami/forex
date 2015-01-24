(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountRegisterController', AccountRegisterController);

    AccountRegisterController.$inject = ['$scope', '$window', '$location', '$state', '$timeout',
            '$interval', '$modal', 'account', 'config', 'validator'];

    function AccountRegisterController($scope, $window, $location, $state, $timeout, $interval,
            $modal, account, config, validator) {
        $scope.step = 1;
        $scope.name = '';
        $scope.idNumber = '';
        $scope.idNumberExist = false;
        $scope.idNumberReady = false; // 查询数据库，数据返回后为 true
        $scope.forkCode = null;
        $scope.submitFormStep1 = submitFormStep1;
        $scope.checkExistence = checkExistence;

        function submitFormStep1() {
            account.setInfo($scope.name, $scope.idNumber, $scope.forkCode).
                    then(function (data) {
                console.info(data);
                $scope.step += 1;
            });
        }

        function checkExistence() {
            account.checkExistence($scope.idNumber, '').then(function (data) {
                console.info(data);
                // if idNumber 存在 $scope.idNumberExist = true;
                // if idNumber 不存在 $scope.idNumberExist = false; 同时 $scope.idNumberReady = true;
                $scope.idNumberReady = true;
            });
        }
    }
})();