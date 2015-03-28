(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', '$state', '$cookieStore', 'account','communicate'];

    function NavbarController($scope, $state, $cookieStore, account,communicate) {
        $scope.currentUrl = {
            prefix: ''
        };
        $scope.infoShow = false;
        $scope.dropdownShow = {
            more: false,
            info: false
        };
        $scope.showMsg =showMsg;
        $scope.hideMsg = hideMsg;
        $scope.select = select;
        $scope.logout = logout;
        $scope.showDropdown = showDropdown;
        $scope.hideDropdown = hideDropdown;

        //$scope.sys_unvisited_sum = $scope.$parent.sys_unvisited_sum;
        //$scope.user_unvisited_sum =  $scope.$parent.user_unvisited_sum;
        //$scope.prefix = $state.$current.url.prefix;
        $scope.currentUrl.prefix = $state.$current.url.source.split('/')[1];

        function logout() {
            account.logout().then(function (data) {

                if (data.is_succ) {
                    $state.go('account.login');
                }
            });
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

        function showDropdown(prop) {
            $scope.dropdownShow[prop] = true;
        }

        function hideDropdown(prop) {
            $scope.dropdownShow[prop] = false;
        }
    }
})();
