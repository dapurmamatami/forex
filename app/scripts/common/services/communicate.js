(function(){
  'use strict';

      angular
        .module('tigerwitPersonalApp')
        .factory('communicate',communicate);

      communicate.$inject = ['topicHttp'];

      function communicate(topicHttp) {

          var service = {
              hotInvester: hotInvester,
              publishTopic: publishTopic,
              topicDetail: topicDetail,
              attentionsFans: attentionsFans,
              relationTopic: relationTopic,
              doSupportPoint: doSupportPoint,
              doComment: doComment,
              doAttention: doAttention,
              deleteTopic: deleteTopic,
              getRemainDiscuss:getRemainDiscuss,
              getFFSum: getFFSum
          };
          return service;

        /**
         * 获取热门投资话题列表
         * @param startindex  开始位置
         * @returns {HttpPromise}
         */
          function hotInvester(startindex) {

              return topicHttp.get('/hotinvester', {
                     startindex:startindex
                  }
              );
          }


        /**
         * 发表话题
         * @param publisher_id
         * @param content
         * @param bytramsmitid
         * @returns {HttpPromise}
         */

          function publishTopic(publisher_id,content,bytramsmitid) {
              return topicHttp.get('/publishtopic', {
                    publisher_id:publisher_id,
                    content:content,
                    bytramsmitid:bytramsmitid
                  }
              );
          }

          /**
           * 获取话题详情
           * @param topicid
           * @param commentstarindex
           * @returns {HttpPromise}
           */
            function topicDetail(topicid,commentstarindex){
                return topicHttp.get('/topicdetail', {
                          topic_id:topicid,
                          comment_startindex:commentstarindex
                      }
                    );
            }

            /**
             * 获取关注和粉丝数据
             * @param usercode
             * @returns {HttpPromise}
             */
            function attentionsFans(usercode){
                return topicHttp.get('/attentionsfans', {
                          usercode:usercode
                      }
                    );
            }

          /**
           * 获取个人关联话题信息
           * @param usercode
           * @param startindex
           * @returns {HttpPromise}
           */
            function relationTopic(usercode,startindex){
                return topicHttp.get('/relationtopic', {
                          startindex:startindex,
                          usercode:usercode
                      });
            }

          /**
           *  点赞
           * @param type
           * @param usercode
           * @param topicid
           * @returns {HttpPromise}
           */
            function doSupportPoint(type,usercode,topicid){
                return  topicHttp.get('/dosupportpoint',
                    {
                        type:type,
                        usercode:usercode,
                        topicid:topicid
                    }
                );
            }

            /**
             *  评论
             * @param type
             * @param usercode
             * @param content
             * @param topicid
             * @returns {HttpPromise}
             */
            function doComment(type,usercode,content,topicid){
                return topicHttp.get('/docomment',
                    {
                        type:type,
                        usercode:usercode,
                        content:content,
                        topicid:topicid
                    }
                );
            }

            /**
             * 关注
             * @param by_attention_id
             * @param usercode
             * @returns {HttpPromise}
             */
            function doAttention(by_attention_id,usercode){
                return  topicHttp.get('/doattention', {
                      by_attention_id: by_attention_id,
                      usercode: usercode
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
                return topicHttp.get('/deletetopic',{
                    usercode:usercode,
                    type:type,
                    topicid:topicid
                });
            }

            /**
             * 获取剩余所有的二级评论
             * @param by_comment_id
             * @param startindex
             * @returns {*}
             */
            function getRemainDiscuss(by_comment_id,start_id){
                return topicHttp.get('/getremaindiscuss',{
                    by_comment_id:by_comment_id,
                  start_id:start_id
                });

            }

            /**
             * 获取 following、fan 总数
             */
            function getFFSum(userCode) {
                return topicHttp.get('/attentionsfans', {
                    usercode: userCode
                });
            }

            /**
             * 删除话题或者评论
             * @param usercode
             * @param type
             * @param topicid
             * @returns {*}
             */
            function deleteTopic(usercode,type,topicid){
                return topicHttp.get('/deletetopic',{
                    usercode:usercode,
                    type:type,
                    topicid:topicid
                })
            }
      }
})();
