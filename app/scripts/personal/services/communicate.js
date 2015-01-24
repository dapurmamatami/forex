(function(){
  'use strict';

  angular
    .module('tigerwitPersonalApp')
    .factory('communicate',communicate);

  communicate.$inject = ['$http'];

  function communicate($http) {

    var service = {
      hotInvester: hotInvester,
      publishTopic: publishTopic,
      topicDetail: topicDetail,
      attentionsFans: attentionsFans,
      relationTopic: relationTopic,
      doSupportPoint: doSupportPoint,
      doComment: doComment,
      doAttention: doAttention,
      deleteTopic: deleteTopic
    };
    return service;

    /**
     *  获取热门投资动态信息
     * @param requestJsondata
     * @returns {HttpPromise}
     */
    function hotInvester(requestJsondata) {

      return $http.get('/hotinvester_p', {
        params: requestJsondata
      },{
        headers:{'Access-Control-Allow-Headers': 'If-Modified-Since'}
      });
    }

    /**
     *
     * 发表话题
     * @param requestJsondata
     * @returns {HttpPromise}
     */

    function publishTopic(requestJsondata) {
      return $http.get('/publishtopic_p', {
        params: requestJsondata
      });
    }

    /**
     * 获取话题详情
     * @param requestJsondata
     * @returns {HttpPromise}
     */
      function topicDetail(requestJsondata){
        return $http.get('/topicdetail_p',
          {
            params:requestJsondata
          });
      }

    /**
     *
     * 获取关注和粉丝数据
     * @param requestJsondata
     * @returns {HttpPromise}
     */
      function attentionsFans(requestJsondata){
        return $http.get('/attentionsfans_p',
          {
            params:requestJsondata
          });
      }

    /**
     *
     * 获取相关联的动态信息
     * @param requestJsondata
     * @returns {HttpPromise}
     */
      function relationTopic(requestJsondata){
        return $http.get('/relationtopic_p',
          {
            params:requestJsondata
          });
      }

    /**
     *
     *
     * 点赞
     * @param requestJsondata
     * @returns {HttpPromise}
     */
      function doSupportPoint(requestJsondata){
        return  $http.get('/dosupportpoint_p',{
          params:requestJsondata
        });
      }

    /**
     *
     *  评论
     * @param requestJsondata
     * @returns {HttpPromise}
     */
      function doComment(requestJsondata){
        return $http.get('/docomment_p',{
          params:requestJsondata
        });
      }

    /**
     *  关注
     * @param requestJsondata
     * @returns {HttpPromise}
     */
      function doAttention(requestJsondata){
        return  $http.get('/doattention_p',{
          params:requestJsondata
        });
      }

    /**
     * 删除已经发表的话题
     * @param requestJsondata
     * @returns {HttpPromise}
     */
      function deleteTopic(requestJsondata){
        return $http.get('/deletetopic_p',{
          params:requestJsondata
        });
      }
  }
})();
