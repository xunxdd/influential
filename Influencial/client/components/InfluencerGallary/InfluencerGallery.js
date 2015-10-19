(function() {
    'use strict';

    angular.module('in.influencerGallery', [])
        .directive("influencerGallary", influencerGallary);

    function influencerGallary() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'components/InfluencerGallary/InfluencerGallery.html',
            scope: {
                influencers: '=',
                title: '@'
            },
            bindToController: true // because the scope is isolated
        };
    }
})();




