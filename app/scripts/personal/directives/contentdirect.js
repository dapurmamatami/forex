(function(){
  'use strict'

  angular
    .module('tigerwitPersonalApp')
    .directive('contentshow',contentshow);
  //contentshow.$inject = ['$scope','senstiviyWord'];
  function contentshow() {
    return {
      restrict: 'E',
      template: "<p>" +
                    "<span ng-repeat = 'item in contentArray'>" +
                        "<span  ng-if='item.show' class = 'focusname'>{{item.content|senstiviyWord}}</span>" +
                        "<span ng-if='!item.show'>{{item.content|senstiviyWord}}</span>"+
                    "</span>" +
                "</p>",
      replace: true,
      controller: function ($scope) {

        var contentArray = new Array();
        $scope.contentArray = getContentArray(contentArray,$scope.mData['content']);

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

      }
    }
  }
})();
