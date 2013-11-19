/*
 * photogrid
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

'use strict';

var akoenig = akoenig || {};

akoenig.photogrid = angular.module('akoenig.photogrid', []);

akoenig.photogrid.directive('photogrid', [

    'PhotogridDescriptor',

    function (PhotogridDescriptor) {
        return PhotogridDescriptor.create();
    }
]);