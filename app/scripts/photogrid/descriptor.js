/*
 * photogrid
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

'use strict';

var akoenig = akoenig || {};

angular.module('akoenig.photogrid').factory('PhotogridDescriptor', [

    'Photogrid',

    function initialize (Photogrid) {

        /**
         * DOCME
         *
         */
        function Descriptor () {
            this.restrict = 'E';

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

            this.$$photogrid = Photogrid.create(scope, elem, attrs);
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
