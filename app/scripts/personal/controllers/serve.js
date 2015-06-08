(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('PersonalServeController', PersonalServeController);

    PersonalServeController.$inject = ['$scope', '$modal', '$state', 'activity'];

    function PersonalServeController($scope, $modal, $state, activity) {
        $scope.openModal = openModal;

        function openModal() {
            $modal.open({
                templateUrl: 'views/personal/activity_modal.html',
                controller: function ($scope, $modalInstance, passedScope) {
                    var personal = passedScope;

                    $scope.closeModal = closeModal;
                    $scope.toDeposit = toDeposit;

                    function closeModal() {
                        $modalInstance.dismiss();
                    }

                    function toDeposit() {
                        var userCode = personal.user_code;

                        activity.collectInfo(userCode).then(function (data) {
                            if (data.is_succ) {
                                closeModal();
                                $state.go('money.subPage', {subPage: 'deposit'});                                
                            }
                        });
                        
                        // 等接口完成后去掉
                        closeModal();
                        $state.go('money.subPage', {subPage: 'deposit'});
                    }
                },
                size: 'md',
                resolve: {
                    passedScope: function () {
                        return $scope.personal;
                    }
                }
            });
        }
    }
})();