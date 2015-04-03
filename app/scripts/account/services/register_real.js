;
(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .factory('registerReal', registerReal);

    registerReal.$inject = ['account'];

    // 因为有多种注册真实账户的方式，故把共用部分抽离出来
    function registerReal(accountService) {
        var service = {
            checkIdExist: checkIdExist,
            eliminateErr: eliminateErr,
            postNameId: postNameId,
            submitQuest: submitQuest
        };
        return service;

        // 提交姓名和身份证号（以及fork code），并验证身份证号码是否有效
        function postNameId(account) {
            return accountService.setInfo(account.name, account.id.number, account.forkCode).then(function (data) {
        
                if (data.is_succ) {
                    account.id.valid = true;
                    return true;
                } else {
                    account.id.valid = false;
                    return false;
                }
            });
        }

        // 检查身份证号码是否存在
        function checkIdExist(id) {
            return accountService.checkExist(id.number).then(function (data) {

                if (data.data) {
                    id.existence = true;
                    return false;
                } else {
                    id.existence = false;
                    return true;
                }
            });
        }

        function eliminateErr(id) {
            id.valid = true;
        }

        // 提交问卷
        function submitQuest(account) {
            return accountService.submitQuest(account.employment, account.income, account.experience);
        }
    }
})();