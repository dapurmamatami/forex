(function(){
  'use strict'
  angular.module('tigerwitPersonalApp')
    .factory('CommunicateData',CommunicateData);

  CommunicateData.$injector = ['$http'];
  function CommunicateData($http) {

      function hotInvester(requestJsondata) {
        var promise = $http.post('http://127.0.0.1:5002/communicate/api/hotinvester', JSON.stringify(requestJsondata));
        return promise;
      }

      function publishTopic(requestJsondata){
        var promise = $http.post('http://127.0.0.1:5002/communicate/api/publishtopic',JSON.stringify(requestJsondata));
        return promise;
      };
      function topicDetail(requestJsondata){
        var promise = $http.post('http://127.0.0.1:5002/communicate/api/topicdetail',JSON.stringify(requestJsondata));
        return promise;
      };
      function attentionsFans(requestJsondata){
        var promise = $http.post('http://127.0.0.1:5002/communicate/api/attentionsfans',JSON.stringify(requestJsondata));
        return promise;
      };
      function relationTopic(requestJsondata){
        var promise = $http.post('http://127.0.0.1:5002/communicate/api/relationtopic',JSON.stringify(requestJsondata));
        return promise;
      };
      function doSupportPoint(requestJsondata){
        var promise = $http.post('http://127.0.0.1:5002/communicate/api/dosupportpoint',JSON.stringify(requestJsondata));
        return promise;
      };
      function doComment(requestJsondata){
        var promise = $http.post('http://127.0.0.1:5002/communicate/api/docomment',JSON.stringify(requestJsondata));
        return promise;
      };
      function doAttention(requestJsondata){
        var promise = $http.post('http://127.0.0.1:5002/communicate/api/doattention',JSON.stringify(requestJsondata));
        return promise;
      };
      function deleteTopic(requestJsondata){
        var promise = $http.post('http://127.0.0.1:5002/communicate/api/deletetopic',JSON.stringify(requestJsondata));
        return promise;
      };

    return {
      hotInvester: hotInvester,
      publishTopic:publishTopic,
      topicDetail:topicDetail,
      attentionsFans:attentionsFans,
      relationTopic:relationTopic,
      doSupportPoint:doSupportPoint,
      doComment:doComment,
      doAttention:doAttention,
      deleteTopic:deleteTopic
    };
  }

})()
