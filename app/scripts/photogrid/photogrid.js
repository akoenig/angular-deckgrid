/*
 * photogrid
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

'use strict';

var akoenig = akoenig || {};

angular.module('akoenig.photogrid').factory('Photogrid', [

    function initialize (Photogrid) {

        /**
         * DOCME
         *
         */
        function Photogrid (scope, element, template) {
            var self = this,
                watcher;

            this.$$node = element;
            this.$$scope = scope;
            this.$$template = template;
            this.$$watchers = [];

            //
            // Register model change.
            //
            watcher = this.$$scope.$watch('model', this.$$onModelChange.bind(this), true);
            this.$$watchers.push(watcher);

            //
            // Register window resize change event.
            //
            watcher = (function $watchWindowResize () {
                var handler = self.$$onWindowResize.bind(self);

                window.addEventListener('resize', handler);

                return function off () {
                    window.removeEventListener('resize', handler);
                };
            })();
            this.$$watchers.push(watcher);

            console.log('new photogrid');
        }

        /**
         * DOCME
         *
         * @return {[type]} [description]
         *
         */
        Photogrid.prototype.$$onWindowResize = function $$onWindowResize () {
            console.log('Window resize');
        };

        /**
         * DOCME
         *
         * @return {[type]} [description]
         *
         */
        Photogrid.prototype.$$onModelChange = function $$onModelChange () {
            console.log('Model change');
        };

        /**
         * DOCME
         *
         * @return {[type]} [description]
         *
         */
        Photogrid.prototype.destroy = function destroy () {
            var i = this.$$watchers.length - 1;

            for (i; i >= 0; i = i - 1) {
                this.$$watchers[i]();
            }
        };

        return {
            /**
             * DOCME
             *
             * @return {[type]} [description]
             *
             */
            create : function create (scope, element, template) {
                return new Photogrid(scope, element, template);
            }
        };
    }
]);
