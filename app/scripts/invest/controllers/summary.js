(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .controller('InvestSummaryController', InvestSummaryController);

    InvestSummaryController.$inject = ['$scope'];

    function InvestSummaryController() {
        console.info('Summary Page');
    }

})();