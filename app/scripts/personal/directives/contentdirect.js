(function(){
  'use strict'

  angular
    .module('tigerwitPersonalApp')
    .directive('contentshow',contentshow);
  function contentshow() {
    return {
      restrict: 'E',
      template: "<p>" +
                    "<span ng-repeat = 'citem in contentArray' ng-if='citem'>" +
                        "<span  ng-if='citem.show' class = 'focusname'>{{citem.content|senstiviyWord}}</span>" +
                        "<span ng-if='!citem.show'>{{citem.content|senstiviyWord}}</span>"+
                    "</span>" +
                "</p>",
      replace: true,
      controller: function ($scope) {


        $scope.$watch('pContent',function(newValue,oldValue,scope){
            if(!newValue) return;
            $scope.contentArray = [];
            $scope.contentArray = getContentArray($scope.contentArray,$scope.pContent);

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
          });
      }
    }
  }
})();
