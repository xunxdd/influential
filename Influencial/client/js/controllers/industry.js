﻿influential
    .controller('IndustryController', function ($stateParams,
        influencerService, userDataService, bubbleChartConfig,subjectandTagService) {
        var vm = this,
            art = "Art", fashion = "Fashion", food = "Food",
            photography='photography', humor='humor', beauty='beauty', 
            industries= {
                1: fashion,
                2: food,
                3: art,
                4: photography,
                5: beauty,
                6: humor
            },
            industry =industries[$stateParams.id || 1],
            influencers = influencerService.filterByCategory(window.allInfluencers, industry),
            tHandles = influencers.map(function(t) {
                return t.TwitterHandle;
            }),
            iHandles= influencers.map(function(t) {
                return t.InstagramHandle;
            });

        vm.influencers = influencers;
        vm.industry = industry;
        userDataService.getTwitterusers().query(function (data) {
            var users = data.filter(function(u) {
                return tHandles.indexOf(u.Handle) >= 0;
            });
            vm.twitterChartConfig = getChartConfig(users, 'Handle', 'FollowersCount', 'FriendsCount', 'StatusesCount');
        });

        userDataService.getInstagramusers().query(function (data) {
            var users = data.filter(function (u) {
                return iHandles.indexOf(u.UserName) >= 0;
            });
            vm.instagramChartConfig = getChartConfig(users, 'UserName', 'FollowBy', 'Follows', 'CountMedia');
        });

        subjectandTagService.getInstragramRecentPosts().query(function (data) {
            vm.instagramPosts = subjectandTagService.getMostRecentPostsByUsers(data, iHandles, "CreatedTime", "Thumbnail");
        });

        subjectandTagService.getRecentTweets().query(function (data) {
            vm.tweets = subjectandTagService.getMostRecentPostsByUsers(data, tHandles, "CreatedTime", "Text");
        });

        subjectandTagService.getRecentTweets().query(function (data) {
            vm.twitterHashtags = subjectandTagService.getHashtagByUsers(data, tHandles, "|");
        });

        subjectandTagService.getInstragramRecentPosts().query(function (data) {
            vm.instagramHashtags = subjectandTagService.getHashtagByUsers(data, iHandles, "|");
        });

        subjectandTagService.getIndustryTopics().query(function (data) {
           
            var dataSeries = subjectandTagService.getBubbleData(data, industry);;

            vm.bubbleChartConfig = bubbleChartConfig.getConfig('Hot Words', dataSeries);
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
