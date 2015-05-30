;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyBonusDetailController', MoneyBonusDetailController);

    MoneyBonusDetailController.$inject = ['$scope', '$modalInstance', 'money',
            'passedScope'];

    function MoneyBonusDetailController($scope, $modalInstance, money, passedScope) {
        $scope.bonusDetails = [];
        var userCode = passedScope.userCode;
        var copierUserCode = passedScope.copierUserCode;
        
        money.getBonusDetail(userCode, copierUserCode).then(function (data) {
            console.info(data);
            $scope.bonusDetails = data.data;
        });
    }    
})();