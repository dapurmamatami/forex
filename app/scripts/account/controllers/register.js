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
        /*
         * 表单第一步的数据模型
         */
        $scope.name = '';
        $scope.idNumber = '';
        $scope.idNumberCheck = {
            success: false,
            existence: false,
            valid: false
        }; 
        $scope.forkCode = null;
        $scope.submitFormStep1 = submitFormStep1;
        $scope.validate = validate;

        /*
         * 表单第二步的数据模型
         */
        












        function submitFormStep1() {
            account.checkNumberExistence($scope.idNumber).then(function (data) {
                $scope.idNumberCheck.success = data.is_succ;

                if ($scope.idNumberCheck.success) {
                    $scope.idNumberCheck.existence = data.data;

                    if ($scope.idNumberCheck.existence) {
                        return;
                    }
                    account.setInfo($scope.name, $scope.idNumber, $scope.forkCode).
                            then(function (data) {
                        $scope.idNumberCheck.valid = data.is_succ;
                        if ($scope.idNumberCheck.valid) {
                            $scope.step += 1;
                        }
                    });
                }
            });
        }

        function validate() {
           $scope.idNumberCheck.valid = true;
           $scope.idNumberCheck.existence = false;
        }
    }
})();