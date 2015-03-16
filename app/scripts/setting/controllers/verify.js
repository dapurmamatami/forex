;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingVerifyController', SettingVerifyController);

    SettingVerifyController.$inject = ['$scope', '$timeout', '$modal', 'account', 'registerReal'];

    function SettingVerifyController($scope, $timeout, $modal, accountService, registerReal) {
        $scope.succSave = false;
        $scope.account = {
            name: '',
            id: {
                number: '',
                showedIdNum: '',
                existence: false,
                valid: false,
                frontImgMsg: '',
                frontImgStatus: 0,
                backImgMsg: '',
                backImgStatus: 0
            },
            forkCode: null
        };
        $scope.eliminateError = eliminateError;
        $scope.submitVerifyForm = submitVerifyForm;
        $scope.openModal = openModal;

        $scope.$watch('personal.verified', function (value) {

            if (value === true) {
                accountService.getPersonalInfo('Profile').then(function (data) {
                    
                    if (data.is_succ) {
                        $scope.account.name = data.realname;
                        $scope.account.id.showedIdNum = data.id_no;
                        $scope.$broadcast('hideLoadingImg');
                    }
                });
            }

            if (value === false) {
                $scope.$broadcast('hideLoadingImg');
            }
        });

        $scope.$on('uploadFormStart', function (event, data) {
            $scope.$apply(function () {
                $scope.account.id[data.face + 'ImgStatus'] = 1;
                $scope.account.id[data.face + 'ImgMsg'] = '正在上传...';    
            });
        });

        $scope.$on('uploadFormSuccess', function (event, data) {
            $scope.$apply(function () {
                $scope.account.id[data.face + 'ImgStatus'] = 2;
                $scope.account.id[data.face + 'ImgMsg'] = '上传成功';    
            });
        });

        $scope.$on('uploadFormError', function (event, data) {
            $scope.$apply(function () {
                $scope.account.id[data.face + 'ImgStatus'] = 3;
                $scope.account.id[data.face + 'ImgMsg'] = '上传失败！请上传小于 3MB 的图片';    
            });
        });

        $scope.$on('uploadFormTypeError', function (event, data) {
            $scope.$apply(function () {
                $scope.account.id[data.face + 'ImgStatus'] = 3;
                $scope.account.id[data.face + 'ImgMsg'] = '上传失败！图片格式不正确';    
            });
        });

        function eliminateError() {
            registerReal.eliminateErr($scope.account.id);
        }

        // 实际上只是提交姓名和身份证号
        function submitVerifyForm() {
            registerReal.postNameId($scope.account).then(function (data) {

                if (data) {
                    $scope.succSave = true;

                    $timeout(function () {
                        $scope.succSave = false;
                    }, 1000);
                }
            });
        }

        function openModal(size) {
            $modal.open({
                templateUrl: 'views/account/register_real_mdl.html',
                controller: 'AccountRegisterRealMdlController',
                size: size,
                resolve: {
                    registerStep: function () {
                        return $scope.personal.step;
                    }
                }
            });
        }

    }
})();