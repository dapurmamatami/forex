(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestRelationshipController', InvestRelationshipController);

    InvestRelationshipController.$inject = ['$scope', 'relationship'];

    function InvestRelationshipController($scope, relationship) {
        $scope.users = [];
        $scope.relationType = '';   // 'copiedTrader', 'copier', 'following', 'fan'
        $scope.noMoreUsers = false;
        $scope.copiedTraderSum = 0;
        $scope.copierSum = 0;
        $scope.followingSum = 0;
        $scope.fanSum = 0;             
        $scope.getUsers = getUsers;
        $scope.getMoreUsers = getMoreUsers;
        var lastId = -1;
        var count = 1;              //单页 user 数
        getUsers('copiedTrader');
    
        
        /*
         * 根据 relationType 获取用户列表（data.data）赋值给 $scope.users
         */
        function getUsers(relationType) {
            $scope.relationType = relationType;
            $scope.noMoreUsers = false;
            var tmp;
            
            switch (relationType) {
                case 'copiedTrader':
                    relationship.getCopiedTraders().then(function (data) {
                        $scope.users = data.data;
                        $scope.copiedTraderSum = data.count;
                        $scope.noMoreUsers = !hasMoreUsers($scope.copiedTraderSum);

                        if ($scope.users.length > 0) {
                            getFanSum($scope.users);
                        }
                        
                    });
                    break;
                case 'copier':
                     relationship.getCopiers(-1, count).then(function (data){
                        $scope.users = data.data;
                        $scope.copierSum = data.count;
                        $scope.noMoreUsers = !hasMoreUsers($scope.copierSum);

                        if ($scope.users.length > 0) {
                            lastId = data.data[data.data.length-1].id;
                            getFanSum($scope.users);
                        }

                     });
                    break;
                case 'fan':
                    tmp = 'fwb';
                    break;
                case 'following':
                    tmp = 'fwb';
                    break;
                default:
                    break;
            }
            
        }

        function getMoreUsers() {
            switch ($scope.relationType) {
                case 'copier':
                    relationship.getCopiers(lastId, count).then(function (data) {
        
                        if (data.data.length <= 0) {
                            return;
                        }
                        lastId = data.data[data.data.length-1].id;
                        getFanSum(data.data);
                        $scope.users = $scope.users.concat(data.data);
                        $scope.noMoreUsers = !hasMoreUsers($scope.copierSum);

                    });
                    break;
                case 'following':
                    console.info('fwb');
                    break;
                case 'fan':
                    console.info('fwb');
                    break;
                default:
                    break;

            }
        }

        /*
         * 是否有更多的 copiers 或者 fans 等，sum 为 copierSum 或者 fanSum 等
         */
        function hasMoreUsers(sum) {
            if (sum === $scope.users.length) {
                return false;
            } else {
                return true;
            }
        }
        
        /*
         * 取到一组用户（用户属性包括 username，copiers 总数和 7 天盈利等）之后
         * 然后调用该方法获取每个用户的 fans 数
         */
        function getFanSum(users) {

            if (users.length <= 0) {
                return;
            }

            // 需要提交的一组 usercode
            var userCodes = [];
            
            angular.forEach(users, function (user) {
                this.push(user.user_code);
            }, userCodes);
            
            relationship.getFanSum(userCodes).then(function (data) {   
                angular.forEach(data.data, function (item) {
                    
                    angular.forEach(users, function (user) {

                        if (user.user_code === item.user_code) {
                            user.fans_count = item.fans_count;
                        }
                    });       

                });
            });
        }

    }

})();