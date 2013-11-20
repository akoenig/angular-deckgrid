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

angular.module('akoenig.deckgrid.demo').directive('imageloaded', [

    function () {

        'use strict';

        return {
            restrict: 'A',

            link: function(scope, element, attrs) {   
                var cssClass = attrs.loadedclass;

                element.bind('load', function (e) {
                    angular.element(element).addClass(cssClass);
                });
            }
        }
    }
]);