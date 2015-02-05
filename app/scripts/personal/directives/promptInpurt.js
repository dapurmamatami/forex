(function(){
  'use strict'

  angular
    .module('tigerwitPersonalApp')
    .directive('bsPopup',bsPopup);


  bsPopup.$inject = [];
  function bsPopup(){
    return {
      restrict:'A',
      require:'ngModel',
      link:function(scope,element,attrs,ctrl){
        element.bind('keyup',function(event){
          console.info(scope.inputContent);



        });
      }
    }
  }

})();
