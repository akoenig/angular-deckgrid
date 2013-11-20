/*! angular-photogrid (v0.1.0) - Copyright: 2013, André König (andre.koenig@posteo.de) - MIT */
/*
 * photogrid
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */


angular.module('akoenig.photogrid').directive('photogrid', [

    'PhotogridDescriptor',

    function initialize (PhotogridDescriptor) {

        'use strict';

        return PhotogridDescriptor.create();
    }
]);
/*
 * photogrid
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
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

/*
 * photogrid
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */


angular.module('akoenig.photogrid').factory('Photogrid', [

    function initialize () {

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
            var content = window.getComputedStyle(this.$$elem, ':before').content,
                layout = {};

            content = content.replace(/'/g, '');  // before e.g. '3 .column.size-1of3'
            content = content.split(' ');

            layout.columns = (content[0] | 0);
            layout.classList = content[1].replace(/\./g, ' ').trim();

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
                this.$$scope.$apply(function () {
                    self.$$scope.layout = layout;

                    self.$$createColumns();
                });
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
