# angular-deckgrid

A lightweight masonry-like grid for AngularJS.

[Website / Demo](http://akoenig.github.io/angular-deckgrid)

## Installation

1. `bower install --save angular-deckgrid`
2. Include `angular-deckgrid` in your HTML.

    ```html
    <script src="<your-bower-components>/angular-deckgrid/angular-deckgrid.js"></script>
    ```

3. Inject the `angular-deckgrid` module in your application.

    ```js
    angular.module('your.module', [
        'akoenig.deckgrid'
    ]);
    ```

## Usage

The directive does not depend on the visual representation. All the responsiveness and beauty comes from your CSS file. But wait a second. Let's take a look how the directive will be integrated. An example:

    <div deckgrid source="photos" cardTemplate="templates/deckgrid-card.html" class="deckgrid"></div>

Okay, we assume that you have a collection of photos and you want to display these in a _deckgrid_, where every photo provides a _name_ and a _source_ URL. The internal structure of this collection is completely up to you. You can use any collection structure you want. No restrictions at all.

### The attributes

* `source`: The collection of objects that should be passed into your _deckgrid_ (by reference. Object change will be reflected in the grid).
* `cardTemplate`: The URL to the template which represents one single card in the _deckgrid_.

### Alternative ways to provide the template
* `cardTemplateString` attribute: You can provide this attribute *instead* of the `cardTemplate` attribute to use the attribute value directly as the template. Example:

    ```html
    <div deckgrid class="deckgrid" source="photos" cardTemplateString="<p>{{card.title}}</p>"></div>
    ```

* No template attribute: if you omit a template attribute (`cardTemplate` and `cardTemplateString`), the inner HTML of the directive will be used as the template, like in:

    ```html
    <div deckgrid class="deckgrid" source="photos">
        <div class="a-card">
            <h1>{{card.title}}</h1>

            <img src="" data-ng-src="{{card.src}}">
        </div>
    </div>
    ```

_Note: if you use one of these alternative ways to provide the card template, you don't have to use an external template file. However, using such a file is recommended, esp. for more complex templates._

### A complete example: Photogrid

Okay, you have your controller ready and your template is fine so far. The only thing what is missing is a flexible grid. Let's start!

**Your possible data structure**

    $scope.photos = [
        {id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/300/400/"},
        {id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/300/400/sports"},
        {id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/300/400/nightlife"}
    ];

**Your possible card template**
_(it is completely up to you)_

    <div class="a-card">
        <h1>{{card.title}}</h1>

        <img src="" data-ng-src="{{card.src}}">
    </div>

**Accessing the card's index**

In order to use the index of the current card from within the card's template, use the `$index` property of the `card` object, like:

    <span>{{card.$index}}</span>

This index reflects the index of the corresponding object in the source collection.


That's all! Ehm, no. If you run your application now, you will notice that there is only one column. What is missing? Well, we have to define the configuration for the visual representation. And what is the best place for something like this? Yes, for sure! Your CSS file(s).

## The grid configuration

The grid items will be distributed by your configured CSS selectors. An example:

    .deckgrid[deckgrid]::before {
        /* Specifies that the grid should have a maximum of 4 columns. Each column will have the classes 'column' and 'column-1-4' */
        content: '4 .column.column-1-4';
        font-size: 0; /* See https://github.com/akoenig/angular-deckgrid/issues/14#issuecomment-35728861 */
        visibility: hidden;
    }

    .deckgrid .column {
        float: left;
    }

    .deckgrid .column-1-4 {
        width: 25%;
    }

### The responsiveness

In order to support different grid representations for different screen sizes, you can define the respective media queries like:

    @media screen and (max-width: 480px){
        .deckgrid[deckgrid]::before {
            content: '1 .column.column-1-1';
        }

        .deckgrid .column-1-1 {
            width: 100%;
        }
    }
    ...

This will define that for a device with a maximum screen width of 480px, only one column should be used. As I mentioned before. It is completely up to you how to define the column sizes. Go crazy.
Although this example represents an adaptive kind of layout you are able to realize a responsive layout as well. The module is for the segmentation part, you have the full control over your layout.

### Scope

You may wonder why it is not possible to access your scope in the card template. The `angular-deckgrid` uses directives of AngularJS internally which creates new scopes. To avoid the "anti-pattern" of using "$parent.$parent.$parent.yourFunction()" in the card template, the `angular-deckgrid` provides a shortcut `mother.*` which points to your scope. An example:

    <button data-ng-click="mother.doSomething()">Click me!</button>
    
A click on this button would execute the `doSomething()` function in your scope.

## In action

Do you use the `angular-deckgrid` and would like to be featured here? Just send me an [email](mailto:andre.koenig@posteo.de) and I will add you and your application to this list.

- [raindrop.io](http://raindrop.io/): "Smart bookmarks - A beautiful way to remember the most important"
- [infowrap.com](https://www.infowrap.com/): "An infowrap is engineered to hold everything people need together on a single page and keep them up to date."

## Changelog

### Version 0.6.0 (Future)

- Open: [Bugfix] We need a solution to prevent the model binding for `innerHTML` templates (e.g. `ngIf` not working) [#44](https://github.com/akoenig/angular-deckgrid/issues/44)

### Version 0.5.0 (20141031)

- Upgraded AngularJS dependency in `bower.json` (v1.3.0).
- Changed the collection comparison which triggers the repaint (see #48).
- Switched from `$watch` to `$watchCollection` to gain a bit more performance (see #56).
- Ported the ordinary `undefined` checks to AngularJS standard functions.

### Version 0.4.4 (20140514)

- Merged #47
- Merged #51

### Version 0.4.3 (20140422)

- [Bugfix] OnMediaQueryChange Listeners not being removed onDestroy. [#35](https://github.com/akoenig/angular-deckgrid/issues/35) 

### Version 0.4.2 (20140422)

- [Bugfix] Problems with device orientation [#46](https://github.com/akoenig/angular-deckgrid/issues/46)

### Version 0.4.1 (20140317)

- [Bugfix] If model is not ready by rendering, there's an error [#31](https://github.com/akoenig/angular-deckgrid/issues/31)
- [Feature] Multiple grids on page with cardTemplateString use the last template available [#33](https://github.com/akoenig/angular-deckgrid/issues/33)

### Version 0.4.0 (20140224)

- [Feature] Functionality for passing inline templates.

### Version 0.3.0 (20140220)

- [Feature] It is now possible to access the index of a card from within the card's template. This is accessible via the $index property of the card reference like {{card.$index}}.

### Version 0.2.3 (20140215)

- [Bugfix] If `rule.cssRules` is undefined, the style investigation should always exit.

### Version 0.2.2 (20140214)

- [Bugfix] Implemented check for the case if the `selectorText` of the css rules is undefined.

### Version 0.2.1 (20131127)

- [Feature] There are some directives in the template of the `angular-deckgrid`, which creates new scopes. In order to access the parent scope which is responsible for embedding the `angular-deckgrid` directive, this release contains a shortcut for accessing your scope (`{{mother.*}}`).

### Version 0.2.0 (20131123)

- [Feature] Better event handling of media query changes.

### Version 0.1.1 (20131122)

- [Feature] Added log message for the case when the CSS configuration is not available ([#1](https://github.com/akoenig/angular-deckgrid/issues/1))

### Version 0.1.0 (20131121)

- Initial release. Functionality for rendering grids.

## Credits

* All the [people](https://github.com/akoenig/angular-deckgrid/blob/master/CONTRIBUTORS.md) who made outstanding contributions to the `angular-deckgrid` so far.
* [AngularJS](http://angularjs.org) Needless to say. You know the beast. One of the best frontend frameworks in the world.
* [Rolando Murillo](http://rolandomurillo.com/) and [Giorgio Leveroni](https://github.com/ppold), the guys behind [salvattore](http://salvattore.com/) who inspired me to implement a similar solution for the AngularJS world.

## Author

Copyright 2013 - 2014, [André König](http://iam.andrekoenig.info) (andre.koenig@posteo.de)
