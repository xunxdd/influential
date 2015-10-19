(function () {
    'use strict';

    angular.module('in.InstragramPost', [])
        .directive("instagramPosts", instagramPosts);

    function instagramPosts() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'components/InstragramPost/InstagramPost.html',
            scope: {
                posts: '=',
                title: '@'
            },
            bindToController: true // because the scope is isolated
        };
    }
})();




