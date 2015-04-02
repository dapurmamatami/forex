;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('SettingVerifyController', SettingVerifyController);

    SettingVerifyController.$inject = ['$scope', '$timeout', '$modal', 'account', 'registerReal'];

    function SettingVerifyController($scope, $timeout, $modal, accountService, registerReal) {
        $scope.verifyStatus = 0;
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
            forkCode: null,
            succSave: false
        };
        $scope.eliminateError = eliminateError;
        $scope.submitVerifyForm = submitVerifyForm;
        $scope.openModal = openModal;


        // 根据状态吗确定认证状态：未认证、认证审核中、认证未通过、认证通过
        accountService.getPersonalInfo('Profile').then(function (data) {
            if (!data.is_succ) return;    

            if (data.profile_check === null) {
                $scope.verifyStatus = 0;
            }

            // 审核未通过
            if (data.profile_check === 1) {
                $scope.verifyStatus = 1;
            }

            if (data.profile_check === 2 || data.profile_check === 3) {
                $scope.verifyStatus = data.profile_check;
                $scope.account.name = data.realname;
                $scope.account.id.showedIdNum = data.id_no;
            }

            $scope.$broadcast('hideLoadingImg');
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
                    $scope.account.succSave = true;

                    $timeout(function () {
                        $scope.account.succSave = false;
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
                        return $scope.registerRealStep;
                    }
                }
            });
        }

    }
})();