/*
 * angular-deckgrid
 *
 * Copyright(c) 2013-2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de)
 *
 */

module.exports = function (config) {

    'use strict';

    config.set({
        basePath: '',

        frameworks: ['jasmine'],

        files: [
            'bower_components/jquery/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'src/index.js',
            'src/descriptor.js',
            'src/deckgrid.js',
            'specs/*.js'
        ],

        exclude: [],

        port: 8080,

        logLevel: config.LOG_DEBUG,

        autoWatch: false,

        browsers: ['Chrome'],

        singleRun: true
    });
};