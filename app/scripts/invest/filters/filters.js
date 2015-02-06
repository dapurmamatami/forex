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
        return function (timeStamp) {
            if (typeof timeStamp === 'undefined') {
                return;
            }

            if (timeStamp < 60) {
                return timeStamp + '秒';
            }

            if (timeStamp < 60 * 60) {
                return Math.round((timeStamp / 60)) + '分钟';
            }

            if (timeStamp < 60 * 60 *24) {
                return Math.round((timeStamp / (60 * 60))) + '小时';
            }

            if (timeStamp < 60 * 60 * 24 * 7) {
                return Math.round((timeStamp / (60 * 60 * 24))) + '天';
            }

            return Math.round((timeStamp / (60 * 60 * 24 * 7))) + '周';
        }
    }
})();