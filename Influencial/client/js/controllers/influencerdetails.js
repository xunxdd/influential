influential

    .controller('influencerDetailController', function ($scope, $stateParams, mapService,
        influencerService, userDataService, tweetService, chartService) {
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

        tweetService.getTweets().query(function (data) {
            var tweets = tweetService.getTweetsByUsers(data, tHandle);
            vm.tweets = tweets;
        });

        var mapTags = { "991": { "tag": "Brazil", "link": "http:\/\/www.theblondesalad.com\/tag\/brazil,belo-horizonte", "coordinates": { "lat": -14.235004, "lng": -51.92528 } }, "437": { "tag": "China", "link": "http:\/\/www.theblondesalad.com\/tag\/china", "coordinates": { "lat": 35.86166, "lng": 104.195397 } }, "796": { "tag": "France", "link": "http:\/\/www.theblondesalad.com\/tag\/france,cannes", "coordinates": { "lat": 46.227638, "lng": 2.213749 } }, "2728": { "tag": "germany", "link": "http:\/\/www.theblondesalad.com\/tag\/germany,berlin", "coordinates": { "lat": 51.165691, "lng": 10.451526 } }, "894": { "tag": "Greece", "link": "http:\/\/www.theblondesalad.com\/tag\/greece,athens", "coordinates": { "lat": 39.074208, "lng": 21.824312 } }, "564": { "tag": "Italy", "link": "http:\/\/www.theblondesalad.com\/tag\/italy,forte-dei-marmi", "coordinates": { "lat": 41.87194, "lng": 12.56738 } }, "168": { "tag": "Japan", "link": "http:\/\/www.theblondesalad.com\/tag\/japan", "coordinates": { "lat": 36.204824, "lng": 138.252924 } }, "1001": { "tag": "Russia", "link": "http:\/\/www.theblondesalad.com\/tag\/russia", "coordinates": { "lat": 61.52401, "lng": 105.318756 } }, "463": { "tag": "spain", "link": "http:\/\/www.theblondesalad.com\/tag\/spain,madrid", "coordinates": { "lat": 40.463667, "lng": -3.74922 } }, "283": { "tag": "Thailand", "link": "http:\/\/www.theblondesalad.com\/tag\/thailand,phuket", "coordinates": { "lat": 15.870032, "lng": 100.992541 } }, "532": { "tag": "Turkey", "link": "http:\/\/www.theblondesalad.com\/tag\/turkey,istanbul", "coordinates": { "lat": 38.963745, "lng": 35.243322 } }, "19": { "tag": "Uganda", "link": "http:\/\/www.theblondesalad.com\/tag\/uganda,ruhira", "coordinates": { "lat": 1.373333, "lng": 32.290275 } }, "652": { "tag": "USA", "link": "http:\/\/www.theblondesalad.com\/tag\/usa,syracuse", "coordinates": { "lat": 37.09024, "lng": -95.712891 } }, "1909": { "tag": "uk", "link": "http:\/\/www.theblondesalad.com\/tag\/uk,london", "coordinates": { "lat": 55.378051, "lng": -3.435973 } } };

        var data = [
            { x: 95, y: 95, z: 13.8, name: 'BE', country: 'Belgium' },
            { x: 86.5, y: 102.9, z: 14.7, name: 'DE', country: 'Germany' },
            { x: 80.8, y: 91.5, z: 15.8, name: 'FI', country: 'Finland' },
            { x: 80.4, y: 102.5, z: 12, name: 'NL', country: 'Netherlands' },
            { x: 80.3, y: 86.1, z: 11.8, name: 'SE', country: 'Sweden' },
            { x: 78.4, y: 70.1, z: 16.6, name: 'ES', country: 'Spain' },
            { x: 74.2, y: 68.5, z: 14.5, name: 'FR', country: 'France' },
            { x: 73.5, y: 83.1, z: 10, name: 'NO', country: 'Norway' },
            { x: 71, y: 93.2, z: 24.7, name: 'UK', country: 'United Kingdom' },
            { x: 69.2, y: 57.6, z: 10.4, name: 'IT', country: 'Italy' },
            { x: 68.6, y: 20, z: 16, name: 'RU', country: 'Russia' },
            { x: 65.5, y: 126.4, z: 35.3, name: 'US', country: 'United States' },
            { x: 65.4, y: 50.8, z: 28.5, name: 'HU', country: 'Hungary' },
            { x: 63.4, y: 51.8, z: 15.4, name: 'PT', country: 'Portugal' },
            { x: 64, y: 82.9, z: 31.3, name: 'NZ', country: 'New Zealand' }
        ];

        angular.element(document).ready(function () {
            mapService.setUpMap('#tbs-map', mapTags);
            //chartService.setupBubbleChart('div', data, 3000);
        });
    });


