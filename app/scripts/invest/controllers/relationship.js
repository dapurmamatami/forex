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
        $scope.investorSum = 0;           
        $scope.getInvestors = getInvestors;
        $scope.getMoreInvestors = getMoreInvestors;
        var lastId;
        var count = 1;              //单页 investor 数
        
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
                        if (Object.prototype.toString.call(data.data) !== '[object Array]') {
                            return;
                        }
                        $scope.investors = modifyPropertyName(data.data);
                        $scope.investorSum = data.total;
                        var length = $scope.investors.length;
                        $scope.noMoreInvestors = !hasMoreInvestors($scope.investorSum, length);

                        if (length > 0) {
                            getFanSum($scope, $scope.investors, relationship);
                        } else {
                            $scope.$broadcast('hideLoadingImg');
                        }
                    });
                    break;
                case 'copier':
                    lastId = -1;
                    relationship.getCopiers(lastId, count).then(function (data){
                        if (Object.prototype.toString.call(data.data) !== '[object Array]') {
                            return;
                        }
                        $scope.investors = modifyPropertyName(data.data);
                        $scope.investSum = data.total;
                        var length = $scope.investors.length;
                        $scope.noMoreInvestors = !hasMoreInvestors($scope.investSum, length);

                        if (length > 0) {
                            lastId = $scope.investors[length - 1].id;
                            getFanSum($scope, $scope.investors, relationship);
                        } else {
                            $scope.$broadcast('hideLoadingImg');
                        }

                     });
                    break;
                case 'following':
                    lastId = 0;
                    tmp = relationship.getFollowings($scope.personal.user_code, lastId, count);
                    break;
                case 'fan':
                    lastId = 0;
                    tmp = relationship.getFans($scope.personal.user_code, lastId, count);
                    break;
                default:
                    break;
            }

            if (relationType === 'following' || relationType === 'fan') {
                tmp.then(function (data) {
                    if (Object.prototype.toString.call(data.data.list) !== '[object Array]') {
                        return;
                    }
                    $scope.investors = modifyPropertyName(data.data.list);
                    var length = $scope.investors.length;

                    if (relationType === 'following') {
                        $scope.investorSum = data.data.fan_info.attention_sum;
                    }

                    if (relationType === 'fan') {
                        $scope.investorSum = data.data.fan_info.fans_sum;
                    }
                    $scope.noMoreInvestors = !hasMoreInvestors($scope.investorSum, length);

                    if(length > 0) {
                        lastId = lastId + count;
                        getOtherParams($scope, $scope.investors, relationship);
                    } else {
                        $scope.$broadcast('hideLoadingImg');
                    }
                });
            }
            
        }

        function getMoreInvestors() {
            var tmp;
            switch ($scope.relationType) {
                case 'copier':
                    relationship.getCopiers(lastId, count).then(function (data) {
                        var newList = modifyPropertyName(data.data);

                        if (newList.length <= 0) {
                            return;
                        }
                        lastId = newList[newList.length - 1].id;
                        getFanSum($scope, newList, relationship);
                        $scope.investors = $scope.investors.concat(newList);
                        $scope.noMoreInvestors = !hasMoreInvestors($scope.investSum,
                                $scope.investors.length);
                    });
                    break;
                case 'following':
                    tmp = relationship.getFollowings($scope.personal.user_code, lastId, count);
                    break;
                case 'fan':
                    tmp = relationship.getFans($scope.personal.user_code, lastId, count);
                    break;
                default:
                    break;
            }

            if ($scope.relationType === 'following' || $scope.relationType === 'fan') {
                tmp.then(function (data) {
                    var newList = modifyPropertyName(data.data.list);

                    if (newList.length <= 0) {
                        return;
                    }
                    lastId = lastId + count;
                    getOtherParams($scope, newList, relationship);
                    $scope.investors = $scope.investors.concat(newList);
                    $scope.noMoreInvestors = !hasMoreInvestors($scope.investorSum,
                            $scope.investors.length); 
                });
            }
        }

        /*
         * 取到一组用户（用户属性不包括需要的 fan 总数）
         * 调用该方法获取每个用户的 fan 总数
         */
        function getFanSum(scope, investors, service) {

            if (investors.length <= 0) {
                return;
            }

            // 需要提交的一组 user code
            var userCodes = [];
            
            angular.forEach(investors, function (investor) {
                this.push(investor.userCode);
            }, userCodes);
            
            service.getFanSum(userCodes).then(function (data) {   
                angular.forEach(data.data, function (item) {
                    
                    angular.forEach(investors, function (investor) {

                        if (investor.userCode === item.user_code) {
                            investor.fanSum = item.fans_count;
                        }
                    });
                });

                scope.$broadcast('hideLoadingImg');
                scope.$broadcast('stopLoadingMore');
            });
        }

        /*
         * 取到一组用户（用户属性不包括需要的 copier 总数和 7 天盈利）
         * 调用该方法来获取
         */
        function getOtherParams(scope, investors, service) {

            if (investors.length <= 0) {
                return;
            }

            // 需要提交的一组 user code
            var userCodes = [];

            angular.forEach(investors, function (investor) {
                this.push(investor.userCode);
            }, userCodes);

            service.getOtherParams(userCodes).then(function (data) {
                angular.forEach(data.data, function (item) {

                    angular.forEach(investors, function (investor) {

                        if (investor.userCode === item.user_code) {
                            investor.copierSum = item.copy_copiers_count;
                            investor.rate = item.total_profit_rate;
                        }
                    });
                });

                $scope.$broadcast('hideLoadingImg');
                $scope.$broadcast('stopLoadingMore');
            });

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
         * 修改返回数据的 data 的属性名，使得在 HTML 中的变量名统一，并且
         * 也符合了前端命名规范    
         */
        function modifyPropertyName(list) {
            var newList = [];

            angular.forEach(list, function (item) {
                this.push({
                    userName: item['username'] || item['userName'],
                    userCode: item['user_code'] || item['userCode'],
                    copierSum: item['copy_copiers_count'],
                    fanSum: item['fanCount'],
                    rate: item['total_profit_rate'],
                    id: item['id']
                });
            }, newList);
            return newList;
        }

    }

})();