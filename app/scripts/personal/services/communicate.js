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
     * 获取热门投资话题列表
     * @param startindex  开始位置
     * @returns {HttpPromise}
     */
      function hotInvester(startindex) {

          return $http.get('/hotinvester_p', {
              params: {
                 "startindex":startindex
              }
          },{
            headers:{'Access-Control-Allow-Headers': 'If-Modified-Since'}
          });
      }


    /**
     * 发表话题
     * @param publish_id
     * @param content
     * @param bytramsmitid
     * @returns {HttpPromise}
     */

      function publishTopic(publish_id,content,bytramsmitid) {
        return $http.get('/publishtopic_p', {
          params: {
            "publish_id":publish_id,
            "content":content,
            "bytramsmitid":bytramsmitid
          }
        });
      }

      /**
       * 获取话题详情
       * @param topicid
       * @param commentstarindex
       * @returns {HttpPromise}
       */
        function topicDetail(topicid,commentstarindex){
          return $http.get('/topicdetail_p',
              {
                  params:{
                      "topic_id":topicid,
                      "comment_startindex":commentstarindex
                  }
              });
        }

        /**
         *
         * 获取关注和粉丝数据
         * @param usercode
         * @returns {HttpPromise}
         */
        function attentionsFans(usercode){
            return $http.get('/attentionsfans_p',
                {
                    params:{
                        "usercode":usercode
                    }
                });
        }

      /**
       * 获取个人关联话题信息
       * @param startindex
       * @param usercode
       * @returns {HttpPromise}
       */
        function relationTopic(startindex,usercode){
            return $http.get('/relationtopic_p',
              {
                  params:{
                      "startindex":startindex,
                      "usercode":usercode
                  }});
        }

      /**
       *  点赞
       * @param type
       * @param usercode
       * @param topicid
       * @returns {HttpPromise}
       */
        function doSupportPoint(type,usercode,topicid){
            return  $http.get('/dosupportpoint_p',{
                params:{
                    "type":type,
                    "usercode":usercode,
                    "topicid":topicid
                }
            });
        }

      /**
       *
       *  评论
       * @param requestJsondata
       * @returns {HttpPromise}
       */
        function doComment(type,usercode,content,topicid){
            return $http.get('/docomment_p',{
                params:{
                    "type":type,
                    "usercode":usercode,
                    "content":content,
                    "topicid":topicid
                }
            });
        }

        /**
         * 关注
         * @param by_attention_id
         * @param usercode
         * @returns {HttpPromise}
         */
        function doAttention(by_attention_id,usercode){
            return  $http.get('/doattention_p', {
                params: {
                    "by_attention_id": by_attention_id,
                    "usercode": usercode
                }
            });
        }

      /**
       * 删除主题或者评论
       * @param usercode
       * @param type
       * @param topicid
       * @returns {HttpPromise}
       */
        function deleteTopic(usercode,type,topicid){
            return $http.get('/deletetopic_p',{
                params:{
                    "usercode":usercode,
                    "type":type,
                    "topicid":topicid
                }
            });
        }
  }
})();
