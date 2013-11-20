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

angular.module('akoenig.photogrid').factory('Photogrid', [

    '$window',

    function initialize ($window) {

        'use strict';

        /**
         * DOCME
         *
         */
        function Photogrid (scope, element) {
            var self = this,
                watcher;

            this.$$elem = element;
            this.$$watchers = [];

            this.$$scope = scope;
            this.$$scope.columns = [];

            //
            // The configuration will be parsed out of the elements pseudo "before element."
            //
            this.$$scope.layout = this.$$getLayout();

            this.$$createColumns();

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
        }

        /**
         * DOCME
         *
         * @return {[type]} [description]
         *
         */
        Photogrid.prototype.$$createColumns = function $$createColumns () {
            var self = this;

            this.$$scope.columns = [];

            angular.forEach(this.$$scope.model, function onIteration (photo, index) {
                var column = (index % self.$$scope.layout.columns) | 0;

                if (!self.$$scope.columns[column]) {
                    self.$$scope.columns[column] = [];
                }

                self.$$scope.columns[column].push(photo);
            });
        };

        /**
         * @private
         *
         * @return {[type]} [description]
         *
         */
        Photogrid.prototype.$$getLayout = function $$getLayout () {
            var content = $window.getComputedStyle(this.$$elem, ':before').content,
                layout;

            if (content) {
                layout = {};

                content = content.replace(/'/g, '');  // before e.g. '3 .column.size-1of3'
                content = content.split(' ');

                layout.columns = (content[0] | 0);
                layout.classList = content[1].replace(/\./g, ' ').trim();
            }

            return layout;
        };

        /**
         * DOCME
         *
         * @return {[type]} [description]
         *
         */
        Photogrid.prototype.$$onWindowResize = function $$onWindowResize () {
            var self = this,
                layout = this.$$getLayout();

            //
            // Okay, the layout has changed.
            // Creating a new column structure is not avoidable.
            //
            if (layout.columns !== this.$$scope.layout.columns) {
                self.$$scope.layout = layout;

                self.$$createColumns();
            }
        };

        /**
         * DOCME
         *
         * @return {[type]} [description]
         *
         */
        Photogrid.prototype.$$onModelChange = function $$onModelChange (oldModel, newModel) {
            var self = this;

            if (oldModel.length !== newModel.length) {
                self.$$createColumns();
            }
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
            create : function create (scope, element) {
                return new Photogrid(scope, element);
            }
        };
    }
]);
