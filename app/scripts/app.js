/**
 * @ngdoc overview
 * @name tigerwitPersonalApp
 * @description
 * # tigerwitPersonalApp
 *
 * Main module of the application.
 */
angular
    .module('tigerwitPersonalApp', [
        'ngRoute',
        'ngSanitize',
        'ui.router',
        'ngCookies' //add by fwb
    ]);

angular
    .module('tigerwitPersonalApp')


    .config(['$httpProvider', function ($httpProvider) {
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
        $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';
    }]);

angular
    .module('tigerwitPersonalApp')
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.interceptors.push(['$rootScope', '$location', '$q', 'config',
                function ($rootScope, $location, $q, config) {
            return {
                'request': function(configParam) {
                    configParam.timeout = config.httpTimeout;
                    if (!/^(http|https|ws)/.test(configParam.url) &&
                            !/\.html$/.test(configParam.url)) {

                        if (configParam.url === '/equity_report' ||
                                configParam.url === '/summary_report' ||
                                configParam.url === '/get_info_progress'||
                                configParam.url == '/master_list') {
                            configParam.url = '/api/v2' + configParam.url;
                            return configParam;
                        }

                        if (configParam.url ==='/files/pub_v1.json') {
                            return configParam;
                        }

                        if(/^\/communicate/.test(configParam.url)) {
                            return configParam;
                        }
                        configParam.url = config.apiUrl + configParam.url;
                    }
                    return configParam;
                },
                'response': function(response) {
                    if (/\.html/.test(response.config.url)) {
                        return response;
                    } else {
                        //ga('send', 'event', 'xhr-response', response.config.url, response.status);
                        return response.data;
                    }
                },
                'responseError': function(response) {

                    if (response.status === 401 && $rootScope.resetPassword) {
                        //ga('send', 'event', '401', response.config.url);
                        $location.path('/login')
                        return $q.reject(response);
                    } else {
                        return $q.reject(response);
                    }
                }
            };
        }]);
    }]);

