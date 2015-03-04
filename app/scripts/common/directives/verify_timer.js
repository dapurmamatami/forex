;
(function () {
    'use strict';

    // 获取手机验证码的计时器
    angular
        .module('tigerwitPersonalApp')
        .directive('twVerifyTimer', twVerifyTimer);

    twVerifyTimer.$inject = ['$timeout'];

    function twVerifyTimer($timeout) {
        return {
            restrict: 'A',
            scope: {},
            replace: true,
            template: '<span class="btn btn-primary" style="width:95px; padding: 6px;">' + 
                        '<span ng-show="timer.start">' + '获取验证码' + '</span>' +        
                        '<span ng-show="timer.running">' + '{{timer.seconds}}' + '</span>' + 
                        '<span ng-show="timer.restart">' + '重新获取' + '</span>' + 
                    '</span>',
            link: function (scope, element, attrs) {
                var seconds = 3;
                scope.timer = {
                    seconds: seconds,
                    start: true,
                    running: false,
                    restart: false
                };  

                element.bind('click', function () {

                    if (scope.timer.start || scope.timer.restart) {
                        scope.timer.start = false;
                        scope.timer.running = true;
                        scope.timer.restart = false;
                        updateTime();
                    }
                });


                function updateTime() {

                    if (scope.timer.seconds <= 0) {
                        scope.timer.start = false;
                        scope.timer.running = false;
                        scope.timer.restart = true;
                        scope.timer.seconds = seconds
                        return;
                    }
                    scope.timer.seconds --;

                    $timeout(function () {
                       updateTime();
                    }, 1000);
                }
                
            }
        };
    }
})();