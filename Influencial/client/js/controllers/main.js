influential

    .controller('influencerController', function (influencerService) {
        var vm = this,
            influencers = window.allInfluencers;
            vm.foodInfluencers = influencerService.filterByCategory(influencers, 'Food');
            vm.artInfluencers = influencerService.filterByCategory(influencers, 'Art');
            vm.fashionInfluencers = influencerService.filterByCategory(influencers, 'Fashion');
    });
        