;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('MoneyBonusController', MoneyBonusController);

    MoneyBonusController.$inject = ['$scope', '$modal', 'money'];

    function MoneyBonusController($scope, $modal, money) {
        $scope.datepicker = {
            //date: ,
            options: {
                format: 'YYYY-MM'
            }
        };
        $scope.bonusSummary = {};
        $scope.bonusList = [];
        $scope.pagebar = {
            config: {
                // total: , 总页数
                size: 3,
                page: 1    
            },
            pages: [],
            //selectPage: , bind to pagination.selectPage
            args: $scope.datepicker, //其他参数，这里是查询日期 
            getList: getList            
        };
        $scope.openModal = openModal;
        var count = 1; // 单页显示数

        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dateString = year + '-' +month;

        $scope.datepicker.date = dateString;

        $scope.$watch('datepicker.date', function (date) {
            console.info(date);
        });

        money.getBonus($scope.personal.user_code).then(function (data) {
            $scope.bonusSummary = data.data;
            //$scope.$broadcast('hideLoadingImg');
        });

        getList(1, $scope.datepicker.date);

        // 获取一个 list
        // page 为当前页，date 为查询日期，如：2015-05
        function getList(page, date) {
            $scope.$broadcast('showLoadingImg');
            money.getBonusList(page, count, date).then(function (data) {
                //console.info(data);
                
                $scope.bonusList = data.data;
                //$scope.bonusList = [];

                angular.extend($scope.pagebar.config, {
                    total: getTotal(data.sum, count),
                    page: page
                });

                $scope.$broadcast('hideLoadingImg');
            });
        }

        // 获取总页数
        function getTotal(sum, count) {
            var total; // 总页数
            sum = parseInt(sum, 10); // list item 总个数
            count = parseInt(count, 10); // 单页显示数

            if (sum % count > 0) {
                total = parseInt(sum / count) + 1;
            } else {
                total = parseInt(sum / count);
            }
            return total;
        }

        // open detail modal
        function openModal(userCode) {
            $modal.open({
                templateUrl: 'views/money/bonus_modal.html',
                //controller: 'MoneyBonusDetailController',
                size: 'lg',
                resolve: {
                    userCode: function () {
                        return userCode;
                    }
                }
            });
        }
    }
})();