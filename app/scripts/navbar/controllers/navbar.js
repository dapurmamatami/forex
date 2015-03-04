(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state', '$cookieStore'];

    function NavbarController($scope, $state, $cookieStore) {
        $scope.currentUrl = {
            prefix: ''
        };
        $scope.infoShow = false;
        $scope.showInfo = showInfo;
        $scope.hideInfo =hideInfo;
        $scope.showMsg =showMsg;
        $scope.hideMsg = hideMsg;
        $scope.select = select;
        $scope.sys_unvisited_sum = $cookieStore.get('sys_unvisited_sum');
        $scope.user_unvisited_sum =  $cookieStore.get('user_unvisited_sum');

        //$scope.prefix = $state.$current.url.prefix;
        $scope.currentUrl.prefix = $state.$current.url.source.split('/')[1];

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
          //$location.search('msgType',type.toString());
          //$location.path('/message');

            $state.go('message',{type_message:type})
        }

    }
})();
