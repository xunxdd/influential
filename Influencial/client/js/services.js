influential
    .service('influencerService', [
        '$resource', function() {
            var service = this;
            service.filterByCategory = function(list, category) {
                return list.filter(function(itm) { return itm.Category === category; });
            };

            service.getInfluencerById = function(id) {
                var match = window.allInfluencers.filter(function(itm) { return itm.Id == id; });
                return match && match.length ? match[0] : null;
            }

        }
    ])
    .service('userDataService', [
        '$resource', function($resource) {
            var service = this;
            service.getTwitterusers = function() {
                return $resource("data/twitterusers.json");
            };
            service.getInstagramusers = function() {
                return $resource("data/instagramusers.json");
            };
            service.getUserById = function(users, id, idField) {
                var match = users.filter(function(itm) { return itm[idField] && itm[idField] == id; });
                return match && match.length ? match[0] : null;
            };
            service.getUserStatsById = function (users, id, idField) {
                var match = users.filter(function (itm) { return itm[idField] && itm[idField].toLowerCase() === id.toLowerCase(); });
                return match && match.length ? match : null;
            };
            service.getTwitterUserStats = function () {
                return $resource("data/twitteruserstats.json");
            };
            service.getInstagramUserStats = function () {
                return $resource("data/instagramuserstats.json");
            };

        }
    ])
     .service('subjectandTagService', [
        '$resource', function ($resource) {
            var service = this;
            
           
            service.getRecentTweets = function () {
                return $resource("data/tweets.json");
            };

            service.getInstragramRecentPosts = function () {
                return $resource("data/instagram_posts.json");
            };

            service.getUserTopics = function () {
                return $resource("data/twittersubject-users.json");
            };
            service.getIndustryTopics = function () {
                return $resource("data/twittersubject-industries.json");
            };

            service.getMostRecentPostsByUsers = function (data, uids, dateField, dataField) {
                var match = data.filter(function (itm) { return uids.indexOf(itm.UserName) >= 0 && itm[dataField]; });
                sortArrayByDateTimeDescending(match, dateField);
                return match && match.length ? match.splice(0, 10) : null;
            };
            service.getHashtagByUsers = function(data, uids, delimiter) {
                var match = data.filter(function (itm) { return uids.indexOf(itm.UserName) >= 0; });
                var hash = match.map(function(t) {
                    return t.Hashtags;
                });
                return getCleanTags(hash, delimiter);
            }

            //only available on industry level 
            service.getKeywordsCount= function(data) {
                return keywordsCount(data);
            }

            service.getBubbleData=function(data, name) {
                return getBubbleChartData(data, name);
            }
        }
     ])
    .service('trendChartService', function() {
        var service = this;
        service.getChartConfig= function(stats) {
            var config = {
                "options": {
                    "chart": {
                        "type": "areaspline"
                    },
                    "plotOptions": {
                        "series": {
                            "stacking": ""
                        }
                    }
                },
                xAxis: {
                    categories: []
                },
                series: [],
                title: {
                    text: ''
                }
            };
            var series = [], i, l = stats.length;
            var seriesPosts = { id: 1, data: [], name: '# Posts', "type": "spline" };
            var seriesFollowers = { id: 2, data: [], name: '# Followers', "type": "spline"};
            var seriesFollowing = { id: 3, data: [], name: '# Following', "type": "spline" };
            var categories = [];
            for (i = 0; i < l; i++) {

                var stat = stats[i];
                var timeStamp = new Date(stat.TimeStamp);
                categories.push(timeStamp.getMonth() + "/" + timeStamp.getDate());
                seriesPosts.data.push([stat.PostCount]);
                seriesFollowers.data.push([stat.FollowerCount]);
                seriesFollowing.data.push([stat.FollowCount]);
            }
            config.xAxis.categories = categories;
            //config.series.push(seriesPosts);
            config.series.push(seriesFollowers);
            //config.series.push(seriesFollowing);
            return config;
        }
    })
    .service('mapService', function() {
        var style = {
            "styledMapName": "tbs",
            "styles": [
                {
                    "featureType": "road",
                    "stylers": [
                        { "visibility": "off" }
                    ]
                }, {
                    "featureType": "landscape",
                    "stylers": [
                        { "color": "#ffffff" }
                    ]
                }, {
                    "featureType": "poi",
                    "stylers": [
                        { "visibility": "off" }
                    ]
                }, {
                    "featureType": "road",
                    "stylers": [
                        { "color": "#dddddd" }
                    ]
                }, {
                    "featureType": "water",
                    "stylers": [
                        { "color": "#e0effe" }
                    ]
                }
            ],

            "mapTypeId": "tbs"
        };
        this.setUpMap = function(div, mapTags) {
            var map = new GMaps({
                div: div,
                lat: 0,
                lng: 0
            });
            map.addStyle(style);
            map.setStyle("tbs");

            for (var tagId in mapTags) {
                if (mapTags.hasOwnProperty(tagId)) {
                    (function() {
                        var tag = mapTags[tagId],
                            marker = map.addMarker({
                                "lat": tag.coordinates.lat,
                                "lng": tag.coordinates.lng
                            });

                        if (map.markers.length === 1) {
                            map.setZoom(15);
                            map.setCenter(tag.coordinates.lat, tag.coordinates.lng);
                        } else {
                            map.fitZoom();
                        }

                        var icon = new Image();
                        icon.onload = function() {
                            marker.setIcon(this.src);
                        };
                        icon.src = 'images/flags/' + tag.tag.toLowerCase() + '.png';
                        //console.log(icon.src);
                    })();
                }
            }
        }
    });


