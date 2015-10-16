using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Influencial.Services.ServiceModels;

namespace Influencial.Services
{
    public class InfluencerService
    {
        public const string Fashion = "Fashion";
        public const string Food = "Food";
        public const string Art = "Art";

        public List<Influencer> GetInfluencers(string category)
        {
            return new List<Influencer>();
        }
    }
}