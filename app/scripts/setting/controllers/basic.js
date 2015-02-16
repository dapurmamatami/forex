(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingBasicController', SettingBasicController);

    SettingBasicController.$inject = ['$scope', '$modal', 'account'];

    function SettingBasicController($scope, $modal, account) {
        $scope.sexes = [{
            nameCN: '男',
            code: 1
        }, {
            nameCN: '女',
            code: 0
        }];
        $scope.countries = [];
        $scope.states = [];
        $scope.cities = [];
        $scope.sex = {};
        $scope.location = {
            country: {},
            state: {},
            city: {}
        };
        $scope.inputRegion = {
            stateName: '',
            cityName: ''
        };
        $scope.noSelect = false;  // 是否显示省、市的 select 元素
        $scope.select = select;
        $scope.openPortraitModal = openPortraitModal;
        $scope.submitForm = submitForm;

        // 设置性别
        $scope.$watch('personal.sex', function (value) {
            
            if (value) {
                angular.forEach($scope.sexes, function (sex) {
                    
                    if (value === sex.code) {
                        $scope.sex = sex;
                    }
                });
            }
        });
        
        // 获取 location 信息
        account.getLocationInfo().then(function (data) {
            
            if (!data.is_succ) {
                return;
            }
            $scope.location.country.code = data.world_code;
            $scope.location.state.code = data.state_code;
            $scope.location.city.code = data.city_code;
            $scope.$broadcast('locationInfoReady');
        });

        $scope.$on('locationInfoReady', function () {
            confirmRegion('country', 'countries', $scope.location.country.code);

            if ($scope.location.country.code === 'CN') {
                $scope.noSelect = false;
                confirmRegion('state', 'states', $scope.location.state.code, $scope.location.country.code);
                confirmRegion('city', 'cities', $scope.location.city.code, $scope.location.state.code);
            } else {
                $scope.noSelect = true;
            }
        });
        
        // 根据 region code，将 location 的region 对应到获取到的 regions 中
        function confirmRegion(region, regions, regionCode, upperRegionCode) {
            var tmp;
            switch(region) {
                case 'country':
                    tmp = account.getCountries();
                    break;
                case 'state':
                    tmp = account.getStates(upperRegionCode);
                    break;
                case 'city':
                    tmp = account.getCities(upperRegionCode);
                    break;
                default:
                    break;
            }
            tmp.then(function (data) {
                
                if (!data.is_succ) {
                    return;
                }
                $scope[regions] = data.data;

                angular.forEach($scope[regions], function (item) {

                    if (regionCode == item.code) {
                        $scope.location[region] = item;
                    }
                });
            });
        }

        function select(region) {
            switch(region) {
                case 'country':
                    if (!$scope.location.country) {
                        $scope.noSelect = true;
                        return;
                    }

                    if ($scope.location.country.code === 'CN') {
                        $scope.noSelect = false;
                        
                        account.getStates($scope.location.country.code).then(function (data) {
                            if (data.is_succ) {
                                $scope.states = data.data;
                            }
                        });
                        $scope.cities = [];
                    } else {
                        $scope.noSelect = true;
                    }
                    break;
                case 'state':
                    if (!$scope.location.state) {
                        $scope.cities = [];
                        return;
                    }
                    account.getCities($scope.location.state.code).then(function (data) {
                        if (data.is_succ) {
                            $scope.cities = data.data;
                        }
                    });

                    break;
                default:
                    break;
            }
        }

        function submitForm() {
            console.info($scope.inputRegion);
            console.info($scope.location);
            if ($scope.location.country.code === 'CN') {
                var submitData = {};
            } else {
                submitData = {};
            }
        }

        function openPortraitModal(size) {
            $modal.open({
                templateUrl: 'views/setting/portrait_modal.html',
                controller: 'SettingPortraitController',
                size: size,
                resolve: {
                    personal: function () {
                        return $scope.personal;
                    }
                }
            });
        }
    }
})();