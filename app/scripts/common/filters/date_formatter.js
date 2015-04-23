(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .filter('dateFormatter', dateFormatter);

    // 可显示 UTC 时间或者本地时间
    function dateFormatter() {
        return function (timestamp, type) {
            if (typeof timestamp === 'undefined') return;
            var date = new Date(timestamp * 1000);
            var year = date.getFullYear();
            var yearUTC = date.getUTCFullYear();
            var month = date.getMonth() + 1;
            var monthUTC = date.getUTCMonth() + 1;
            month = modFormat(month);
            monthUTC = modFormat(monthUTC);
            var day = date.getDate();
            var dayUTC = date.getUTCDate();
            day = modFormat(day);
            dayUTC = modFormat(dayUTC);
            var hour = date.getHours();
            var hourUTC = date.getUTCHours();
            hour = modFormat(hour);
            hourUTC = modFormat(hourUTC);
            var minute = date.getMinutes();
            var minuteUTC = date.getUTCMinutes();
            minute = modFormat(minute);
            minuteUTC = modFormat(minuteUTC);

            if (type === 'UTC') {
                return yearUTC + '/' + monthUTC + '/' + dayUTC + ' ' + hourUTC +
                        ':' + minuteUTC + ' GMT';  
            } else {
                return year + '/' + month + '/' + day + ' ' + hour + ':' +
                        minute;  
            }

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