;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyWithdrawStepController', MoneyWithdrawStepController);

    MoneyWithdrawStepController.$inject = ['$scope', '$modalInstance', 'money'];

    function MoneyWithdrawStepController($scope, $modalInstance, money) {
    }
})();