function getCleanTags(hash, delimiter) {
    var hashTags = [];
    var i, l = hash.length;
    for (i = 0; i < l; i++) {
        var tag = hash[i];
        if (tag && tag.length > 0) {

            hashTags = hashTags.concat(tag.split(delimiter));
        }
    }

    l = hashTags.length;
    var cleanTags = [];
    for (i = 0; i < l; i++) {
        if (hashTags[i].length > 0) {
            cleanTags.push(hashTags[i]);
        }
    }
    var counts = arrayElementCount(cleanTags);

    sortArrayByNumberDescending(counts);
   // console.log(counts);
    return counts.splice(0,9);
}

function sortArrayByNumberDescending(array, sortField) {
    var field = sortField || 'count';

    array.sort(function (a, b) {
        var keyA = a[field],
        keyB = b[field];
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    });

}

function sortArrayByDateTimeDescending(array, dateField) {
    array.sort(function (a, b) {
        var keyA = new Date(a[dateField]),
        keyB = new Date(b[dateField]);
        // Compare the 2 dates
        if (keyA > keyB) return -1;
        if (keyA < keyB) return 1;
        return 0;
    });
}

function arrayElementCount(array) {
    var counts = {};

    for (var i = 0; i < array.length; i++){
        counts[array[i]] = (counts[array[i]] + 1) || 1;
    }

    var countArr = $.map(counts, function (value, index) {
        return [{name:index, count:value}];
    });

    return countArr;
}

function keywordsCount(array) {
    var counts = {};

    for (var i = 0; i < array.length; i++) {
        counts[array[i].keyword] = (counts[array[i].keyword] + array[i].count) || array[i].count;
    }

    var countArr = $.map(counts, function (value, index) {
        return [{ key: index, count: value }];
    });

    // console.log(countArr);
    return countArr;
}

function getBubbleChartData(data, name) {
    var topics = data.filter(function (d) {
        return d.Name == name;
    });
    if (topics.length == 0) {
        return;
    }
    var subjects = topics[0].Subjects;
    var max = 40;
    var i, l = subjects.length, bubbleData = [];
    max = Math.min(max, l);
    for (i = 0; i < max; i++) {
        var subject = subjects[i];
        bubbleData.push({
            x: Math.floor((Math.random() * 100) + 1),
            y: Math.floor((Math.random() * 10) + 1),
            z: subject.Score,
            name: subject.Label,
            count: (subject.Score * 100)
        });
    }
    return [{
        data: bubbleData
    }];
    //console.log(chartData);
}