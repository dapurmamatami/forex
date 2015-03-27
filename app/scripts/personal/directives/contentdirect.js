(function(){
  'use strict'

  angular
    .module('tigerwitPersonalApp')
    .directive('twContentShow',twContentShow);
  function twContentShow() {
      return {
          restrict: 'E',
          scope:{
              showContent: '=info',
              map: '='
          },
          template: "<p>" +
                        "<span ng-repeat = 'cItem in contentArray' ng-if='cItem'>" +
                            "<span ng-class = '{focus_name : cItem.show}' ng-click='skipToSomeThing(cItem.content)'>{{cItem.content}}</span>" +
                        "</span>" +
                    "</p>",
          replace:true,
          controller: function ($scope,$state) {

              $scope.skipToSomeThing = skipToSomeThing ;

              function skipToSomeThing(key){
                  if(key.startsWith('$')){
                      $state.go('class.detail',{className:$scope.map[key]})
                  }else if(key.startsWith('@')){
                      $state.go('invest.subPage',{userCode:$scope.map[key],subPage:'summary'})
                  }

              }

              $scope.$watch('showContent',function(){
                  if(!$scope.showContent) return;
                  $scope.contentArray = [];
                  $scope.contentArray = getContentArray($scope.contentArray,$scope.showContent);
              }
            ) ;
          }
      }
  }
  function getContentArray(arrayContent, content) {

      var regex = /@\S+|\$\S+/g;
      var tail = '';
      if(content.length>128){
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
