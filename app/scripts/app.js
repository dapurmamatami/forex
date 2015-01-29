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
                                configParam.url === '/get_info_progress') {
                            configParam.url = '/api/v2' + configParam.url;
                            return configParam;
                        }

                        //add by fwb
                        if(/_p$/.test(configParam.url)) {
                            configParam.url = config.personalUrl + configParam.url;
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
        $urlRouterProvider.otherwise('/invest/summary');

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
                    'sidebar-ad@personal': {
                        templateUrl: 'views/personal/ad_side.html'
                    },
                    'ft@personal': {
                        templateUrl: 'views/layout/footer.html'
                    }
                }
            })
            .state('personal.subPage', {
                url: '/personal/:subPage',
                views: {
                    'content@personal': {
                        templateUrl: function ($stateParams) {
                            $stateParams.subPage = $stateParams.subPage || 'communicate_info';
                            return 'views/personal/' + $stateParams.subPage + '.html';
                        },
                        controllerProvider: function ($stateParams) {
                            var ctrlPrefix = 'Personal';
                            var ctrlSuffix = 'Controller';
                            var subPage = $stateParams.subPage || 'communicate_info';
                            var ctrlRoot = modifyCtrlName(subPage);
                            var ctrlName = ctrlPrefix + ctrlRoot + ctrlSuffix;
                            return ctrlName;

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
                        }
                    }
                }
            })

            .state('invest', {
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
                        templateUrl: 'views/personal/info_side.html'
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
                url: '/invest/:subPage',
                views: {
                    '@invest': {
                        templateUrl: function ($stateParams) {
                            $stateParams.subPage = $stateParams.subPage || 'summary';
                            var url = 'views/invest/' + $stateParams.subPage + '.html';
                            return 'views/invest/' + $stateParams.subPage + '.html';
                        },
                        controllerProvider: function($stateParams) {

                            var ctrlPrefix = 'Invest';
                            var ctrlSuffix = 'Controller';
                            var subPage = $stateParams.subPage || 'summary';
                            var ctrlRoot = modifyCtrlName(subPage);
                            var ctrlName = ctrlPrefix + ctrlRoot + ctrlSuffix;
                            return ctrlName;

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
                        }
                    }
                }
            });
    }]);








