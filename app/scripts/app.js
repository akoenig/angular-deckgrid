'use strict';

angular.module('angularPhotogridApp', ['ngRoute', 'akoenig.photogrid']).config([

    '$routeProvider',

    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/main.html',
                controller: 'MainCtrl'
            })
            .when('/dashboard', {
                templateUrl: 'views/dashboard.html',
                controller: 'DashboardCtrl'
            })
            .otherwise({
                redirectTo: '/'
            });
    }
]);
