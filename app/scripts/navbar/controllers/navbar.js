(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state', '$timeout', 'account', 'storage', 'validator'];

    function NavbarController($scope, $state, $timeout, account, storage, validator) {
        var stateUrl = $state.current.url;
        var stateUrlList = stateUrl.split('/');
        $scope.parentState = stateUrlList[1];

        $scope.login = {
            phone: '',
            password: '',
            uiLoginError: ''
        };

        //cookie 是否过期
        $scope.login.expires = 'checked';
        $scope.loginFun = loginFun;
        $scope.signOut = signOut;

        $scope.infoShow = false;
        //var hideTimerPromise;
        $scope.showInfo = showInfo;
        $scope.hideInfo =hideInfo;
        
        function loginFun() {

        }

        function signOut() {

        }

        function showInfo() {
            $scope.infoShow = true;
        }

        function hideInfo() {
            $scope.infoShow = false;
        }


    }
})();