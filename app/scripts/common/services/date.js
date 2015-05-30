;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('date', date);

    // 获取 UTC 时间或者本地时间
    function date() {
        var service = {
            formatDate: formatDate
        };
        return service;

        function formatDate(timestamp, type) {
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
            var second = date.getSeconds();
            var secondUTC = date.getUTCSeconds();
            second = modFormat(second);
            secondUTC = modFormat(secondUTC);

            if (type === 'UTC') {
                return {
                    yearUTC: yearUTC,
                    monthUTC: monthUTC,
                    dayUTC: dayUTC,
                    hourUTC: hourUTC,
                    minuteUTC: minuteUTC,
                    secondUTC: secondUTC
                }
            } else {
                return {
                    year: year,
                    month: month,
                    day: day,
                    hour: hour,
                    minute: minute,
                    second: second
                }
            }
        }

        function modFormat(argu) {
            var argu = parseInt(argu);

            if (argu < 10) {
                argu = '0' + argu;
            }
            return argu;
        }
    }
})();