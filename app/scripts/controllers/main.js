'use strict';

angular.module('angularPhotogridApp').controller('MainCtrl', [

    '$scope',
    '$timeout',

    function ($scope, $timeout) {

        $scope.photos = [
            {id: '1. Foto', original: 'http://userserve-ak.last.fm/serve/500/31753527/Random+Album+Title.png'},
            {id: '2. Foto', original: 'http://images4.fanpop.com/image/photos/21700000/Pink-floyd-dark-side-of-the-moon-random-21776988-500-500.jpg'},
            {id: '3. Foto', original: 'https://www.artundform.de/shop/produktbilder-gross/remember-papphocker-random_7324_1.jpg'},
            {id: '4. Foto', original: 'http://www.freshflexa.de/images/random-trio_from-the-shadows.jpg'},
            {id: '5. Foto', original: 'http://www.monozelle.de/images/minus_cds/art-roter-random.jpg'},
            {id: '6. Foto', original: 'http://images4.fanpop.com/image/photos/24400000/Gaylord-Perry-Homerun-random-24495449-500-500.jpg'},
            {id: '6. Foto', original: 'http://images4.fanpop.com/image/photos/24400000/Gaylord-Perry-Homerun-random-24495449-500-500.jpg'},
            {id: '6. Foto', original: 'http://images4.fanpop.com/image/photos/24400000/Gaylord-Perry-Homerun-random-24495449-500-500.jpg'}


        ];

        var t = $timeout(function f () {
            $timeout.cancel(t);

            // console.log('CHANGED ID');
            // var index = Math.ceil(Math.random() * 100) % 8;
            // $scope.photos[index].id = 'changed id ' + Math.ceil(Math.random() * 100) ;
            // $scope.photos[index].selected = true;

             $scope.photos.push({id: '9. Foto', original: 'http://lorempixel.com/500/200/'});
             $scope.photos.push({id: '9. Foto', original: 'http://minimalistica.org/wp-content/uploads/2012/07/Sean-Random-%E2%80%93-Catacombs-EP.jpeg'});
             $scope.photos.push({id: '9. Foto', original: 'http://shechive.files.wordpress.com/2013/09/a-mc-random-171.jpg?w=500&h=375'});

             $scope.photos[0].id = 'BLABLA';

            //$timeout(f, 1000);
        }, 5000);

    }
]);
