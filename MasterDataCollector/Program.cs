using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using InstaSharp;
using InstaSharp.Models.Responses;
using Tweetinvi;
using Tweetinvi.Core.Interfaces;
using InstaSharp.Endpoints;

namespace MasterDataCollector
{
    class Program
    {
        const string AccessToken = "2819849482-UC3WnlbPKfR0mXPwKiHPmLjRvHtntpT1EZAgsfa";
        const string AccessTokenSecret = "SfMfrO7uKyGARKiIphSs7ywnmLmkRhgTVG5T4kUNaI8Nx";
        const string TokenConsumerKey = "pmHwZOsfUGSfsvXcOGNw6CS3g";
        const string TokenConsumerSecret = "EHGwTdje930TTA1uujsruCGcVrVvY6rIetHdzUMNQ9iQYaa7FL";
        #region handles
        static List<string> handles = new List<string>(){ 
            "chiaraferragni",
"aimeesong",
"wendynguyen",
"Kayture",
"SincerelyJules",
"rumineely",
"garypeppergirl",
"GalMeetsGlam",
"BlairEadieBEE",
"bettyautier",
"RasaMalaysia",
"Laura_Mess",
"SladenBurger",
"YummySupperblog",
"oliviafrocha",
"effingdelicious",
"EattheLove",
"ChefInDisguise",
"GolubkaKitchen",
"ZenandSpice",
"artsyshark",
"abstanfield",
"dailyartfixx",
"Golem_13",
"thefoxisblack",
"wherecoolthings",
"Designcollector",
"jealouscurator",
"itsnicethat",
"booooooom"};

        static List<string> _instaHandles = new List<string>
            {
                "chiaraferragni",
            "songofstyle",
            "wendyslookbook",
            "kristina_bazan",
            "sincerelyjules",
            "rumineely",
            "garypeppergirl",
            "juliahengel",
            "blaireadiebee",
            "bettyautier",
            "rasamalaysia",
            "thefirstmess",
            "sladenburger",
            "yummysupper",
            "alquimiadostachos",
            "EffingDelicious",
            "eatthelove",
            "chefindisguise",
            "golubka",
            "zenandspice",
            "artsy_shark",
            "abstanfield",
            "weandthecolor",
            "Golem_13",
            "thefoxblack",
            "wherecoolthingshappen",
            "designcollector",
            "thejealouscurator",
            "itsnicethat",
            "booooooom"
            };
        internal static string _pathInsta = @"C:\Users\xun.ding\Documents\data\instagramdata.txt";
        internal static string _pathTwitter = @"C:\Users\xun.ding\Documents\data\twitterdata.txt";

        internal static string _pathInstaD = @"C:\Users\xun.ding\Documents\data\instagramdataD.txt";
        internal static string _pathTwitterD = @"C:\Users\xun.ding\Documents\data\twitterdataD.txt";
        #endregion

        private static void Main()
        {
            Auth.SetUserCredentials(TokenConsumerKey, TokenConsumerSecret, AccessToken, AccessTokenSecret);
            var u = User.GetLoggedUser();
            // This text is added only once to the file.
            if (!File.Exists(_pathTwitter))
            {
                // Create a file to write to.
                using (StreamWriter sw = File.CreateText(_pathTwitter))
                {
                    sw.WriteLine("Start collection");
                }
            }
            // This text is added only once to the file.
            if (!File.Exists(_pathInsta))
            {
                // Create a file to write to.
                using (StreamWriter sw = File.CreateText(_pathInsta))
                {
                    sw.WriteLine("Start collection");
                }
            }

           // CollectTweetUserData();
           // Console.WriteLine(" user done");
            CollectTweetdata();
            CollectInstagramData();
          // CollectInstagramData();
            Console.Read();
        }

        private static void CollectTweetUserData()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendFormat("{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\t{7}\t{8}\t{9}", "Handle", "UserName", "ScreenName", "ProfileImgurl", "BackgroundImgUrl", "FollowerCount", "FriendsCount", "StatusCount", "CreatedAt","Description");
            sb.AppendLine("");
 
            
            foreach (var u in handles)
            {
                var user = User.GetUserFromScreenName(u);
                if (user == null)
                {
                    Console.WriteLine("rat, user null " + u);
                    continue;
                }
                Console.WriteLine("Fetch data user for " + u);
                sb.AppendFormat("{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\t{7}\t{8}\t{9}",
                    u,
                    user.Name, 
                    user.ScreenName,
                    user.ProfileImageFullSizeUrl,
                    user.ProfileBackgroundImageUrl,
                    user.FollowersCount, 
                    user.FriendsCount,
                    user.StatusesCount, 
                    user.CreatedAt,
                    user.Description);
                sb.AppendLine();

            }
            sb.AppendLine();

