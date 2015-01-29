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
     * 閼惧嘲褰囬悜顓㈡，閹舵洝绁拠婵嬵暯閸掓銆     
     * @param startindex  瀵偓婵缍呯純     
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
     *
     * 閸欐垼銆冪拠婵嬵暯
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
       * 閼惧嘲褰囩拠婵嬵暯鐠囷附鍎       * @param topicid
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
         * 閼惧嘲褰囬崗铏暈閸滃瞼鐭囨稉婵囨殶閹        * @param usercode
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
       * 閼惧嘲褰囨稉顏冩眽閸忓疇浠堢拠婵嬵暯娣団剝浼       * @param startindex
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
       *  閻愮绂       * @param type
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
     * 閻愮绂     
     * @param requestJsondata
     * @returns {HttpPromise}
     */
      function doSupportPoint(requestJsondata){
        return  $http.get('/dosupportpoint_p',{
          params:requestJsondata
        });
      }

        /**
         *  鐠囧嫯顔         * @param type
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
     *  鐠囧嫯顔     
     * @param requestJsondata
     * @returns {HttpPromise}
     */
      function doComment(requestJsondata){
        return $http.get('/docomment_p',{
          params:requestJsondata
        });
      }

        /**
         * 閸忚櫕鏁         * @param by_attention_id
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
       * 閸掔娀娅庢稉濠氼暯閹存牞鈧懓鐦庣拋      
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
