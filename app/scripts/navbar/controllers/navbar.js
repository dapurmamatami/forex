(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state'];

    function NavbarController($scope, $state) {
        $scope.parentState = '';
        $scope.infoShow = false;
        $scope.showInfo = showInfo;
        $scope.hideInfo =hideInfo;



        var stateUrl = $state.current.url;
        var stateUrlList = stateUrl.split('/');
        console.info(stateUrl);
        $scope.parentState = stateUrlList[1];

        
        
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