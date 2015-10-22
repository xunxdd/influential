influential

    .controller('influencerDetailController', function ($stateParams, mapService,
        influencerService, userDataService,  bubbleChartConfig, subjectandTagService) {
        var vm = this;

        var fallBack = {
            "Id": 1,
            "Name": "Chiara Ferragni",
            "Description": "The Blonde Salad",
            "Blog": "http://www.theblondesalad.com/",
            "BlogUrl": "http://www.theblondesalad.com/",
            "TwitterHandle": "chiaraferragni",
            "InstagramHandle": "chiaraferragni",
            "category": "Fashion",
            "image": "Chiara Ferragni.jpg"
        };
        var influencer = influencerService.getInfluencerById($stateParams.id || 1);
        vm.influencer = influencer;
        var tHandle = influencer ? influencer.TwitterHandle:fallBack.TwitterHandle;
        var iHandle = influencer ? influencer.InstagramHandle : fallBack.InstagramHandle;
        vm.show = true;
    
        userDataService.getTwitterusers().query(function (data) {
            var twitter = userDataService.getUserById(data, tHandle, 'Handle');
            vm.twitterUser = twitter||data[0];
        });
        
        userDataService.getInstagramusers().query(function (data) {
            var instagram = userDataService.getUserById(data, iHandle, 'UserName');
            vm.show = !(instagram==null);
            vm.instagramUser = instagram ||data[0];
        });

        subjectandTagService.getRecentTweets().query(function (data) {
            vm.tweets = subjectandTagService.getMostRecentPostsByUsers(data, [tHandle], "CreatedTime", "Text");
        });

        subjectandTagService.getRecentTweets().query(function (data) {
            var userHashtag = subjectandTagService.getHashtagByUsers(data, tHandle, "|");
            vm.twitterHashtags = userHashtag;
        });

        subjectandTagService.getInstragramRecentPosts().query(function (data) {
            vm.instagramPosts = subjectandTagService.getMostRecentPostsByUsers(data, [iHandle], "CreatedTime", "Thumbnail");
        });

        subjectandTagService.getInstragramRecentPosts().query(function (data) {
            var userHashtag = subjectandTagService.getHashtagByUsers(data, iHandle, "|");
            vm.instagramHashtags = userHashtag;
        });

        var mapTags = { "991": { "tag": "Brazil", "coordinates": { "lat": -14.235004, "lng": -51.92528 } }, "437": { "tag": "China", "coordinates": { "lat": 35.86166, "lng": 104.195397 } }, "796": { "tag": "France", "coordinates": { "lat": 46.227638, "lng": 2.213749 } }, "2728": { "tag": "germany", "coordinates": { "lat": 51.165691, "lng": 10.451526 } }, "894": { "tag": "Greece", "coordinates": { "lat": 39.074208, "lng": 21.824312 } }, "564": { "tag": "Italy", "coordinates": { "lat": 41.87194, "lng": 12.56738 } }, "168": { "tag": "Japan", "coordinates": { "lat": 36.204824, "lng": 138.252924 } }, "1001": { "tag": "Russia", "coordinates": { "lat": 61.52401, "lng": 105.318756 } }, "463": { "tag": "spain", "coordinates": { "lat": 40.463667, "lng": -3.74922 } }, "283": { "tag": "Thailand", "coordinates": { "lat": 15.870032, "lng": 100.992541 } }, "532": { "tag": "Turkey", "coordinates": { "lat": 38.963745, "lng": 35.243322 } }, "19": { "tag": "Uganda", "coordinates": { "lat": 1.373333, "lng": 32.290275 } }, "652": { "tag": "USA", "coordinates": { "lat": 37.09024, "lng": -95.712891 } }, "1909": { "tag": "uk", "coordinates": { "lat": 55.378051, "lng": -3.435973 } } };

        subjectandTagService.getUserTopics().query(function (data) {
            var topics = data.filter(function(d) {
                return d.UserName == tHandle;
            });
            if (topics.length == 0) {
                return;
            }
            var subjects = topics[0].Subjects;
            var i, l = subjects.length, bubbleData=[];
            for (i = 0; i < l; i++) {
                var subject = subjects[i];
                bubbleData.push({
                    x : Math.floor((Math.random() * 100) + 1),
                    y : Math.floor((Math.random() * 10) + 1),
                    z: subject.Score,
                    name: subject.Label,
                    count: (subject.Score * 100)
                });
            }
            var dataSeries = [{
                data: bubbleData
            }];

            vm.bubbleChartConfig = bubbleChartConfig.getConfig('Hot Words', dataSeries);
        });


        angular.element(document).ready(function () {
            mapService.setUpMap('#tbs-map', mapTags);
        });


    });


