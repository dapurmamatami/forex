(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state',"$location","$cookieStore"];

    function NavbarController($scope, $state,$location,$cookieStore) {
        $scope.parentState = '';
        $scope.infoShow = false;
        $scope.showInfo = showInfo;
        $scope.hideInfo =hideInfo;
        $scope.showMsg =showMsg;
        $scope.hideMsg = hideMsg;
        $scope.select = select;
        $scope.sys_unvisited_sum = $cookieStore.get('sys_unvisited_sum');
        $scope.user_unvisited_sum =  $cookieStore.get('user_unvisited_sum');

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
        function select(type){
          $location.search('msgType',type.toString());
          $location.path('/message');
        }

    }
})();
