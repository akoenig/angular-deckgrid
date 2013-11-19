'use strict';

angular.module('angularPhotogridApp').controller('MainCtrl', [

    '$scope',
    '$timeout',

    function ($scope, $timeout) {

        $scope.photos = [
            {id: 'first photo'}
        ];

        $timeout(function () {
            $scope.photos[0].id = 'changed id';
        }, 2000);

    }
]);
