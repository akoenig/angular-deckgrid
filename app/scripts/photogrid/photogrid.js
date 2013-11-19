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

            this.$$elem = element;
            this.$$scope = scope;
            this.$$template = template;
            this.$$watchers = [];

            //
            // The configuration will be parsed out of the elements pseudo "before element."
            //
            this.$$config = this.$$parse();

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

            this.$$parse();
        }

        /**
         * @private
         *
         * @return {[type]} [description]
         *
         */
        Photogrid.prototype.$$parse = function $$parse () {
            var content = window.getComputedStyle(this.$$elem, ':before').content,
                config = {};

            content = content.replace(/'/g, '');  // before e.g. '3 .column.size-1of3'
            content = content.split(' ');

            config.columns = (content[0] | 0);
            config.cssClasses = content[1].split('.');

            //
            // If the declaration was: ".column.size-1of3", the first string in the array will be empty
            // by splitting at ".". Therefore it will be eliminated here.
            //
            config.cssClasses = config.cssClasses.splice(1, config.cssClasses.length - 1);

            return config;
        };

        /**
         * DOCME
         *
         * @return {[type]} [description]
         *
         */
        Photogrid.prototype.$$onWindowResize = function $$onWindowResize () {
            console.log('Window resize');
            var config = this.$$parse();

            console.log(config);
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
