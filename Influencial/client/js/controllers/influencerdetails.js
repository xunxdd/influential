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
            var instagram = userDataService.getUserById(data, iHandle, 'Username');
            vm.show = !(instagram==null);
            vm.instagramUser = instagram ||data[0];
        });

        subjectandTagService.getRecentTweets().query(function (data) {
            vm.tweets = subjectandTagService.getMostRecentPostsByUsers(data, [tHandle], "createdtime", "tweettext");
        });

        subjectandTagService.getRecentTweets().query(function (data) {
            var userHashtag = subjectandTagService.getHashtagByUsers(data, tHandle, "|");
            vm.twitterHashtags = userHashtag;
        });

        subjectandTagService.getInstragramRecentPosts().query(function (data) {
            vm.instagramPosts = subjectandTagService.getMostRecentPostsByUsers(data, [iHandle], "createdtime", "thumbnail");
        });

        subjectandTagService.getInstragramRecentPosts().query(function (data) {
            var userHashtag = subjectandTagService.getHashtagByUsers(data, iHandle, ",");
            vm.instagramHashtags = userHashtag;
        });

        var mapTags = { "991": { "tag": "Brazil", "coordinates": { "lat": -14.235004, "lng": -51.92528 } }, "437": { "tag": "China", "coordinates": { "lat": 35.86166, "lng": 104.195397 } }, "796": { "tag": "France", "coordinates": { "lat": 46.227638, "lng": 2.213749 } }, "2728": { "tag": "germany", "coordinates": { "lat": 51.165691, "lng": 10.451526 } }, "894": { "tag": "Greece", "coordinates": { "lat": 39.074208, "lng": 21.824312 } }, "564": { "tag": "Italy", "coordinates": { "lat": 41.87194, "lng": 12.56738 } }, "168": { "tag": "Japan", "coordinates": { "lat": 36.204824, "lng": 138.252924 } }, "1001": { "tag": "Russia", "coordinates": { "lat": 61.52401, "lng": 105.318756 } }, "463": { "tag": "spain", "coordinates": { "lat": 40.463667, "lng": -3.74922 } }, "283": { "tag": "Thailand", "coordinates": { "lat": 15.870032, "lng": 100.992541 } }, "532": { "tag": "Turkey", "coordinates": { "lat": 38.963745, "lng": 35.243322 } }, "19": { "tag": "Uganda", "coordinates": { "lat": 1.373333, "lng": 32.290275 } }, "652": { "tag": "USA", "coordinates": { "lat": 37.09024, "lng": -95.712891 } }, "1909": { "tag": "uk", "coordinates": { "lat": 55.378051, "lng": -3.435973 } } };

        var dataSeries = [{
            data: [
                { x: 3, y: 95, z: 46.8, name: 'seasonal trends' },
                { x: 8.5, y: 102.9, z: 36.7, name: 'copertina' },
                { x: 45.8, y: 91.5, z: 35.8, name: 'piercing' },
                { x: 55.4, y: 102.5, z: 32, name: 'accessory' },
                { x: 23.3, y: 86.1, z: 29, name: 'couture' },
                { x: 44.4, y: 70.1, z: 27, name: 'givenchy' },
                { x: 12.2, y: 68.5, z: 23, name: 'bags' },
                { x: 66.5, y: 83.1, z: 16, name: 'celine' },
                { x: 71, y: 93.2, z: 14, name: 'hottest colors' },
                { x: 69.2, y: 57.6, z: 12, name: 'castelbajac' },
                { x: 68.6, y: 20, z: 11, name: 'wardrobe' },
                { x: 65.5, y: 126.4, z: 9, name: 'louis vuitton' },
                { x: 65.4, y: 50.8, z: 8, name: 'how to wear' },
                { x: 63.4, y: 51.8, z: 6, name: 'blazers' },
                { x: 75, y: 22.9, z: 5, name: 'rosie assouline' },
                { x: 38.6, y: 10, z: 10, name: 'shoe' },
                { x: 33.5, y: 100.4, z: 11.3, name: 'gucci' },
                { x: 22.4, y: 65.8, z: 8.5, name: 'NY' },
                { x: 70.4, y: 29.8, z: 7.4, name: 'London' },
                { x: 63, y: 39.9, z: 5.3, name: 'Fashion Week' },
                { x: 81, y: 12.9, z: 4, name: 'Paris' },
                { x: 79, y: 98.9, z: 3, name: 'Milan' }
            ]
        }];

        vm.bubbleChartConfig = bubbleChartConfig.getConfig('Hot Words', dataSeries);

        angular.element(document).ready(function () {
            mapService.setUpMap('#tbs-map', mapTags);
        });


    });


