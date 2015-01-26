(function(){
  'use strict'

  angular
    .module('tigerwitPersonalApp')
    .directive('promptSpecialInput',promptSpecialInput);


  promptSpecialInput.$inject = [];
  function promptSpecialInput(){
    return {
      restrict:'A',
      link:function(scope,element,attrs){
        element.bind('keyup',function(event){
          console.info(scope.inputContent);



        });
      }
    }
  }

})();
