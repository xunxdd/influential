/// <reference path="InfluencerGallery.html" />
var scripts = document.getElementsByTagName("script");
var currentScriptPath = scripts[scripts.length - 1].src;

angular.module('in.influencerGallery', [])
    .factory('tagservice', tagService)
    .controller('InfluencerGallaryController', InfluencerGallaryController)
    .directive("influencerGallary", influencerGallary);


function tagService() {
    function removeTag($event, index) {

    }

    function addTagsAll($event, index) {

    }

    function addTag($event, index, tagId) {

    }

    function isTagChecked(tagId) {

    }

    return {
        removeTag: removeTag,
        addTagsAll: addTagsAll,
        addTag: addTag,
        isTagChecked: isTagChecked
    };
}

InfluencerGallaryController.$inject = ['$scope', 'tagservice'];

function InfluencerGallaryController($scope, tagservice) {
    var ind = this;
    //vm.removeTag = tagservice.removeTag;
    //vm.addTagsAll = tagservice.addTagsAll;
    //vm.addTags = tagservice.addTag;
    //vm.isTagChecked = tagservice.isTagChecked;
}

function influencerGallary() {
    return {
        restrict: 'AE',
        transclude: true,
        templateUrl: 'components/InfluencerGallary/InfluencerGallery.html',
        controller: InfluencerGallaryController,
        scope: {
            influencers: '=',
            title: '@'
        },
        bindToController: true // because the scope is isolated
    };
}




