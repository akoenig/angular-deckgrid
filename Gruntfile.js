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

module.exports = function (grunt) {

    'use strict';

    var banner = '/*! <%= pkg.name %> (v<%= pkg.version %>) - Copyright: 2013 - 2014, <%= pkg.author %> - <%= pkg.license %> */\n';

    grunt.initConfig({
        pkg: grunt.file.readJSON('bower.json'),
        uglify: {
            options: {
                preserveComments: 'some',
                report: 'gzip'
            },
            dist: {
                src: '<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.min.js'
            }
        },
        concat: {
            options: {
                banner: banner
            },
            dist: {
                src: ['src/index.js', 'src/descriptor.js', 'src/deckgrid.js'],
                dest: '<%= pkg.name %>.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                'src/*.js',
                'test/*.js'
            ]
        },
        karma: {
            dist: {
                configFile: 'karma.conf.js'
            },
            watch: {
                configFile: 'karma.conf.js',
                singleRun: false,
                autoWatch: true
            }
        },
        ngmin: {
            dist: {
                src: '<%= pkg.name %>.js',
                dest: '<%= pkg.name %>.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.registerTask('test', ['jshint', 'karma:dist']);
    grunt.registerTask('default', ['test', 'concat', 'uglify']);
};