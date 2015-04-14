(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('AccountRegisterRealMdlController', AccountRegisterRealMdlController);
   
    AccountRegisterRealMdlController.$inject = ['$scope','$state', '$modalInstance', 
            'registerStep', 'registerReal'];
    

    function AccountRegisterRealMdlController($scope, $state, $modalInstance, 
                registerStep, registerReal) {
        $scope.account = {
            name: '',
            id: {
                number: '',
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
        $scope.formErr = {
            name: false,
            idNumber: false
        };
        $scope.closeModal = closeModal;
        $scope.submitFormStep1 = submitFormStep1;
        $scope.submitFormStep2 = submitFormStep2;
        $scope.submitFormStep3 = submitFormStep3;
        $scope.gotoDeposit = gotoDeposit;
        $scope.hideErr = hideErr;
        $scope.showErr = showErr;
        
        //确定显示第几步
        $scope.step = registerStep;

        $scope.$on('uploadImageStart', function (event, data) {
            $scope.$apply(function () {
                $scope.account.id[data.face + 'ImgStatus'] = 1;
                $scope.account.id[data.face + 'ImgMsg'] = '正在上传...';    
            });
        });

        $scope.$on('uploadImageSuccess', function (event, data) {
            $scope.$apply(function () {
                $scope.account.id[data.face + 'ImgStatus'] = 2;
                $scope.account.id[data.face + 'ImgMsg'] = '上传成功';    
            });
        });


        $scope.$on('uploadImageFail', function (event, data) {
            $scope.$apply(function () {
                $scope.account.id[data.face + 'ImgStatus'] = 3;
                $scope.account.id[data.face + 'ImgMsg'] = '上传失败！请上传小于 3MB 的图片';    
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