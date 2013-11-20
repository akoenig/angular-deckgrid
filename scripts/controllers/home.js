/*
 * angular-deckgrid-demo
 *
 * Copyright(c) 2013 André König <akoenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König (andre.koenig@posteo.de)
 *
 */

angular.module('akoenig.deckgrid.demo').controller('HomeController', [

    '$scope',

    function initialize ($scope) {

        'use strict';

        $scope.photos = [
            {id: 'photo-1', name: 'Photo 1', src: 'http://lorempixel.com/400/300/abstract'},
            {id: 'photo-2', name: 'Photo 2', src: 'http://lorempixel.com/450/400/city'},
            {id: 'photo-3', name: 'Photo 3', src: 'http://lorempixel.com/400/300/people'},
            {id: 'photo-4', name: 'Photo 4', src: 'http://lorempixel.com/400/300/transport'},
            {id: 'photo-5', name: 'Photo 5', src: 'http://lorempixel.com/400/300/fashion'},
            {id: 'photo-6', name: 'Photo 6', src: 'http://lorempixel.com/400/300/technics'},
            {id: 'photo-7', name: 'Photo 7', src: 'http://lorempixel.com/400/300/sports'},
            {id: 'photo-8', name: 'Photo 8', src: 'http://lorempixel.com/400/300/nightlife'},
            {id: 'photo-9', name: 'Photo 9', src: 'http://lorempixel.com/400/300/nature'},
            {id: 'photo-10', name: 'Photo 10', src: 'http://lorempixel.com/400/300/technics'},
            {id: 'photo-11', name: 'Photo 11', src: 'http://lorempixel.com/400/300/sports'},
            {id: 'photo-12', name: 'Photo 12', src: 'http://lorempixel.com/400/300/nightlife'},
            {id: 'photo-13', name: 'Photo 13', src: 'http://lorempixel.com/400/300/nature'},
            {id: 'photo-14', name: 'Photo 14', src: 'http://lorempixel.com/400/300/technics'},
            {id: 'photo-15', name: 'Photo 15', src: 'http://lorempixel.com/400/300/sports'},
            {id: 'photo-16', name: 'Photo 16', src: 'http://lorempixel.com/400/300/nightlife'},
            {id: 'photo-17', name: 'Photo 17', src: 'http://lorempixel.com/400/300/nature'},
            // {id: 'photo-', src: 'http://2.bp.blogspot.com/-BlD03hE_B-E/T8tmmMFdRLI/AAAAAAAABbY/VBmKxOtCqwE/s1600/Africa_Nature_Animals+(28).jpg'},
            // {id: 'photo-', src: 'http://www.wall321.com/thumbnails/detail/20120524/bunnies%20nature%20animals%20grass%20rabbits%201920x1200%20wallpaper_www.wall321.com_3.jpg'},
            // {id: 'photo-', src: 'http://edennaturepark.com.ph/eden_images/nature_animals.jpg'},
            // {id: 'photo-', src: 'http://www.nature-pictures.info/wp-content/uploads/2013/05/the-15-craziest-things-in-nature-you-wont-believe-actually-exist-4.jpg'},
            // {id: 'photo-', src: 'http://img.geo.de/div/image/75898/heartbeat-of-nature-achim-goeke-gross-01.jpg'},
            // {id: 'photo-', src: 'http://www.independent.co.uk/migration_catalog/article5306682.ece/ALTERNATES/w620/Pg+10-Technology.jpeg'},
            // {id: 'photo-', src: 'http://www.productionparadise.com/newsletters/710/photos/55931/original/k1-models-prague-showcase-03.jpg'},
            // {id: 'photo-', src: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2010/8/13/1281691335582/Ants-006.jpg'},
            // {id: 'photo-', src: 'http://www.wallsave.com/wallpapers/1024x576/white-tiger-animal-nature/83185/white-tiger-animal-nature-dogs-husky-83185.jpg'},
            // {id: 'photo-', src: 'http://sphotos-f.ak.fbcdn.net/hphotos-ak-ash3/s720x720/533352_501072066620088_1525429500_n.jpg'},
            // {id: 'photo-', src: 'http://www.wallpaperhi.com/thumbnails/detail/20120529/mountains%20nature%20animals%20wildlife%20dogs%20sleeping%20wolves%201920x1200%20wallpaper_www.wallpaperhi.com_24.jpg'},
            // {id: 'photo-', src: 'http://images4.fanpop.com/image/photos/22400000/-D-babies-22452217-400-400.jpg'},
            // {id: 'photo-', src: 'https://lh3.googleusercontent.com/-0X8CCmCm5dk/UbBhvxAxbvI/AAAAAAAAZNc/xAJ6014M3PU/w900/hd-nature-wallpapers.jpg'},
            // {id: 'photo-', src: 'http://shechive.files.wordpress.com/2011/07/cute-babies-14.jpg?w=500&h=335'},
            // {id: 'photo-', src: 'http://getslim.de/wp-content/uploads/2013/02/Models-Essgewohnheiten.jpg'},
            // {id: 'photo-', src: 'http://www.abendblatt.de/img/vermischtes/crop112900083/1608728172-ci3x2l-w620/Israel-bannt-Mager-Models.jpg'},
            // {id: 'photo-', src: 'http://www.gridpp.ac.uk/news/wp-content/uploads/2013/09/dolphins.jpg'},
            // {id: 'photo-', src: 'http://www.superf.lu/wp-content/uploads/2012/04/model-fashion-shoot-glamour-style-fotography-02.jpg'}
        ];

    }

]);