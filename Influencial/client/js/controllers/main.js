influential

    .controller('influencerController', function (influencerService) {
        var vm = this,
            influencers = influencerService.getInfluencer();

           influencers.query(function (data) {
               // console.log(data);
                vm.foodInfluencers = influencerService.filterByCategory(data, 'Food');
                vm.artInfluencers = influencerService.filterByCategory(data, 'Art');
                vm.fashionInfluencers = influencerService.filterByCategory(data, 'Fashion');
        });
    });
        