(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .filter('symbolBeauty', symbolBeauty);

    function symbolBeauty() {
        var notBeautyList = ['sliver', 'gold', 'wtoli'];
        return function (input) {

            if (input) {
                 var tmpInput = input.toLowerCase();

                if (notBeautyList.indexOf(tmpInput) < 0 && tmpInput.length === 6) {
                    return input.substring(0, 3) + '/' + input.substring(3, 6);
                } else {
                    return input;
                }
            }
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .filter('startNow', startNow);

    function startNow() {
        return function (timestamp) {
            if (typeof timestamp === 'undefined') {
                return;
            }

            if (timestamp < 60) {
                return timestamp + '秒';
            }

            if (timestamp < 60 * 60) {
                return Math.round((timestamp / 60)) + '分钟';
            }

            if (timestamp < 60 * 60 *24) {
                return Math.round((timestamp / (60 * 60))) + '小时';
            }

            if (timestamp < 60 * 60 * 24 * 7) {
                return Math.round((timestamp / (60 * 60 * 24))) + '天';
            }

            return Math.round((timestamp / (60 * 60 * 24 * 7))) + '周';
        }
    }
})();