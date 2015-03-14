;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingVerifyController', SettingVerifyController);

    SettingVerifyController.$inject = ['$scope', '$state', 'account'];

    function SettingVerifyController($scope, $state, account) {
        $scope.realInfo = {
            name: '',
            idNumber: '',
            showedIdNumber: ''
        };
        $scope.idNumberCheck = {
            existence: false,
            invalid: false
        };
        $scope.idImage = {
            frontMessage: '',
            frontStatus: 0,
            backMessage: '',
            backStatus: 0
        };
        $scope.eliminateError = eliminateError;
        $scope.submitVerifyForm = submitVerifyForm;

        $scope.$watch('personal.verified', function (value) {

            if (value === true) {
                account.getPersonalInfo('Profile').then(function (data) {
                    
                    if (data.is_succ) {
                        $scope.realInfo.name = data.realname;
                        $scope.realInfo.showedIdNumber = data.id_no;
                        $scope.$broadcast('hideLoadingImg');
                    }
                   
                });
            }
        });

        $scope.$on('uploadFormStart', function (event, data) {
            $scope.$apply(function () {
                $scope.idImage[data.face + 'Status'] = 1;
                $scope.idImage[data.face + 'Message'] = '正在上传...';    
            });
        });

        $scope.$on('uploadFormSuccess', function (event, data) {
            $scope.$apply(function () {
                $scope.idImage[data.face + 'Status'] = 2;
                $scope.idImage[data.face + 'Message'] = '上传成功';    
            });
        });

        $scope.$on('uploadFormError', function (event, data) {
            $scope.$apply(function () {
                $scope.idImage[data.face + 'Status'] = 3;
                $scope.idImage[data.face + 'Message'] = '上传失败！请上传小于 3MB 的图片';    
            });
        });

        $scope.$on('uploadFormTypeError', function (event, data) {
            $scope.$apply(function () {
                $scope.idImage[data.face + 'Status'] = 3;
                $scope.idImage[data.face + 'Message'] = '上传失败！图片格式不正确';    
            });
        });

        // 消除需要服务器端返回的错误信息
        function eliminateError() {
            $scope.idNumberCheck.invalid = false;
            $scope.idNumberCheck.existence = false;
        }

        function submitVerifyForm() {
            account.checkNumberExistence($scope.realInfo.idNumber).then(function (data) {
                if (data.is_succ) {
                    $scope.idNumberCheck.existence = data.data;

                    if ($scope.idNumberCheck.existence) {
                        return;
                    }
                    account.setInfo($scope.realInfo.name, $scope.realInfo.idNumber, 
                            null).then(function (data) {
                        $scope.idNumberCheck.invalid = !data.is_succ;

                        if (data.is_succ) {
                            account.getPersonalInfo().then(function (data) {
                                $scope.personal = data;
                            });
                        }
                    });
                }
            });
        }

    }
})();