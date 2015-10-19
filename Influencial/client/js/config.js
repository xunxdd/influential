influential
    .config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise("/influencer");

        $stateProvider

            //------------------------------
            // HOME
            //------------------------------
            .state('influencer', {
                url: '/influencer',
                templateUrl: 'views/influencers.html'
            })

            .state('influencerdetail', {
                url: '/influencerdetail/:id',
                templateUrl: 'views/influencerdetails.html'
            })

            .state('industry', {
                url: '/industry/:id',
                templateUrl: 'views/industry.html'
            })
            .state('food', {
                url: '/food',
                templateUrl: 'views/food.html'
            })
            .state('arts', {
                url: '/arts',
                templateUrl: 'views/arts.html'
            })


    });
