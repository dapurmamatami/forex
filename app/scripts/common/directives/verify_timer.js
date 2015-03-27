;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .directive('twVerifyTimer', twVerifyTimer);

    twVerifyTimer.$inject = ['$timeout'];

    // 获取手机验证码的计时器
    function twVerifyTimer($timeout) {
        return {
            restrict: 'A',
            replace: true,
            scope: {
                startTimer: '='
            },
            template: 
                '<span>' + 
                    '<span ng-show="timer.start">' + '获取验证码' + '</span>' +        
                    '<span ng-show="timer.running">' + '{{timer.seconds}}' + ' 秒</span>' + 
                    '<span ng-show="timer.restart">' + '重新获取' + '</span>' + 
                '</span>',
            link: function (scope, element, attrs) {
                var totalSeconds = 31;
                
                scope.timer = {
                    seconds: totalSeconds,
                    start: true,
                    running: false,
                    restart: false
                };

                // 在 controller 中可以访问该方法  
                scope.startTimer = startTimer;

                /*element.bind('click', function () {

                    if (scope.timer.start || scope.timer.restart) {
                        element.attr('disabled', true);
                        scope.timer.start = false;
                        scope.timer.running = true;
                        scope.timer.restart = false;
                        updateTime(); 
                    }
                });*/
                
                // 启动计时器
                function startTimer() {
                    
                    if (scope.timer.start || scope.timer.restart) {
                        element.attr('disabled', true);
                        scope.timer.start = false;
                        scope.timer.running = true;
                        scope.timer.restart = false;
                        updateTime(); 
                    }
                }

                function updateTime() {

                    if (scope.timer.seconds <= 0) {
                        scope.timer.start = false;
                        scope.timer.running = false;
                        scope.timer.restart = true;
                        scope.timer.seconds = totalSeconds;
                        element.attr('disabled', false);
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