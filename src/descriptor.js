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
         * DOCME
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
         * DOCME
         *
         * @return {[type]} [description]
         *
         */
        Descriptor.prototype.$$destroy = function $$destroy () {
            this.$$photogrid.destroy();
        };

        /**
         * @private
         *
         * @param  {[type]} $scope [description]
         * @param  {[type]} elem   [description]
         * @param  {[type]} attrs  [description]
         * @return {[type]}        [description]
         *
         */
        Descriptor.prototype.$$link = function $$link (scope, elem, attrs) {
            scope.$on('$destroy', this.$$destroy.bind(this));

            scope.photoTemplate = attrs.phototemplate;

            this.$$photogrid = Photogrid.create(scope, elem[0]);
        };

        return {
            /**
             * DOCME
             *
             * @return {[type]} [description]
             *
             */
            create : function create () {
                return new Descriptor();
            }
        };
    }
]);
