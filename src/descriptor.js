/*
 * angular-deckgrid
 *
 * Copyright(c) 2013-2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de)
 *
 */

angular.module('akoenig.deckgrid').factory('DeckgridDescriptor', [

    'Deckgrid',
    '$templateCache',

    function initialize (Deckgrid, $templateCache) {

        'use strict';

        /**
         * This is a wrapper around the AngularJS
         * directive description object.
         *
         */
        function Descriptor () {
            this.restrict = 'AE';

            this.template = '<div data-ng-repeat="column in columns" class="{{layout.classList}}">' +
                                '<div data-ng-repeat="card in column" data-ng-include="cardTemplate"></div>' +
                            '</div>';

            this.scope = {
                'model': '=source'
            };

            //
            // Will be created in the linking function.
            //
            this.$$deckgrid = null;

            this.transclude = true;
            this.link = this.$$link.bind(this);

            //
            // Will be incremented if using inline templates.
            //
            this.$$templateKeyIndex = 0;

        }

        /**
         * @private
         *
         * Cleanup method. Will be called when the
         * deckgrid directive should be destroyed.
         *
         */
        Descriptor.prototype.$$destroy = function $$destroy () {
            this.$$deckgrid.destroy();
        };

        /**
         * @private
         *
         * The deckgrid link method. Will instantiate the deckgrid.
         *
         */
        Descriptor.prototype.$$link = function $$link (scope, elem, attrs, nullController, transclude) {
            var templateKey = 'deckgrid/innerHtmlTemplate' + (++this.$$templateKeyIndex) + '.html';

            scope.$on('$destroy', this.$$destroy.bind(this));

            if (angular.isUndefined(attrs.cardtemplate)) {
                if (angular.isUndefined(attrs.cardtemplatestring)) {
                    // use the provided inner html as template
                    transclude(scope, function onTransclude (innerHTML) {
                        var extractedInnerHTML = [],
                            i = 0,
                            len = innerHTML.length,
                            outerHTML;

                        for (i; i < len; i = i + 1) {
                            outerHTML = innerHTML[i].outerHTML;

                            if (angular.isDefined(outerHTML)) {
                                extractedInnerHTML.push(outerHTML);
                            }
                        }

                        $templateCache.put(templateKey, extractedInnerHTML.join());
                    });
                } else {
                    // use the provided template string
                    //
                    // note: the attr is accessed via the elem object, as the attrs content
                    // is already compiled and thus lacks the {{...}} expressions
                    $templateCache.put(templateKey, elem.attr('cardtemplatestring'));
                }

                scope.cardTemplate = templateKey;
            } else {
                // use the provided template file
                scope.cardTemplate = attrs.cardtemplate;
            }

            scope.mother = scope.$parent;

            this.$$deckgrid = Deckgrid.create(scope, elem[0]);
        };

        return {
            create : function create () {
                return new Descriptor();
            }
        };
    }
]);
