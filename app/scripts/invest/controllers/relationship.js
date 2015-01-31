(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestRelationshipController', InvestRelationshipController);

    InvestRelationshipController.$inject = ['$scope', 'relationship'];

    function InvestRelationshipController($scope, relationship) {
        $scope.investors = [];
        $scope.relationType = '';   // 'copiedTrader', 'copier', 'following', 'fan'
        $scope.noMoreInvestors = false;
        $scope.copiedTraderSum = 0;
        $scope.copierSum = 0;
        $scope.followingSum = 0;
        $scope.fanSum = 0;             
        $scope.getInvestors = getInvestors;
        $scope.getMoreInvestors = getMoreInvestors;
        var lastId = -1;
        var count = 1;              //单页 user 数
        getInvestors('copiedTrader');
    
        
        /*
         * 根据 relationType 获取用户列表（data.data）赋值给 $scope.investors
         */
        function getInvestors(relationType) {
            $scope.$broadcast('showLoadingImg');
            $scope.relationType = relationType;
            $scope.noMoreInvestors = false;
            var tmp;
            
            switch (relationType) {
                case 'copiedTrader':
                    relationship.getCopiedTraders().then(function (data) {
                        $scope.investors = data.data;
                        $scope.copiedTraderSum = data.total;
                        var length = $scope.investors.length;
                        $scope.noMoreInvestors = !hasMoreInvestors($scope.copiedTraderSum, length);

                        if (length > 0) {
                            getFanSum($scope, $scope.investors, relationship);
                        }
                    });
                    break;
                case 'copier':
                     relationship.getCopiers(-1, count).then(function (data){
                        $scope.investors = data.data;
                        $scope.copierSum = data.total;
                        var length = $scope.investors.length;
                        $scope.noMoreInvestors = !hasMoreInvestors($scope.copierSum, length);

                        if (length > 0) {
                            lastId = data.data[data.data.length-1].id;
                            getFanSum($scope, $scope.investors, relationship);
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

        function getMoreInvestors() {
            switch ($scope.relationType) {
                case 'copier':
                    relationship.getCopiers(lastId, count).then(function (data) {
        
                        if (data.data.length <= 0) {
                            return;
                        }
                        lastId = data.data[data.data.length-1].id;
                        getFanSum($scope, data.data, relationship);
                        $scope.investors = $scope.investors.concat(data.data);
                        $scope.noMoreInvestors = !hasMoreInvestors($scope.copierSum,
                                $scope.investors.length);
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
        function hasMoreInvestors(sum, currentSum) {
            if (sum === currentSum) {
                return false;
            } else {
                return true;
            }
        }
        
        /*
         * 取到一组用户（用户属性包括 username，copiers 总数和 7 天盈利等）之后
         * 然后调用该方法获取每个用户的 fans 数
         */
        function getFanSum(scope, investors, service) {

            if (investors.length <= 0) {
                return;
            }

            // 需要提交的一组 usercode
            var userCodes = [];
            
            angular.forEach(investors, function (investor) {
                this.push(investor.user_code);
            }, userCodes);
            
            service.getFanSum(userCodes).then(function (data) {   
                angular.forEach(data.data, function (item) {
                    
                    angular.forEach(investors, function (investor) {

                        if (investor.user_code === item.user_code) {
                            investor.fans_count = item.fans_count;
                        }
                    });
                });

                scope.$broadcast('hideLoadingImg');
                scope.$broadcast('stopLoadingMore');
            });
        }

    }

})();