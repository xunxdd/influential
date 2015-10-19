(function () {
    'use strict';

    angular.module('in.Tags', [])
        .directive("tags", tags);

    function tags() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'components/TagList/Tags.html',
            scope: {
                hashtags: '=',
                title: '@'
            },
            bindToController: true // because the scope is isolated
        };
    }
})();




