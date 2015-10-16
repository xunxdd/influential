using System;
using System.Collections.Generic;
using System.Linq;
using Tweetinvi;
using Tweetinvi.Core;
using Tweetinvi.Core.Credentials;
using Tweetinvi.Core.Enum;
using Tweetinvi.Core.Extensions;
using Tweetinvi.Core.Interfaces;
using Tweetinvi.Core.Interfaces.Controllers;
using Tweetinvi.Core.Interfaces.DTO;
using Tweetinvi.Core.Interfaces.Models;
using Tweetinvi.Core.Interfaces.Parameters;
using Tweetinvi.Core.Interfaces.Streaminvi;
using Tweetinvi.Core.Parameters;
using Tweetinvi.Json;
using Geo = Tweetinvi.Geo;
using SavedSearch = Tweetinvi.SavedSearch;
using Stream = Tweetinvi.Stream;

namespace Influencial.Services
{
    public class Twitterservice
    {
        const string AccessToken = "2819849482-UC3WnlbPKfR0mXPwKiHPmLjRvHtntpT1EZAgsfa";
        const string AccessTokenSecret = "SfMfrO7uKyGARKiIphSs7ywnmLmkRhgTVG5T4kUNaI8Nx";
        const string TokenConsumerKey = "pmHwZOsfUGSfsvXcOGNw6CS3g";
        const string TokenConsumerSecret = "EHGwTdje930TTA1uujsruCGcVrVvY6rIetHdzUMNQ9iQYaa7FL";

        
        public Twitterservice()
        {
            Auth.SetUserCredentials(TokenConsumerKey, TokenConsumerSecret, AccessToken, AccessTokenSecret);

            var u = User.GetLoggedUser();
        }

        public  IEnumerable<IUser>  GetFriends(string userName){
            string USER_SCREEN_NAME_TO_TEST = "ladygaga";

            var user = User.GetUserFromScreenName(USER_SCREEN_NAME_TO_TEST);
            var fCount = user.FollowersCount;
            var d = user.FriendsCount;
            string g = user.Location;
            IEnumerable<IUser> friends = user.GetFollowers();
            List<String> locations = friends.Select(f => f.Location).ToList();

            locations.AddRange(user.GetFriends().Select(f => f.Location).ToList());

            var timelineTweets = user.GetUserTimeline(40);
            foreach (var tweet in timelineTweets)
            {
                Console.WriteLine(tweet.Entities.Hashtags);
            }
            return friends;
        }
    }


}