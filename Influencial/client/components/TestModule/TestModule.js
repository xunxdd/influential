angular.module('in.directives', []).

   directive('myDirective', function () {
       return {
           restrict: 'EA', //E = element, A = attribute, C = class, M = comment         
           scope: {
               //@ reads the attribute value, = provides two-way binding, & works with functions
               title: '@'
           },
           template: '<div> tatakgag </div>',
           link: function ($scope, element, attrs) { } //DOM manipulation
       }
   });