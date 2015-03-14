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
                valid: false,
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
        $scope.eliminateErr = eliminateErr;
        $scope.submitFormStep1 = submitFormStep1;
        $scope.submitFormStep2 = submitFormStep2;
        $scope.submitFormStep3 = submitFormStep3;

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

            registerReal.postNameId($scope.account).then(function (data) {
                
                if (data) {
                    goNextStep();
                }
            });
            
        }

        function eliminateErr() {
            registerReal.eliminateErr($scope.account.id);
        }

        function submitFormStep2() {
            goNextStep();
        }

        function submitFormStep3() {
            registerReal.submitQuest($scope.account).then(function () {
                goNextStep();
            });
        }
    }
})();