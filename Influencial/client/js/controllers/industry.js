influential
    .controller('IndustryController', function ($stateParams, mapService,
        influencerService, userDataService, subjectandTagService) {
        var vm = this,
            art = "Art", fashion = "Fashion", food = "Food",
            industries= {
                1: fashion,
                2: food,
                3:art
            },
            industry =industries[$stateParams.id || 1],
            influencers = influencerService.filterByCategory(window.allInfluencers, industry),
            tHandles = influencers.map(function(t) {
                return t.TwitterHandle;
            }),
            iHandles= influencers.map(function(t) {
                return t.InstagramHandle;
            });

        userDataService.getTwitterusers().query(function (data) {
            var users = data.filter(function(u) {
                return tHandles.indexOf(u.Handle) >= 0;
            });
            vm.twitterChartConfig = getChartConfig(users, 'Handle', 'FollowerCount', 'FriendsCount', 'StatusCount');
        });

        userDataService.getInstagramusers().query(function (data) {
            var users = data.filter(function (u) {
                return iHandles.indexOf(u.Username) >= 0;
            });
            vm.instagramChartConfig = getChartConfig(users, 'Username', 'FollowedBy', 'Follows', 'Media');
        });
        
    });

function getChartConfig(influencers, nameField, followField, followingField, postField) {
    var names = [],
        i,
        l = influencers.length,
        followers=[],
        following=[],
        posts=[];

    for (i = 0; i < l; i++) {
        var influencer = influencers[i];
        names.push(influencer[nameField]);
        followers.push({ y: influencer[followField]/1 });
        following.push({ y: influencer[followingField] / 1 });
        posts.push({ y: influencer[postField] / 1 });
    }
    
    var options = {
        chart: {
            type: 'bar'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: names,
            title: {
                enabled: false
            }
        }
    };

    var series = [
        {
            name: 'Followers',
            data: followers
        }, {
            name: 'Following',
            data: following
        }, {
            name: 'Posts',
            data: posts
        }
    ];
    return {
        options: options,
        series:series
    };
}
