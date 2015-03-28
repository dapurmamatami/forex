(function(){
    'use strict';

  angular
    .module('tigerwitPersonalApp')
    .filter('filterRelationCode',filterRelationCode)

  function filterRelationCode(){

      return function(original,materials){
          var relation_Code = 0;
          for (var dict in materials){
              if(original == dict.atstr){
                  return dict.relation_code;
              }
          }
      }

  }
})();
