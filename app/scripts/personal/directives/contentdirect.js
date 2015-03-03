(function(){
  'use strict'

  angular
    .module('tigerwitPersonalApp')
    .directive('twContentShow',twContentShow);
  function twContentShow() {
      return {
          restrict: 'E',
          scope:{
              showContent: '=info'
          },
          template: "<p>" +
                        "<span ng-repeat = 'cItem in contentArray' ng-if='cItem'>" +
                            "<span ng-class = '{focus_name : cItem.show}'>{{cItem.content}}</span>" +
                        "</span>" +
                    "</p>",
          replace:true,
          controller: function ($scope) {
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

    var regex = /^@\S+\s|^\$\S+\s|\s@\S+\s|\s\$\S+\s/g;

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
        return arrayContent;
      }
    } else {
      arrayContent.push({
        show: false,
        content: content
      });
      return arrayContent;
    }
  }
})();
