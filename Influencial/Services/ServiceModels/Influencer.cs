using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Influencial.Services.ServiceModels
{
    public class Influencer
    {
        public string Name { get; set; }
        public string NickName { get; set; }
        public string TwitterHandle { get; set; }
        public int TwitterFollowerCount { get; set; }
        public int TwitterFriendsCount { get; set; }
        public string InstagramHandle { get; set; }
        public int InstagramFollowerCount { get; set; }
        public int InstagramFriendsCount { get; set; }
        // Chiara Ferragni (The Blonde Salad)  	@chiaraferragni	238.378	134	chiaraferragni	3.600.000	665
    }
}