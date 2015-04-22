(function(){
  'use strict';

  angular
    .module('tigerwitPersonalApp')
    .directive('twContentShow',twContentShow);
  twContentShow.$inject = ['$state','$window'];
  function twContentShow($state,$window) {
      return {
          restrict: 'E',
          scope:{
              showContent: '=info',
              map: '=',
              thatWas:'@was'
          },
          template: "<p>" +
                        "<span ng-repeat = 'cItem in contentArray' ng-if='cItem'>" +
                            "<span ng-class = '{focus_name : cItem.show}' ng-click='skipToSomeThing(cItem.content)'>{{cItem.content}}</span>" +
                        "</span>" +
                    "</p>",
          replace:true,
          controller: function ($scope) {

              $scope.skipToSomeThing = skipToSomeThing ;

              function skipToSomeThing(key){
                  if(/^\$/.test(key)){
                      $state.go('class.detail',{className:key.substring(1)})
                  }else if(/^@/.test(key)){
                      $state.go('invest.subPage',{userCode:$scope.map[key.substring(1)],subPage:'summary'})
                  }else if(/http\:\/\//.test(key)){
                      $window.open(key);
                  }
              }

              $scope.$watch('showContent',function(){
                  if(!$scope.showContent) return;
                  $scope.contentArray = [];
                  $scope.contentArray = getContentArray($scope.contentArray,$scope.showContent,$scope.thatWas);
              }
            ) ;
          }
      }
  }
  function getContentArray(arrayContent, content,thatWas) {

      var regex = /@\S+|\$\S+|http:\/\/\S+/g;
      var tail = '';
      if(content.length>128&&!thatWas){
          content = content.substring(0,128);
          tail = '...';
      }

      var count = 0;
      var mached = [];
      if (mached = regex.exec(content)) {
          var speacial = mached[0];
          if (regex.lastIndex > speacial.length) {
              var reStr = content.substring(0, regex.lastIndex - speacial.length);
              arrayContent.push({
                show: false,
                content: reStr
              });
          }
          arrayContent.push({
            show: true,
            content: speacial
          });
          if (content.length > regex.lastIndex) {
              return getContentArray(arrayContent,content.substring(regex.lastIndex));
          } else {
              if(tail){
                  arrayContent.push({
                      show:false,
                      content:tail
                  })
              }
              return arrayContent;
          }
      } else {
          arrayContent.push({
              show: false,
              content: content
          });
          if(tail){
              arrayContent.push({
                  show:false,
                  content:tail
              })
          }

        return arrayContent;
      }
  }
})();
