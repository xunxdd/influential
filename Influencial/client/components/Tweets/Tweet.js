(function () {
    'use strict';

    angular.module('in.Tweets', [])
        .directive("tweetStream", tweetStream);

    function tweetStream() {
        return {
            restrict: 'AE',
            transclude: true,
            templateUrl: 'components/Tweets/Tweets.html',
            scope: {
                tweets: '=',
                title: '@'
            },
            bindToController: true // because the scope is isolated
        };
    }
})();




