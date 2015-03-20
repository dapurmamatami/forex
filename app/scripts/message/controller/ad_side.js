(function(){
    'use strict';
    angular
      .module('tigerwitPersonalApp')
      .controller('MsgSideController',MsgSideController);
    MsgSideController.$inject = ['$scope'];
    function MsgSideController($scope){
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
    }
})();
