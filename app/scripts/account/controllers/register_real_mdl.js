(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountRegisterRealMdlController', AccountRegisterRealMdlController);
   
    AccountRegisterRealMdlController.$inject = ['$scope','$state', '$modalInstance', 'registerStep', 'registerReal'];
    

    function AccountRegisterRealMdlController($scope, $state, $modalInstance, registerStep, registerReal) {
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
        $scope.closeModal = closeModal;
        $scope.eliminateErr = eliminateErr;
        $scope.submitFormStep1 = submitFormStep1;
        $scope.submitFormStep2 = submitFormStep2;
        $scope.submitFormStep3 = submitFormStep3;
        $scope.gotoDeposit = gotoDeposit;

        
        //确定显示第几步
        $scope.step = registerStep;

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
        

        function closeModal() {
            $modalInstance.close();
        }

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

        function gotoDeposit() {
            closeModal();
            $state.go('money.subPage', {subPage: 'deposit'});
        }

    }
})();