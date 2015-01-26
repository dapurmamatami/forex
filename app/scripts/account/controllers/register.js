(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountRegisterController', AccountRegisterController);

    AccountRegisterController.$inject = ['$scope', '$window', '$location', '$state', '$timeout',
            '$interval', '$modal', 'account', 'config', 'validator'];

    function AccountRegisterController($scope, $window, $location, $state, $timeout, $interval,
            $modal, account, config, validator) {
        $scope.step = 3;
        /*
         * 确定显示第几步的表单
         */
       /* account.getStepInfo('ReliableInformation').then(function (data) {
            if (data.is_succ) {
                $scope.step = data.progress + 1;
            }
        });*/

        /*
         * 表单第一步的数据模型
         */
        $scope.name = '';
        $scope.idNumber = '';
        $scope.idNumberCheck = {
            success: false,
            existence: false,
            valid: false
        }; 
        $scope.forkCode = null;
        $scope.submitFormStep1 = submitFormStep1;
        $scope.validate = validate;

        /*
         * 表单第二步的数据模型以及业务逻辑
         */
        $scope.idImage = {
            frontImageError: '',
            frontImageStatus: 0,
            backImageError: '',
            backImageStatus: 0
        };
        $scope.submitFormStep2 = submitFormStep2;

        $scope.$on('uploadFormStart', function (event, data) {
            switch(data.face) {
                case 'front':
                    $scope.$apply(function () {
                        $scope.idImage.frontImageStatus = 1;
                        $scope.idImage.frontImageError = '';
                    });
                    break;
                case 'back':
                    $scope.idImage.backImageStatus = 1;
                    $scope.idImage.backImageError = '';
                    break;
                default:
                    break;
            }
        });

        $scope.$on('uploadFormSuccess', function (event, data) {
            switch(data.face) {
                case 'front':
                    $scope.$apply(function () {
                        $scope.idImage.frontImageError = '';
                        $scope.idImage.frontImageStatus = 2;
                    });
                    break;
                case 'back':
                    $scope.idImage.backImageError = '';
                    $scope.idImage.backImageStatus = 2;
                    break;
            }
        });

        $scope.$on('uploadFormError', function (event, data) {
            switch(data.face) {
                case 'front':
                    $scope.$apply(function () {
                        $scope.idImage.frontImageError = '上传失败! 请上传小于 3MB 的图片';
                        $scope.idImage.frontImageStatus = 3;
                    });
                    break;
                case 'back':
                    $scope.$apply(function () {
                        $scope.idImage.backImageError = '上传失败! 请上传小于 3MB 的图片';
                        $scope.idImage.backImageStatus = 3;
                    });
                    break;
            }
        });

        $scope.$on('uploadFormTypeError', function (event, data) {
            switch(data.face) {
                case 'front':
                    $scope.$apply(function () {
                        $scope.idImage.frontImageError = '上传的类型不正确，只支持 jpg, jpeg, png 三种格式';
                        $scope.idImage.frontImageStatus = 3;
                    });
                    
                    break;
                case 'back':
                    $scope.$apply(function () {
                        $scope.idImage.backImageError = '上传的类型不正确，只支持 jpg, jpeg, png 三种格式';
                        $scope.idImage.backImageStatus = 3;
                    });
                    break;
            }
        });



        function submitFormStep1() {
            account.checkNumberExistence($scope.idNumber).then(function (data) {
                $scope.idNumberCheck.success = data.is_succ;

                if ($scope.idNumberCheck.success) {
                    $scope.idNumberCheck.existence = data.data;

                    if ($scope.idNumberCheck.existence) {
                        return;
                    }
                    account.setInfo($scope.name, $scope.idNumber, $scope.forkCode).
                            then(function (data) {
                        $scope.idNumberCheck.valid = data.is_succ;
                        if ($scope.idNumberCheck.valid) {
                            $scope.step += 1;
                        }
                    });
                }
            });
        }

        function validate() {
           $scope.idNumberCheck.valid = true;
           $scope.idNumberCheck.existence = false;
        }

        function submitFormStep2() {
            $scope.step += 1;
        }
    }
})();