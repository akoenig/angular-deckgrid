/*
 * photogrid
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de)
 *
 */

angular.module('akoenig.photogrid', []);

angular.module('akoenig.photogrid').directive('photogrid', [

    'PhotogridDescriptor',

    function initialize (PhotogridDescriptor) {

        'use strict';

        return PhotogridDescriptor.create();
    }
]);