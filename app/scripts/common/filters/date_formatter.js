(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .filter('dateFormatter', dateFormatter);

    function dateFormatter() {
        return function (timestamp) {
            if (typeof timestamp === 'undefined') return;
            var date = new Date(timestamp * 1000);
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            month = modFormat(month);
            var day = date.getDate();
            day = modFormat(day);
            var hour = date.getHours();
            hour = modFormat(hour);
            var minute = date.getMinutes();
            minute = modFormat(minute);

            return year + '/' + month + '/' + day + ' ' + hour + ':' + minute;  

            function modFormat(argu) {
                var argu = parseInt(argu);

                if (argu < 10) {
                    argu = '0' + argu;
                }
                return argu;
            }            
        }
    }
})();