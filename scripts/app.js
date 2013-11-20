/*
 * angular-deckgrid-demo
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de)
 *
 */

angular.module('akoenig.deckgrid.demo', [
    'ngRoute',
    'akoenig.deckgrid'
]);

angular.module('akoenig.deckgrid.demo').config([

    '$routeProvider',

    function configure ($routeProvider) {

        'use strict';

        $routeProvider.when('/', {
            controller: 'HomeController',
            templateUrl: 'templates/home.html'
        });

    }
]);