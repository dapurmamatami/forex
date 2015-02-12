(function(){
    'use strict';
    angular
      .module('tigerwitPersonalApp')
      .directive('twAutoFocus',twAutoFocus);


    function twAutoFocus(){
        return {
            restrict:'A',

            link:function(scope,ele,attr){
                ele[0].focus();
            }
        };
    }
})()
