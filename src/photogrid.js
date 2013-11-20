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
         * The photogrid directive.
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
            // The layout configuration will be parsed from
            // the pseudo "before element." There you have to save all
            // the column configurations.
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
         * @private
         *
         * Creates the column segmentation. With other words:
         * This method creates the internal data structure from the
         * passed "source" attribute. Every photo within this "source"
         * model will be passed into this internal column structure by
         * reference. So if you modify the data within your controller
         * this directive will reflect these changes immediately.
         *
         * NOTE that calling this method will trigger a complete template "redraw".
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
         * Parses the configuration out of the configured CSS styles.
         *
         * Example:
         *
         *     .photogrid::before {
         *         content: '3 .column.size-1-3';
         *     }
         *
         * Will result in a three column grid where each column will have the
         * classes: "column size-1-3".
         *
         * You are responsible for defining the respective styles within your CSS.
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
         * @private
         *
         * Event that will be triggered on "window resize".
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
         * @private
         *
         * Event that will be triggered when the source model has changed.
         *
         */
        Photogrid.prototype.$$onModelChange = function $$onModelChange (oldModel, newModel) {
            var self = this;

            if (oldModel.length !== newModel.length) {
                self.$$createColumns();
            }
        };

        /**
         * Destroys the directive. Takes care of cleaning all
         * watchers and event handlers.
         *
         */
        Photogrid.prototype.destroy = function destroy () {
            var i = this.$$watchers.length - 1;

            for (i; i >= 0; i = i - 1) {
                this.$$watchers[i]();
            }
        };

        return {
            create : function create (scope, element) {
                return new Photogrid(scope, element);
            }
        };
    }
]);
