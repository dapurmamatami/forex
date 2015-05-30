(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .filter('dateFormatter', dateFormatter);

    dateFormatter.$inject = ['date'];
        
    // 可显示 UTC 时间或者本地时间
    function dateFormatter(dateService) {
        return function (timestamp, type) {
            var date;
            
            if (typeof timestamp === 'undefined') return;
            
            if (typeof type === 'undefined') {
                date = dateService.formatDate(timestamp);                
            } else {
                date = dateService.formatDate(timestamp, type);
            }

            if (type === 'UTC') {
                return date.yearUTC + '/' + date.monthUTC + '/' + date.dayUTC + 
                        ' ' + date.hourUTC + ':' + date.minuteUTC + ' GMT';  
            } else {
                return date.year + '/' + date.month + '/' + date.day + ' ' + 
                        date.hour + ':' + date.minute;  
            }
        }
    }
})();