(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state',"$location"];

    function NavbarController($scope, $state,$location) {
        $scope.parentState = '';
        $scope.infoShow = false;
        $scope.showInfo = showInfo;
        $scope.hideInfo =hideInfo;
        $scope.showMsg =showMsg;
        $scope.hideMsg = hideMsg;
        $scope.select = select;

        var stateUrl = $state.current.url;
        var stateUrlList = stateUrl.split('/');
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

        function showMsg() {
          $scope.msg_show = true;
          //console.info("width is:"+$scope.eWidth)
        }

        function hideMsg() {
          $scope.msg_show = false;
        }
        function select(){
          $location.path('/message');
        }

    }
})();
