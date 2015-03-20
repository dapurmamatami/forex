(function () {
    'use strict';

    angular
        .module('tigerwitPersonalApp')
        .filter('symbolToCn', symbolToCn);

    function symbolToCn() {
        return function (input) {

            if (input) {
                if(input=="AUDJPY"){
                  return '澳元日元';
                }
                if(input=="AUDUSD"){
                  return '澳元美元';
                }
                if(input=="CHFJPY"){
                  return '瑞元日元';
                }
                if(input=="EURAUD") {
                  return '欧元瑞元';
                }
                if(input=="EURCHF"){
                  return '欧元瑞元';
                }
                if(input=="EURGBP"){
                  return '欧元英元';
                }
                if(input=="EURJPY"){
                  return '欧元日元';
                }
                if(input=="EURUSD"){
                  return '欧元美元';
                }
                if(input=="GBPCHF"){
                  return '英日瑞元';
                }
                if(input=="GBPJPY"){
                  return '英元日元';
                }
                if(input=="GBPUSD"){
                  return '英元美元';
                }
                if(input=="NZDUSD"){
                  return '新西兰元美元';
                }
                if(input=="USDCAD"){
                  return '美元加元';
                }
                if(input=="USDCHF"){
                  return '美元瑞元';
                }
                if(input=="USDJPY"){
                  return '美元日元';
                }
                if(input=="GOLD"){
                  return '黄金';
                }
                if(input=="SILVER"){
                  return '白银';
                }
                if(input=="DAX"){
                  return '法兰克福指数期货';
                }if(input=="FFI"){
                  return '伦敦金融时报指数期货';
                }
                if(input=="mDJ"){
                  return '美元日元';
                }if(input=="mND"){
                  return '美元日元';
                }
                if(input=="mSP"){
                  return '美元日元';
                }if(input=="NK"){
                  return '美元日元';
                }
                if(input=="USDX"){
                  return '美元日元';
                }if(input=="WTOil"){
                  return '美元日元';
                }

            }
        }
    }
})();
