(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingBasicController', SettingBasicController);

    SettingBasicController.$inject = ['$scope', '$timeout', '$modal', 'account'];

    function SettingBasicController($scope, $timeout, $modal, account) {
        $scope.succSave = false;
        $scope.sexes = [{
            nameZH: '男',
            code: 1
        }, {
            nameZH: '女',
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
        $scope.signature = '';
        $scope.noSelect = false;  // 是否显示省、市的 select 元素
        $scope.select = select;
        $scope.openAvatarModal = openAvatarModal;
        $scope.submitForm = submitForm;

        // 设置性别
        $scope.$watch('personal.sex', function (value) {

            if (typeof value !== 'undefined') { 
                angular.forEach($scope.sexes, function (sex) {
                    
                    if (value === sex.code) {
                        $scope.sex = sex;
                    }
                });
            }
        });
        
        // 获取基本信息来初始化页面数据
        account.getBasicInfo().then(function (data) {
            
            if (!data.is_succ) {
                return;
            }
            $scope.signature = data.desc;
            $scope.location.country.code = data.world_code;

            if (data.world_code === 'CN') {
                $scope.location.state.code = data.state_code;
                $scope.location.city.code = data.city_code;
            } else {
                $scope.inputRegion.stateName = data.state_name;
                $scope.inputRegion.cityName = data.city_name;
            }
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
                        $scope.inputRegion.stateName = '';
                        $scope.inputRegion.cityName = '';
                        
                        account.getStates($scope.location.country.code).then(function (data) {
                            if (data.is_succ) {
                                $scope.states = data.data;
                            }
                        });
                        $scope.cities = [];
                    } else {
                        $scope.noSelect = true;
                        $scope.location.state = {};
                        $scope.location.city = {};
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
            account.postLocationInfo($scope.sex.code, $scope.location, $scope.inputRegion,
                    $scope.signature).then(function (data) {
                
                if (data.is_succ) {
                    $scope.succSave = true;

                    $timeout(function () {
                        $scope.succSave = false;
                    }, 1000);
                }
            });
        }

        function openAvatarModal(size) {
            $modal.open({
                templateUrl: 'views/setting/basic_avatar_modal.html',
                controller: 'SettingAvatarController',
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