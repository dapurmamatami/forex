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
              getFFSum: getFFSum,
              getFanInfos:getFanInfos,
              unvisitedMessage: unvisitedMessage,
              getMessageInfo: getMessageInfo,
              visitedMessage: visitedMessage,
              delMessage: delMessage,
              loadMoreMessage:loadMoreMessage,
              getSymbolInfo:getSymbolInfo
          };
          return service;

        /**
         * 获取热门投资话题列表
         * @param startindex  开始位置
         * @returns {HttpPromise}
         */
          function hotInvester(startindex,userCode) {

              return topicHttp.get('/hotinvester', {
                     startindex:startindex,
                     usercode:userCode
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
              return topicHttp.post('/publishtopic', {
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
            function relationTopic(usercode,startindex,isloginuser){
                return topicHttp.get('/relationtopic', {
                          startindex:startindex,
                          usercode:usercode,
                          isloginuser:isloginuser
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
                return topicHttp.post('/docomment',
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
            function doAttention(by_attention_id, usercode, action){
                return  topicHttp.get('/doattention', {
                      by_attention_id: by_attention_id,
                      usercode: usercode,
                      action: action
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
            function getFFSum(userCode, personalUserCode) {
                return topicHttp.get('/attentionsfans', {
                    usercode: userCode,
                    personal_usercode: personalUserCode
                });
            }
             /*
                获取粉丝相关的详细信息
             */ 

            function getFanInfos(userCode){
                return topicHttp.get('/getfansinfos',{
                    usercode:userCode
                })
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

            /**
             *  获取与相关外汇品类相关的话题列表
             * @param symbol
             * @param startIndex
             * @returns {*|HttpPromise}
             */
            function getSymbolInfo(symbol,startIndex){
                return topicHttp.get('/getsymbolinfo',{
                symbol:symbol,
                startIndex:startIndex
              });
            }
            function unvisitedMessage(user_code){
                return topicHttp.post('/message',{
                    protocal:'unvisited',
                    arguments:{
                        user_code:user_code
                    }
                })

            }


          /**
           * 获取Message详细信息
           * @param user_code
           * @param start_index
           * @param offset
           * @returns {*|HttpPromise}
           */
            function getMessageInfo(start_index,offset){
                return topicHttp.post('/message',{
                    protocal:'messageInfo',
                    arguments:{
                      start_index:start_index,
                      offset:offset
                  }})
            }

          /**
           * 处理更新message信息
           * @param user_code
           * @param type
           * @param message_ids
           * @returns {*|HttpPromise}
           */
            function visitedMessage(type,message_ids){
                return topicHttp.post('/message',{
                    protocal:'visitedMessage',
                    arguments:{
                        type:type,
                        message_ids:message_ids
                    }
                })
            }

          /**
           * 删除消息
           * @param user_code
           * @param type
           * @param message_id
           * @returns {*|HttpPromise}
           */
            function delMessage(type,message_id){
                return topicHttp.post('/message',{
                    protocal:'delMessage',
                    arguments:{
                        type:type,
                        message_id:message_id
                    }
                })
            }
            function loadMoreMessage(startIndex,type,offset){
                return topicHttp.post('/message',{
                    protocal:'loadMore',
                    arguments:{
                        start_index:startIndex,
                        type:type,
                        offset:offset
                    }
                });
            }

      }
})();
