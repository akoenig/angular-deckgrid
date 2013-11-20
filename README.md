# angular-deckgrid

A lightweight masonry-like, responsive grid for AngularJS.

[Website / Demo](http://akoenig.github.io/angular-deckgrid)

## Installation

1. `bower install --save angular-deckgrid`
2. Include angular-deckgrid in your HTML.

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

The directive does not depend on the visual representation. All the responsiveness and beauty comes from your CSS file. But wait a second. Let's take a look how the directive will be integrated. Example:

    ```html
    <div deckgrid></div>

    ```