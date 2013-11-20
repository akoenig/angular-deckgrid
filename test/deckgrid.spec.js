/*
 * angular-deckgrid
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de)
 *
 */

describe('Unit: The angular-deckgrid', function () {

    'use strict';

    var $elem,
        columnCount = 3,
        photos = [
            {id: 'photo-1', src: 'http://lorempixel.com/300/400'},
            {id: 'photo-2', src: 'http://lorempixel.com/300/400'},
            {id: 'photo-3', src: 'http://lorempixel.com/300/400'},
            {id: 'photo-4', src: 'http://lorempixel.com/300/400'},
            {id: 'photo-5', src: 'http://lorempixel.com/300/400'},
            {id: 'photo-6', src: 'http://lorempixel.com/300/400'},
            {id: 'photo-7', src: 'http://lorempixel.com/300/400'}
        ];

    beforeEach(angular.mock.module('akoenig.deckgrid'));

    it('should have three columns and 3 images in the first column', inject([

        '$rootScope',
        '$compile',
        '$templateCache',
        '$window',

        function ($rootScope, $compile, $templateCache, $window) {
            var $photos,
                $columns;

            $window.getComputedStyle = function () {
                return {
                    content: "'"+ columnCount + " .column.size-1-" + columnCount + "'"
                };
            };

            $rootScope.photos = photos;

            //
            // Mock the template request
            //
            $templateCache.put('views/deckgrid-photo.html', '<img data-ng-src="{{photo.src}}" alt="{{photo.id}}" src="">');

            $elem = $compile('<deckgrid class="deckgrid" source="photos" itemTemplate="views/deckgrid-photo.html"></deckgrid>')($rootScope);

            $rootScope.$digest();

            $photos = $elem.find('.column:first-child img');
            $columns = $elem.find('.column');

            expect($columns.length).toBe(columnCount);
            expect($photos.length).toBe(3);

            expect($($photos[0]).attr('alt')).toBe(photos[0].id);
            expect($($photos[1]).attr('alt')).toBe(photos[3].id);
            expect($($photos[2]).attr('alt')).toBe(photos[6].id);
        }]
    ));
});