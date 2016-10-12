/*
 * angular-deckgrid
 *
 * Copyright(c) 2013-2016 André König <andre.koenig@posteo.de> / Mark Hamilton <mark@dryverless.com>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de) / Mark Hamilton (mark@dryverless.com)
 *
 */

angular.module('akoenig.deckgrid', []);

angular.module('akoenig.deckgrid').directive('deckgrid', [

    'DeckgridDescriptor',

    function initialize (DeckgridDescriptor) {

        'use strict';

        return DeckgridDescriptor.create();
    }
]);
