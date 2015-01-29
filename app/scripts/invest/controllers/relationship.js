(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestRelationshipController', InvestRelationshipController);

    InvestRelationshipController.$inject = ['$scope', 'relationship'];

    function InvestRelationshipController($scope, relationship) {
        $scope.users = [];
        $scope.relationType = 'copiedTrader'; // 'copiedTrader', 'copier', 'following', 'fan'
        $scope.switchType = switchType;
        $scope.getUsers = getUsers;

        relationship.getCopiedTraders().then(function (data) {
            $scope.users = data.data;
            /*$scope.users = [{
                username: 'wxlWorkHard',
                user_code: '1203',
                total_profit_rate: '90.56',
                copy_copiers_count: 1
            },{
                username: 'Ak王df',
                user_code: '1204',
                total_profit_rate: '60.56',
                copy_copiers_count: 20
            }];     */      
            var  userCodes = [];

            if ($scope.users.length <= 0) {
                return;
            } 

            angular.forEach($scope.users, function (user) {
                this.push(user.user_code);
            }, userCodes);
            
            relationship.getFansSum(userCodes).then(function (data) {   
                angular.forEach(data.data, function (item) {
                    
                    angular.forEach($scope.users, function (user) {

                        if (user.user_code === item.user_code) {
                            user.fans_count = item.fans_count;
                        }
                    });       

                });
            });

        });

        function switchType(relationType) {
            $scope.relationType = relationType;
        }

        function getUsers(relationType) {
            $scope.relationType = relationType;
            var tmp;
            switch (relationType) {
                case 'copiedTrader':
                    tmp = relationship.getCopiedTraders();
                    break;
                case 'copier':
                    tmp = relationship.getCopiers();
                    break;
                default:
                    break;
            }
            tmp.then(function (data) {
                console.info(data);
            });
        }

    }

})();