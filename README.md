# angular-deckgrid

A lightweight masonry-like, responsive grid for AngularJS.

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

### A complete example: Photogrid

Okay, you have your controller ready and your template is fine so far. The only thing what is missing is a flexible grid. Let's start!

**Your possible data structure**

    $scope.photos = [
        id: 'p1', 'title': 'A nice day!', src: "http://lorempixel.com/300/400/",
        id: 'p2', 'title': 'Puh!', src: "http://lorempixel.com/300/400/sports",
        id: 'p3', 'title': 'What a club!', src: "http://lorempixel.com/300/400/nightlife"
    ];

**Your possible card template**
_(it is completely up to you)_

    <div class="a-card">
        <h1>{{card.title}}</h1>

        <img src="" data-ng-src="{{card.src}}">
    </div>

That's all! Ehm, no. If you run your application now you will notice that there is only one column. What is missing? Well, we have to define the configuration for the visual representation. And what is the best place for something like this? Yes, for sure! Your CSS file(s).

## The grid configuration

The grid items will be distributed by your configured CSS selectors. An example:

    .deckgrid::before {
        /* Defines that the grid should have 3 columns. Each column will have the classes 'column' and 'column-1-4' */
        content: '4 .column.column-1-4';
        display:none;
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
        .deckgrid::before {
            content: '1 .column.column-1-1';
        }

        .deckgrid .column-1-1 {
            width: 100%;
        }
    }
    ...

This will define that for a device with a maximum screen width of 480px, only one column should be used. As I mentioned before. It is completely up to you how to define the column sizes. Go crazy.

## Changelog

### Version 0.1.1 (20131122)

- [Feature] Added log message for the case when the CSS configuration is not available ([#1](https://github.com/akoenig/angular-deckgrid/issues/1))

### Version 0.1.0 (20131121)

- Initial release. Functionality for rendering grids.

## Credits

* [AngularJS](http://angularjs.org) Needless to say. You know the beast. One of the best frontend frameworks in the world.
* [Rolando Murillo](http://rolandomurillo.com/) and [Giorgio Leveroni](https://github.com/ppold), the guys behind [salvattore](http://salvattore.com/) who inspired me to implement a similar solution for the AngularJS world.

## Author

Copyright 2013, [André König](http://iam.andrekoenig.info) (andre.koenig@posteo.de)
