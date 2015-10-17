influential

    .service('influencerService', ['$resource', function($resource) {
        var service = this;
        service.getInfluencer = function () {
            var influencers = $resource("data/influencer.json");
            return influencers;
           // return 
        };

        service.filterByCategory = function(list, category) {
            return list.filter(function (itm) { return itm.category===category; });
      };

    }])
    
 // =========================================================================
    // Header Messages and Notifications list Data
    // =========================================================================

    .service('messageService', ['$resource', function ($resource) {
        this.getMessage = function (img, user, text) {
            var gmList = $resource("data/messages-notifications.json");

            return gmList.get({
                img: img,
                user: user,
                text: text
            });
        }
    }])

    
