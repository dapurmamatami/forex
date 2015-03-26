;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountRegisterRealController', AccountRegisterRealController);

    AccountRegisterRealController.$inject = ['$scope', 'registerReal'];

    function AccountRegisterRealController($scope, registerReal) {
        $scope.step = 1;
        $scope.account = {
            name: '',
            id: {
                number: '',
                existence: false,
                valid: true,
                frontImgMsg: '',
                frontImgStatus: 0,
                backImgMsg: '',
                backImgStatus: 0
            },
            forkCode: null,
            employment: '',
            income: '',
            experience: ''
        };
        $scope.formErr = {
            name: false,
            idNumber: false
        };
        $scope.submitFormStep1 = submitFormStep1;
        $scope.submitFormStep2 = submitFormStep2;
        $scope.submitFormStep3 = submitFormStep3;
        $scope.hideErr = hideErr;
        $scope.showErr = showErr;

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


        function goNextStep() {
            $scope.step++;
        }

        function submitFormStep1() {

            if ($scope.formStep1.$invalid || $scope.account.id.existence || !$scope.account.id.valid) {
                $scope.formErr.name = true;
                $scope.formErr.idNumber = true;
                return;
            }

            registerReal.postNameId($scope.account).then(function (data) {
                
                if (data) {
                    goNextStep();
                }
            });
            
        }

        function submitFormStep2() {
            goNextStep();
        }

        function submitFormStep3() {
            registerReal.submitQuest($scope.account).then(function () {
                goNextStep();
            });
        }

        function hideErr(name) {
            $scope.formErr[name] = false;

            if (name === 'idNumber') {
                registerReal.eliminateErr($scope.account.id);
            }
        }

        function showErr(name) {
            $scope.formErr[name] = true;
        }
    }
})();