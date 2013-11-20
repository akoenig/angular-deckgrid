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

angular.module('akoenig.photogrid').factory('PhotogridDescriptor', [

    'Photogrid',

    function initialize (Photogrid) {

        'use strict';

        /**
         * This is a wrapper around the AngularJS
         * directive description object.
         *
         */
        function Descriptor () {
            this.restrict = 'E';

            this.template = '<div data-ng-repeat="column in columns" class="{{layout.classList}}">' +
                                '<div data-ng-repeat="photo in column" data-ng-include="photoTemplate"></div>' +
                            '</div>';

            this.scope = {
                'model': '=source'
            };

            //
            // Will be created in the linking function.
            //
            this.$$photogrid = null;

            this.link = this.$$link.bind(this);
        }

        /**
         * @private
         *
         * Cleanup method. Will be called when the
         * photogrid directive should be destroyed.
         *
         */
        Descriptor.prototype.$$destroy = function $$destroy () {
            this.$$photogrid.destroy();
        };

        /**
         * @private
         *
         * The photogrid link method. Will instantiate the photogrid.
         *
         */
        Descriptor.prototype.$$link = function $$link (scope, elem, attrs) {
            scope.$on('$destroy', this.$$destroy.bind(this));

            scope.photoTemplate = attrs.phototemplate;

            this.$$photogrid = Photogrid.create(scope, elem[0]);
        };

        return {
            create : function create () {
                return new Descriptor();
            }
        };
    }
]);
