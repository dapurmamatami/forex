(function(){
    'use strict';
    angular
      .module('tigerwitPersonalApp')
      .controller('MessageController',MessageController);

    MessageController.$inject=['$scope','$state','$cookieStore','communicate'];


    function MessageController($scope,$state,$cookieStore,communicate){

        $scope.switchMessageData = switchMessageData;
        $scope.loadMore = loadMore;
        $scope.deleteMessage = deleteMessage;
        $scope.unvisit_total_sum =$cookieStore.get('sys_unvisited_sum') + $cookieStore.get('user_unvisited_sum');
        $scope.msg_type = $state.params.type_message;


        function switchMessageData(type){
            if(type == 'sys'){
                $scope.message_show_data = $scope.sys_message;
                $scope.unvisit_item_sum = $scope.unvisited_sys;
                $scope.message_title_tip = "系统消息";
                $scope.sys_msg_selected = true;
                $scope.self_msg_selected = false;
                updateMessages($scope.message_show_data,type);

            }else{
                $scope.message_show_data = $scope.user_message;
                $scope.unvisit_item_sum = $scope.unvisited_user;
                $scope.message_title_tip = "我的消息";
                $scope.self_msg_selected = true;
                $scope.sys_msg_selected = false;
                updateMessages($scope.message_show_data,type);
            }
            $scope.msg_type = type;
        }
        function getMessageInfo(item){

            communicate.getMessageInfo(0,10).then(function(data){
                if(data.statecode){
                  $scope.unvisited_sys = data.data.unvisited_sum.sys_unvisited_sum;
                  $scope.unvisited_user = data.data.unvisited_sum.user_unvisited_sum;
                  $scope.sys_message = data.data.sys;
                  $scope.user_message = data.data.user;
                  switchMessageData(item);
                }
            });
        }
        function updateMessages(data,type) {
            var visited_ids = [];
            //var visited_cache = [];
            for (var x in data) {
                var item = data[x];
                if (!item.visited) {
                    visited_ids.push(item.id);

                }
                //item.visited = 1;
                //visited_cache.push(item);
            }

            if (visited_ids.length>0) {
                communicate.visitedMessage(type, visited_ids).then(function (data) {
                    if (data.statecode) {
                        console.info('update message ok !');
                    }
                });
            }
        }

        function deleteMessage(index,msgId){
            communicate.delMessage($scope.msg_type,msgId).then(function(data){
                if(data.statecode){
                    $scope.message_show_data.splice(index);
                }

            });
        }

        function loadMore(){
            communicate
                .loadMoreMessage($scope.message_show_data.length,
                $scope.msg_type,10).then(function(data){
                    if(data.statecode){
                        if(data.data.length>0){
                            if($scope.msg_type == 'sys'){
                                $scope.sys_message.push(data.data);

                            }else{
                                $scope.user_message.push(data.data);
                            }
                        }
                    }
                    $scope.$broadcast('stopLoadingMore');
                });
        }
        getMessageInfo($scope.msg_type);
    }

})();
