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
        $scope.closeModal = closeModal;
        var userCode = passedScope.userCode;
        var copierUserCode = passedScope.copierUserCode;
        var date = passedScope.date;
        
        money.getBonusDetail(userCode, copierUserCode, date).then(function (data) {
            $scope.bonusDetails = data.data;
            $scope.$broadcast('hideLoadingImg');
        });

        function closeModal() {
            $modalInstance.dismiss();
        }
    }    
})();