angular
    .module('tigerwitPersonalApp')
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$controllerProvider',
            function ($stateProvider, $urlRouterProvider, $httpProvider, $controllerProvider) {
        $urlRouterProvider.otherwise('/account/login');

        $stateProvider

            .state('personal', {
                views: {
                    '': {
                        templateUrl: 'views/layout/layout-3.html',
                        controller: 'PersonalInfoController'
                    },
                    'hd@personal': {
                        templateUrl: 'views/navbar/navbar-logined.html',
                        controller: 'NavbarController'
                    },
                    'sidebar@personal': {
                        templateUrl: 'views/personal/info_side.html'
                    },
                    'ft@personal': {
                        templateUrl: 'views/layout/footer.html'
                    }
                }
            })
            .state('personal.communicate_info', {
                url: '/personal',
                authenticate: true,
                views: {

                    'content@personal': {
                        templateUrl:  'views/personal/communicate_info.html',
                        controller:'PersonalCommunicateInfoController'
                        },

                    'sidebar-ad@personal': {
                        templateUrl:'views/personal/ad_side.html',
                        controller:''
                    }
                }
            })
            .state('personal.topic_detail', {
                url: '/personal/topic_detail/:topicId',
                authenticate: true,
                views: {
                    'content@personal': {
                        templateUrl:  'views/personal/topic_detail.html',
                        controller:'PersonalTopicDetailController'
                    },

                    'sidebar-ad@personal':{
                        templateUrl: 'views/personal/share_side.html'
                    }
                }
            })
            .state('master', {
                views:{
                    '@':{
                        templateUrl:'views/layout/layout-2-sm.html',
                        controller:'PersonalInfoController'
                    },
                    'hd@master': {
                        templateUrl: 'views/navbar/navbar-logined.html',
                        controller: 'NavbarController'
                    },
                    'sidebar@master':{
                        templateUrl: 'views/master/siderbar.html',
                        controller:''
                    },
                    'ft@master': {
                       templateUrl: 'views/layout/footer.html'
                    }
                }
            })
            .state('master.subPage', {
                url:'/master/:subPage',
                authenticate: true,
                views:{
                    'content@master':{
                        templateUrl:function($stateParams){
                          $stateParams.subPage = $stateParams.subPage || 'recommend';
                          return 'views/master/' + $stateParams.subPage + '.html';
                        },
                      controllerProvider:function($stateParams){
                        var ctrlPrefix = 'Master';
                        var ctrlSuffix = 'Controller';
                        var subPage = $stateParams.subPage || 'recommend';
                        var ctrlRoot = modifyCtrlName(subPage);
                        var ctrlName = ctrlPrefix + ctrlRoot + ctrlSuffix;
                        return 'MasterRankingListController';
                      }
                    }
                }
            })
          .state('class',{
            views:{
              '@':{
                templateUrl:'views/layout/layout-2-sm.html',
                controller:'PersonalInfoController'
              },
              'hd@class': {
                templateUrl: 'views/navbar/navbar-logined.html',
                controller: 'NavbarController'
              },
              'sidebar@class':{
                templateUrl: 'views/class/siderbar.html',
                controller:''
              },
              'ft@class': {
                templateUrl: 'views/layout/footer.html'
              }
            }
          })
          .state('class.subPage',{
            url:'/class/:subPage',
            authenticate: true,
            views:{
              'content@class':{
                templateUrl:function($stateParams){
                  $stateParams.subPage = $stateParams.subPage || 'currency';
                  return 'views/class/' + $stateParams.subPage + '.html';
                }
                ,
                controllerProvider:function($stateParams){
                  var ctrlPrefix = 'Class';
                  var ctrlSuffix = 'Controller';
                  var subPage = $stateParams.subPage || 'currency';
                  var ctrlRoot = modifyCtrlName(subPage);
                  var ctrlName = ctrlPrefix + ctrlRoot + ctrlSuffix;
                  return ctrlName;
                }
              }
            }
          })
          .state('class.detail',{
            url:'/class/detail/:className',
            views:{
              '@':{
                templateUrl:'views/class/layout-2-class.html',
                controller:'PersonalInfoController'
              },
              'hd@class.detail': {
                templateUrl: 'views/navbar/navbar-logined.html',
                controller: 'NavbarController'
              },
              'content@class.detail':{
                templateUrl: 'views/class/classdetail/detail.html',
                controller: 'ClassDetailController'
              },
              'lsider@class.detail':{
                templateUrl: 'views/class/classdetail/lsider.html',
                controller:''
              },
              'rsider@class.detail':{
                templateUrl: 'views/class/classdetail/rsider.html',
                controller:''
              },
              'ft@class.detail': {
                templateUrl: 'views/layout/footer.html'
              }
            }
          })

            .state('message', {
                url:'/message/:type_message',
                authenticate: true,
                views:{
                    '@':{
                        templateUrl:'views/layout/layout-msg.html',
                        controller:'PersonalInfoController'
                    },
                    'hd@message': {
                        templateUrl: 'views/navbar/navbar-logined.html',
                        controller: 'NavbarController'
                    },
                    'sidebar@message':{
                        templateUrl: 'views/message/ad_side.html',
                        controller:'MsgSideController'
                    },
                    'content@message':{
                        templateUrl: 'views/message/message.html',
                        controller:'MessageController'
                    },
                    'ft@message': {
                        templateUrl: 'views/layout/footer.html'
                    }
                }
            })

            .state('invest', {
                url: '/invest/:userCode',
                authenticate: true,
                views: {
                    '@': {
                        templateUrl: 'views/layout/layout-2.html',
                        controller: 'PersonalInfoController'
                    },
                    'hd@invest': {
                        templateUrl: 'views/navbar/navbar-logined.html',
                        controller: 'NavbarController'
                    },
                    'sidebar@invest': {
                        templateUrl: 'views/personal/info_side.html',
                        controller: 'UserInfoController'
                    },
                    'content@invest': {
                        templateUrl: 'views/invest/index.html',
                        controller: 'InvestIndexController'
                    },
                    'ft@invest': {
                        templateUrl: 'views/layout/footer.html'
                    }
                }
            })
            .state('invest.subPage', {
                url: '/:subPage?type',
                authenticate: true,
                views: {
                    '@invest': {
                        templateUrl: function ($stateParams) {
                            $stateParams.subPage = $stateParams.subPage || 'summary';
                            return 'views/invest/' + $stateParams.subPage + '.html';
                        },
                        controllerProvider: function ($stateParams) {
                            var ctrlPrefix = 'Invest';
                            var ctrlSuffix = 'Controller';
                            var subPage = $stateParams.subPage || 'summary';
                            var ctrlRoot = modifyCtrlName(subPage);
                            var ctrlName = ctrlPrefix + ctrlRoot + ctrlSuffix;
                            return ctrlName;
                        }
                      },
                    'content@invest.subPage':{
                      templateUrl: 'views/personal/communicate_info.html',
                      controller: 'PersonalCommunicateInfoController'
                    },
                    'sidebar-ad@invest.subPage':{
                      templateUrl: 'views/invest/summary_side.html',
                      controller: 'InvestSummaryController'
                    }
                }
            })

            .state('setting', {
                views: {
                    '@': {
                        templateUrl: 'views/layout/layout-2-sm.html',
                        controller: 'PersonalInfoController'
                    },
                    'hd@setting': {
                        templateUrl: 'views/navbar/navbar-logined.html',
                        controller: 'NavbarController'
                    },
                    'sidebar@setting': {
                        templateUrl: 'views/setting/sidebar.html'
                    },
                    'ft@setting': {
                        templateUrl: 'views/layout/footer.html'
                    }
                }
            })
            .state('setting.emailVerify', {
                url: '/setting/email_verify?success',
                views: {
                    '@': {
                        templateUrl: 'views/setting/email_verify.html',
                        controller: 'SettingEmailVerifyController'
                    }
                }
            })
            .state('setting.subPage', {
                url: '/setting/:subPage',
                authenticate: true,
                views: {
                    'content@setting': {
                        templateUrl: function ($stateParams) {
                            $stateParams.subPage = $stateParams.subPage || 'basic';
                            return 'views/setting/' + $stateParams.subPage + '.html';
                        },
                        controllerProvider: function ($stateParams) {
                            var ctrlPrefix = 'Setting';
                            var ctrlSuffix = 'Controller';
                            var subPage = $stateParams.subPage || 'basic';
                            var ctrlRoot = modifyCtrlName(subPage);
                            var ctrlName = ctrlPrefix + ctrlRoot + ctrlSuffix;
                            return ctrlName;
                        }
                    }
                }
            })

            .state('money', {
                views: {
                    '@': {
                        templateUrl: 'views/layout/layout-2-sm.html',
                        controller: 'PersonalInfoController'
                    },
                    'hd@money': {
                        templateUrl: 'views/navbar/navbar-logined.html',
                        controller: 'NavbarController'
                    },
                    'sidebar@money': {
                        templateUrl: 'views/money/sidebar.html'
                    },
                    'ft@money': {
                        templateUrl: 'views/layout/footer.html'
                    }
                }
            })
            .state('money.subPage', {
                url: '/money/:subPage',
                authenticate: true,
                views: {
                    'content@money': {
                        templateUrl: function ($stateParams) {
                            $stateParams.subPage = $stateParams.subPage || 'history';
                            return 'views/money/' + $stateParams.subPage + '.html';
                        },
                        controllerProvider: function ($stateParams) {
                            var ctrlPrefix = 'Money';
                            var ctrlSuffix = 'Controller';
                            var subPage = $stateParams.subPage || 'history';
                            var ctrlRoot = modifyCtrlName(subPage);
                            var ctrlName = ctrlPrefix + ctrlRoot + ctrlSuffix;
                            return ctrlName;
                        }
                    }
                }
            })

            .state('account', {
                views: {
                    '@': {
                        templateUrl: 'views/layout/layout-1.html'
                    },
                    'hd@account': {
                        templateUrl: 'views/layout/header.html'
                    },
                    'ft@account': {
                        templateUrl: 'views/layout/footer-sm.html'
                    }
                }
            })
            .state('account.login', {
                url: '/account/login',
                views: {
                    '@': {
                        templateUrl: 'views/account/login.html',
                        controller: 'AccountLoginController'
                    }
                }
            })
            .state('account.subPage', {
                url: '/account/:subPage',
                views: {
                    'bd@account': {
                        templateUrl: function($stateParams) {
                            return 'views/account/' + $stateParams.subPage + '.html';
                        },
                        controllerProvider: function($stateParams) {
                            var ctrlPrefix = 'Account';
                            var ctrlSuffix = 'Controller';
                            var subPage = $stateParams.subPage;
                            var ctrlRoot = modifyCtrlName(subPage);
                            var ctrlName = ctrlPrefix + ctrlRoot + ctrlSuffix;
                            return ctrlName;
                        }
                    }
                }
            })

            // 各种静态页面的配置
            .state('static', {
                url: '/static/:subPage',
                views: {
                    '@': {
                        templateUrl: function ($stateParams) {
                            return 'views/web/' + $stateParams.subPage + '.html';
                        }
                    }
                }
            });

            function modifyCtrlName(name) {
                var strArray = name.split(/[-_]/i);

                var i,
                    length = strArray.length,
                    tmpStr = '',
                    newName = '';

                for (i = 0;i < length;i++) {
                    tmpStr = strArray[i].charAt(0).toUpperCase() +
                            strArray[i].substring(1);
                    newName += tmpStr;
                }

                return newName;
            }
    }])

    .run(['$rootScope', '$state', '$stateParams', 'authorization',
            function ($rootScope, $state, $stateParams, authorization) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {
            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;

            if (toState.authenticate) {
                authorization.authorize();
            }
        });

        $rootScope.$on('$stateChangeSuccess', function () {
        });

    }]);








