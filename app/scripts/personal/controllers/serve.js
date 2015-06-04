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
                        activity.collectInfo(personal.user_code).then(function (data) {
                            if (data.is_succ) {
                                closeModal();
                                $state.go('money.subPage', {subPage: 'deposit'});                                
                            }
                        });
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