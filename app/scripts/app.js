'use strict';

var jumboClient = angular
  .module('jumboClient', [
	'ngAnimate',
	'ngCookies',
	'ngResource',
	'ngSanitize',
	'ui.router',
	'ngMaterial',
    'cgBusy',
    'ui.bootstrap',
	'ngStorage',
    'uiGmapgoogle-maps',
    'angularModalService',
    'oitozero.ngSweetAlert',
    'ui-notification',
    'ui.grid',
    'ui.grid.pagination'
 ])

jumboClient.config(function($stateProvider, $urlRouterProvider, $httpProvider, uiGmapGoogleMapApiProvider, NotificationProvider) {

    uiGmapGoogleMapApiProvider.configure({
        //    key: 'your api key',
        v: '3.20', //defaults to latest 3.X anyhow
        libraries: 'weather,geometry,visualization'
    });

    NotificationProvider.setOptions({
            delay: 10000,
            startTop: 20,
            startRight: 10,
            verticalSpacing: 20,
            horizontalSpacing: 20,
            positionX: 'right',
            positionY: 'bottom'
    });
   
    $urlRouterProvider.otherwise('/main/hello');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('main', {
            url: '/main',
            templateUrl: '/views/main.html'
        })

        .state('main.hello', {
            url: '/hello',
            templateUrl: '/views/hello/hello.html'
        })

        .state('main.details', {
            url: '/details/:id',
            templateUrl: '/views/hello/details.html'
        })

        .state('main.login', {
            url: '/login',
            templateUrl: '/views/authentication/login.html'
        })

        .state('main.signUp', {
            url: '/signUp',
            templateUrl: '/views/authentication/signUp.html'
        })

        .state('main.contact', {
                    url: '/contact',
                    templateUrl: '/views/authentication/contact.html'
                })

    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.useXDomain = true;

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
});
