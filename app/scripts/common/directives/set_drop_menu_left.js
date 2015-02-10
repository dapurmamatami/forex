(function(){
    'use strict';
    angular
      .module('tigerwitPersonalApp')
      .directive('setDropMenuLeft',setDropMenuLeft);

    function setDropMenuLeft(){
        return {
            restrict:'A',
            link:function(scope, element, attrs){
                var ewidth = element.context.offsetWidth;
                $(".dropdown-menu").css("left",ewidth-250-25.5);
            }
        }
    }


})();
