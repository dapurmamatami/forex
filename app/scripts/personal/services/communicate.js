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
     * 鑾峰彇鐑棬鎶曡祫璇濋鍒楄〃
     * @param startindex  寮€濮嬩綅缃     * @returns {HttpPromise}
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
     *
     * 鍙戣〃璇濋
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
       * 鑾峰彇璇濋璇︽儏
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
         * 鑾峰彇鍏虫敞鍜岀矇涓濇暟鎹         * @param usercode
         * @returns {HttpPromise}
         */
        function attentionsFans(usercode){
        return $http.get('/attentionsfans_p',{
                    params:{
                        "usercode":usercode
                    }
        });
        }

      /**
       * 鑾峰彇涓汉鍏宠仈璇濋淇℃伅
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
       *  鐐硅禐
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
     *
     * 鐐硅禐
     * @param requestJsondata
     * @returns {HttpPromise}
     */
      function doSupportPoint(requestJsondata){
        return  $http.get('/dosupportpoint_p',{
          params:requestJsondata
        });
      }

        /**
         *  璇勮
         * @param type
         * @param usercode
         * @param content
         * @param topicid
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
     *
     *  璇勮
     * @param requestJsondata
     * @returns {HttpPromise}
     */
      function doComment(requestJsondata){
        return $http.get('/docomment_p',{
          params:requestJsondata
        });
      }

        /**
         * 鍏虫敞
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
       * 鍒犻櫎涓婚鎴栬€呰瘎璁       * @param usercode
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
