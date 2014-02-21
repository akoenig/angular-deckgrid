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
                $columns,
                $indices;

            $window.getComputedStyle = function () {
                return {
                    content: '\''+ columnCount + ' .column.size-1-' + columnCount + '\''
                };
            };

            $rootScope.photos = photos;

            //
            // Mock the template request
            //
            $templateCache.put('views/deckgrid-card.html', '<img data-ng-src="{{card.src}}" alt="{{card.id}}" src="">' +
                '<span class="index">{{card.$index}}</span>');

            $elem = $compile('<deckgrid class="deckgrid" source="photos" cardTemplate="views/deckgrid-card.html"></deckgrid>')($rootScope);

            $rootScope.$digest();
            
            $photos = $elem.find('.column:first-child img');
            $columns = $elem.find('.column');
            $indices = $elem.find('.column div:first-child span');

            expect($columns.length).toBe(columnCount);
            expect($photos.length).toBe(3);

            expect($($photos[0]).attr('alt')).toBe(photos[0].id);
            expect($($photos[1]).attr('alt')).toBe(photos[3].id);
            expect($($photos[2]).attr('alt')).toBe(photos[6].id);

            expect($($indices[0]).text()).toBe('0');
            expect($($indices[1]).text()).toBe('1');
            expect($($indices[2]).text()).toBe('2');
        }
    ]));

    it('should render the inner html of the directive if no card template attribute is specified', inject([

        '$rootScope',
        '$compile',
        '$window',

        function ($rootScope, $compile, $window) {
            var $photos,
                $columns;

            $window.getComputedStyle = function () {
                return {
                    content: '\''+ columnCount + ' .column.size-1-' + columnCount + '\''
                };
            };

            $rootScope.photos = photos;

            // 
            // use inner html as the card template
            //
            $elem = $compile('<deckgrid class="deckgrid" source="photos">' +
                '<img data-ng-src="{{card.src}}" alt="{{card.id}}" src=""></deckgrid>')($rootScope);

            $rootScope.$digest();
            
            $photos = $elem.find('.column:first-child img');
            $columns = $elem.find('.column');

            expect($columns.length).toBe(columnCount);
            expect($photos.length).toBe(3);

            expect($($photos[0]).attr('alt')).toBe(photos[0].id);
            expect($($photos[1]).attr('alt')).toBe(photos[3].id);
            expect($($photos[2]).attr('alt')).toBe(photos[6].id);
        }
    ]));

    it('should render the html of the provided cardTemplateString attribute if this is provided instead of the cardTemplate one', inject([

        '$rootScope',
        '$compile',
        '$window',

        function ($rootScope, $compile, $window) {
            var $divs,
                $columns;

            $window.getComputedStyle = function () {
                return {
                    content: '\''+ columnCount + ' .column.size-1-' + columnCount + '\''
                };
            };

            $rootScope.photos = photos;

            // 
            // use the provided attribute value
            //
            $elem = $compile('<deckgrid class="deckgrid" source="photos" ' +
                'cardTemplateString="<p>{{card.id}}</p>"></deckgrid>')($rootScope);

            $rootScope.$digest();
            
            $divs = $elem.find('.column:first-child p');
            $columns = $elem.find('.column');

            expect($columns.length).toBe(columnCount);
            expect($divs.length).toBe(3);

            expect($($divs[0]).text()).toBe(photos[0].id);
            expect($($divs[1]).text()).toBe(photos[3].id);
            expect($($divs[2]).text()).toBe(photos[6].id);
        }
    ]));
});