            // This text is always added, making the file longer over time
            // if it is not deleted.
            using (StreamWriter sw = File.AppendText(_pathTwitter))
            {
                sw.WriteLine(sb.ToString());
                Console.WriteLine("gag");
            }


        }

        private static async void CollectInstagramData()
        {

            OAuthResponse _instaAuth = new OAuthResponse();
            InstagramConfig _instaConfig = new InstagramConfig();
            var clientId = "713d21f5a160485f9d9e287261952ea9";
            var clientSecret = "7d3cbf075d4c4cb293f58d10cd8d9862";
            // test account client id
            _instaConfig.ClientId = clientId;
            // dummy account data. InstaSharpTest
            _instaAuth.AccessToken = "283159706.1fb234f.b290a83c202d44d4831a1ad03e3471d7";
            Users users = new Users(_instaConfig, _instaAuth);
            var sb = new StringBuilder();

            sb.AppendFormat("{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\t{7}\t{8}\t{9}\t{10}", "username", "userid", "createdtime", "caption", "postid", 
              "thumbnail", "likecount", "lat", "long","link", "hashtags");
            foreach (var h in _instaHandles)
            {
                UsersResponse result = await users.Search(h, 1);
                sb.AppendLine();


                if (result.Data.Any())
                {
                    var r = await users.Get(result.Data[0].Id.ToString());
                    var d = r.Data;
                    Console.WriteLine("{0}{1}", d.Username, d.Id);
                   
                    var mediaRs = await users.Recent(d.Id.ToString());
                    var mediaData = mediaRs.Data;
                    foreach (var rs in mediaData)
                    {
                        sb.AppendFormat("{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\t{7}\t{8}\t{9}\t{10}",
                            d.Username,
                            d.Id,
                            rs.Caption==null?"":rs.Caption.CreatedTime.ToString(),
                           rs.Caption == null ? "" : rs.Caption.Text,
                            rs.Id,
                            rs.Images.Thumbnail.Url,
                            rs.Likes.Count,
                            rs.Location == null ? 0 : rs.Location.Latitude,
                             rs.Location == null ? 0 : rs.Location.Longitude,
                            rs.Link, String.Join(",", rs.Tags));
                        sb.AppendLine();
                    }
                   

                }

             
            }

            var str = sb.ToString();
            using (StreamWriter sw = File.AppendText(_pathInstaD))
            {
                sw.WriteLine(str);
            }
        }


        private static void CollectTweetdata()
        {
            StringBuilder sb = new StringBuilder();
            sb.AppendFormat("{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\t{7}",
                                "username",
                                "tweetid",
                                "tweettext",
                                "RetweetCount",
                                "FavouriteCount",
                                "CreatedBy",
                                "hashtags",
                                "CreatedAt"
                                );
            foreach (var u in handles)
            {
                var user = User.GetUserFromScreenName(u);
                if (user == null)
                {
                    Console.WriteLine("rat, user null " + u);
                    continue;
                }
                Console.WriteLine("Fetch data for " + u);
                string g = user.Location;
                IEnumerable<IUser> friends = user.GetFollowers();
                List<String> locations = friends.Select(f => f.Location).ToList();

                locations.AddRange(user.GetFriends().Select(f => f.Location).ToList());

                var timelineTweets = user.GetUserTimeline(40);
              
                foreach (var tweet in timelineTweets)
                {
                    sb.AppendLine();
                    StringBuilder hashSb = new StringBuilder();
                    foreach (var h in tweet.Hashtags)
                    {
                        hashSb.Append(h.Text + "|");
                    }
                    sb.AppendFormat("{0}\t{1}\t{2}\t{3}\t{4}\t{5}\t{6}\t{7}",
                                    u,
                                    tweet.Id,
                                    tweet.Text,
                                    tweet.RetweetCount,
                                    tweet.FavouriteCount,
                                    tweet.CreatedBy,
                                    hashSb,
                                    tweet.CreatedAt
                                    );
                }
               
            }
             // This text is always added, making the file longer over time
                // if it is not deleted.
                using (StreamWriter sw = File.AppendText(_pathTwitterD))
                {
                    sw.WriteLine(sb);
                }

        }

        private static void TweetTrendAnalysis()
        {

            
        }
    }
}
